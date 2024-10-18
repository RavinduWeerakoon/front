from flask import Flask, request, jsonify
from gradio_client import Client
from dotenv import load_dotenv
import os
import time
from flask_cors import CORS
import requests as rq
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


load_dotenv()

hf_token = os.getenv("HF_TOKEN")
EMOTION_MODEL = os.getenv("EMOTION_MODEL")
SUICIDABILITY_MODEL = os.getenv("SUICIDABILITY_MODEL")


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the Gradio client
client = Client(EMOTION_MODEL)

@app.route('/')
def home():
    return jsonify("Hello, World!")

@app.route('/predict-emotion', methods=['POST'])
def predict():
    # Get the text from the POST request
    data = request.get_json()
    text = data.get('text', '')

    # Send the text to the Hugging Face model
    result = client.predict(
        param_0=text,
        api_name="/predict"
    )

    # Return the result as JSON
    return jsonify(result)




def query(payload):
    headers = {"Authorization": f"Bearer {hf_token}"}
    response = rq.post(SUICIDABILITY_MODEL, headers=headers, json=payload)
    return response.json()

import time

def get_prediction(text):
    while True:
        results = query({"inputs": text})
        print(results)
        if not isinstance(results,list) and results.get("error"):
            return {"score": "0.1003"}
        if  not isinstance(results, list):
            time.sleep(1)
            continue
        

        for result in results[0]:
            if result.get("label") == "LABEL_1":
                return result



@app.route('/predict-suicidability', methods=['POST'])
def predict_suicidality():
    # Get the text from the POST request
    data = request.get_json()
    print("text", data)
    text = data.get('text', '')

    result = get_prediction(text)

    # Return the result as JSON
    return jsonify(result)


@app.route("/get-result", methods=["POST"])
def get_score():
    data = request.get_json()
    text = data.get('text', '')

    result = get_prediction(text)

    score = result.get("score", "10")
    emotion  = client.predict(
        param_0=text,
        api_name="/predict"
    )

    res = {
        "emotion":emotion,
        "suicide_score":score,
    }

    print(res)

    return jsonify(res)


if __name__ == '__main__':
    app.run(debug=True)