from flask import Flask, request, jsonify
from flask_cors import CORS
from supabaseClient import supabase
import os
from urllib.parse import urlparse


app = Flask(__name__)
# Enable CORS for all domains on all routes. For development only!
CORS(app)

# For more control, you can specify the origins you want to allow
# CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5173/"}})

@app.route('/api/analyze-video', methods=['POST'])
def analyze_video():
    data = request.json  # Get JSON data from the request
    video_url = data.get("videoUrl")  # Make sure to validate and sanitize input
    print(video_url)
    if not video_url:
        return jsonify({"error": "No video URL provided"}), 400

    # Attempt to download the video
    video_data, error = get_video(video_url)
    
    if error:
        return jsonify({"error": str(error)}), 500

    # Here you would analyze the video_data and then return the results
    # For debugging, let's just return a success message
    return jsonify({"message": "Video downloaded successfully"})



def get_video(video_path):
    # Define the destination path where the video will be saved
    destination_path = os.path.join(app.root_path, 'downloads', video_path)
    os.makedirs(os.path.dirname(destination_path), exist_ok=True)
    
    try:
        # Attempt to download the file from Supabase storage
        response = supabase.storage.from_('videos').download(video_path)
        
        # Assuming 'response' needs to be checked for success/error
        if hasattr(response, 'error') and response.error:
            print(f"Download error: {response.error.message}")  # Log error message for debugging
            return None, response.error.message
        
        # Write the binary content to the destination file
        with open(destination_path, 'wb+') as file:
            file.write(response)  # If 'response' is indeed the binary content
            
        return destination_path, None
    except Exception as e:
        print(f"Exception occurred: {e}")  # Log the exception for debugging
        return None, str(e)


if __name__ == '__main__':
    app.run(debug=True)