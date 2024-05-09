import whisper
import spacy
import asent
from numpy import disp
from spacy import displacy
import heapq
import pandas as pd
import numpy as np
import librosa


model = whisper.load_model("base")
nlp=spacy.load("en_core_web_trf")
nlp.add_pipe('asent_en_v1')
stopwords=spacy.lang.en.stop_words.STOP_WORDS

filler_words = [
    "um", "uh", "like", "you know", "well", "basically", "actually", "literally",
    "so", "totally", "kind of", "sort of", "really", "I mean", "okay", "OK", "yeah",
    "right", "just", "hmm", "ah", "oh", "hm", "er", "ahem", "uh-huh", "huh", "wow",
    "uh-oh", "oops", "gosh", "oh my", "oh no", "ugh", "yeah", "uh-uh", "alright",
    "whatever", "like I said", "for example", "in other words", "as I was saying",
    "to be honest", "to tell you the truth", "by the way", "as a matter of fact",
    "at the end of the day", "on the other hand", "in my opinion", "to be fair",
    "all things considered", "more or less", "in any case", "so to speak",
    "in a sense", "in a way", "after all", "in fact", "to some extent",
    "the fact of the matter is", "in reality", "as it were", "in essence",
    "to put it bluntly", "needless to say", "for all intents and purposes",
    "it goes without saying", "believe it or not", "at this point in time",
    "as far as I'm concerned", "truth be told", "for what it's worth",
    "bottom line", "in the final analysis", "at the present moment",
    "for the time being", "as of now", "up until now", "up to this point",
    "in the grand scheme of things", "for all practical purposes",
    "as luck would have it", "more often than not", "as things stand",
    "come to think of it", "for the most part", "sooner or later",
    "on a regular basis", "as a rule", "in general", "for the record",
    "as a result", "in the meantime", "as I see it", "so far so good",
    "to make a long story short", "in summary", "to sum it up", "to cut a long story short",
    "in the final analysis", "when all is said and done"
]
df = pd.DataFrame({"filler_word": filler_words})


def transcribe_video(file_path):
    """
    Transcribe the given video file using the pre-loaded Whisper model.

    :param file_path: Path to the video file to transcribe.
    :return: The transcription text.
    """
    # Perform transcription using the already loaded model
    result = model.transcribe(file_path)
    segments = result.get('segments', [])

    # Initialize an empty string to accumulate the transcription
    full_transcription = ""

    # Loop through each segment and extract the text with timestamps
    for segment in segments:
        start_time = segment.get('start')
        end_time = segment.get('end')
        text = segment.get('text')
        segment_transcription = f"{start_time:.2f} - {end_time:.2f}: {text}\n"
        print(segment_transcription)
        full_transcription += segment_transcription

    # Optionally, append the full text at the end
    full_text = result.get("text", "")
    print(full_text)
    full_transcription += full_text
    # segments,full_transcription


    return full_transcription,segments


def nlpTasks(text,segments,file_path):
    doc=nlp(text)
    svg1=displacy.render(doc,style="dep") #####
    svg2=displacy.render(doc,style="ent") #####
    # polarity=doc._.polarity.compond #####
    html1=asent.visualize(doc, style='prediction') #####

    word_frequencies = {}

    # Loop through the document and calculate word frequencies
    for word in doc:
        # Filter out stopwords and punctuation
        if word.text.lower() not in stopwords and not word.is_punct:
            if word.text not in word_frequencies:
                word_frequencies[word.text] = 1
            else:
                word_frequencies[word.text] += 1

    # Calculate the maximum word frequency
    max_frequency = max(word_frequencies.values())

    # Normalize word frequencies
    for word in word_frequencies:
        word_frequencies[word] = word_frequencies[word] / max_frequency

    # Initialize sentence scores
    sentence_scores = {}

    # Loop through the sentences and calculate sentence scores
    for sentence in doc.sents:
        for word in sentence:
            if word.text in word_frequencies:
                if sentence not in sentence_scores:
                    sentence_scores[sentence] = word_frequencies[word.text]
                else:
                    sentence_scores[sentence] += word_frequencies[word.text]

    summary_sentences = heapq.nlargest(3, sentence_scores, key=sentence_scores.get)

    summary = ' '.join(map(str, summary_sentences)) #####

    filler_word_count=detect_filler_words(text,filler_words) #####
    total_words=len(text.split())
    filler_word_percentage=filler_word_count/total_words*100 #####
    highlighted_paragraph = detect_and_highlight_filler_words(text, filler_words) #####
    res1=det_filler_words(text,segments,doc,file_path) ####new
    dicti={
        'svg1':svg1,
        'svg2':svg2,
        'html1':html1,
        'summary':summary,
        'filler_word_percentage':filler_word_percentage,
        'highlighted_paragraph':highlighted_paragraph,
        'filler_new':res1
    }
    return dicti

