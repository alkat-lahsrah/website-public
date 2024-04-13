from flask import Flask, request, jsonify
from flask_cors import CORS
from supabaseClient import supabase
import os
from urllib.parse import urlparse, unquote
from exp import transcribe_video, nlpTasks
import requests  # Make sure requests is properly installed
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes. For development only!

# Setup basic logging
logging.basicConfig(level=logging.INFO)

@app.route('/api/analyze-video', methods=['POST'])
def analyze_video():
    data = request.json
    video_path = data.get("videoUrl")
    if not video_path:
        return jsonify({"error": "No video URL provided"}), 400

    logging.info(f"Received video URL: {video_path}")

    # Attempt to download the video
    download_path, error = get_video(video_path)
    
    if error:
        logging.error(f"Error downloading video: {error}")
        return jsonify({"error": str(error)}), 500

    # Process the video
    text = transcribe_video(download_path)
    text_results = nlpTasks(text)
    logging.info(f"Video transcription and NLP results: {text_results}")
    
    return jsonify({"message": "Video processed successfully", "results": text_results})

def get_video(video_path):
    parsed_path = urlparse(video_path).path
    safe_path = unquote(os.path.basename(parsed_path))  # decode URL-encoded path and extract the safe file name
    destination_path = os.path.join(app.root_path, 'downloads', safe_path)
    os.makedirs(os.path.dirname(destination_path), exist_ok=True)

    try:
        logging.info("Creating signed URL")
        response = supabase.storage.from_('videos').create_signed_url(video_path, 3600)  # 3600 seconds = 1 hour
        if 'error' in response:
            logging.error(f"Supabase signed URL creation failed: {response['error']}")
            return None, response['error']['message']
        
        signed_url = response.get('signedURL')
        if not signed_url:
            error_message = "Failed to obtain signed URL"
            logging.error(error_message)
            return None, error_message

        logging.info(f"Downloading video from: {signed_url}")
        # Download the video using the signed URL
        with requests.get(signed_url, stream=True) as r:
            r.raise_for_status()
            with open(destination_path, 'wb') as f:
                for chunk in r.iter_content(chunk_size=8192):
                    f.write(chunk)

        logging.info("Video downloaded successfully")
        return destination_path, None
    except requests.RequestException as e:
        error_message = f"Request failed: {str(e)}"
        logging.error(error_message)
        return None, error_message
    except Exception as e:
        error_message = f"An error occurred: {str(e)}"
        logging.error(error_message)
        return None, error_message

if __name__ == '__main__':
    app.run(debug=True)