def detect_and_highlight_filler_words(text, filler_words):
    doc = nlp(text.lower())  # Convert text to lowercase for case-insensitive detection

    # Create a list of tokens with filler words highlighted using HTML
    highlighted_tokens = []
    for token in doc:
        if token.text in filler_words:
            highlighted_tokens.append(f'|{token.text}|')
        else:
            highlighted_tokens.append(token.text)

    # Combine the tokens back into a string
    highlighted_text = ' '.join(highlighted_tokens)

    return highlighted_text


def detect_filler_words(text, filler_words):
    doc = nlp(text.lower())  # Convert text to lowercase for case-insensitive detection
    filler_word_count = sum(1 for token in doc if token.text in filler_words)
    return filler_word_count



####new
def det_filler_words(text,segments,doc,file_path):
    word_timestamps = []
    current_time = 0.0

    for token in doc:
        word_start = current_time
        word_end = current_time + (len(token.text_with_ws) / len(segment.text)) * (segment.end - segment.start)
        word_timestamps.append((word_start, word_end))
        current_time = word_end

    print("Word Timestamps:")
    for i, (start, end) in enumerate(word_timestamps):
        word_number = i + 1
        word = doc[i].text
        print("Word {}: [{} -> {}] {}".format(word_number, start, end, word))

    filler_word_indices = [i for i, (start, end) in enumerate(word_timestamps) if doc[i].text.lower() in filler_words]

    def calculate_average_pause_per_sentence(word_timestamps):
        sentence_indices = [i for i, token in enumerate(doc) if token.is_sent_start]
        sentence_indices.append(len(word_timestamps))

        sentence_avg_pauses = []
        for i in range(len(sentence_indices) - 1):
            start_index = sentence_indices[i]
            end_index = sentence_indices[i + 1]

            sentence_word_durations = np.diff(np.array(word_timestamps[start_index:end_index])[:, 0])

            if len(sentence_word_durations) > 0:
                avg_pause_duration = np.mean(sentence_word_durations)
            else:
                avg_pause_duration = 0.0

            sentence_avg_pauses.append(avg_pause_duration)

        return sentence_avg_pauses
    
    def calculate_average_pause_duration(word_timestamps, filler_word_indices, audio_file_path):
        audio, sr = librosa.load(audio_file_path, sr=None)

        word_durations = np.diff(np.array(word_timestamps)[:, 0])

        filler_word_durations = [word_durations[i + 1] for i in filler_word_indices if i + 1 < len(word_durations)]

        if filler_word_durations:
            average_pause_duration = np.mean(filler_word_durations)
        else:
            average_pause_duration = 0.0

        return average_pause_duration
    
    average_pause_duration = calculate_average_pause_duration(word_timestamps, filler_word_indices, file_path)
    print("Average pause duration after filler words:", average_pause_duration)

    sentence_avg_pauses = calculate_average_pause_per_sentence(word_timestamps)

    pause_after_filler_greater = [pause > average_pause_duration for pause in sentence_avg_pauses]

    filler_words_in_sentences = [[] for _ in range(len(sentence_avg_pauses))]
    for index in filler_word_indices:
        sentence_index = 0
        while index >= len(doc[: index + 1]):
            index -= len(doc[: index + 1])
            sentence_index += 1
        filler_words_in_sentences[sentence_index].append(doc[index].text)

    print("\nResults:")
    for i, avg_pause in enumerate(sentence_avg_pauses):
        print("Sentence {}: Average pause: {:.2f} seconds".format(i + 1, avg_pause))
    print("Average pause in Each sentence:", ", ".join(map(str, sentence_avg_pauses)))
    print("Pause after Filler word:", ", ".join(map(str, pause_after_filler_greater)))
    filler_words = []
    for words in filler_words_in_sentences:
        filler_words.extend(words)
    print("Filler word: Yes" if any(pause_after_filler_greater) else "Filler word: No")
    print("Filler words:", ", ".join(filler_words))

    return {}


