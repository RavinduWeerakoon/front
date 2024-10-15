import pytest
from flask import json
from main import app

# backend/test_main.py


@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_home(client):
    response = client.get('/')
    assert response.status_code == 200
    assert response.get_json() == "Hello, World!"

def test_predict_emotion(client, mocker):
    mocker.patch('backend.main.client.predict', return_value={"label": "happy", "score": 0.99})
    response = client.post('/predict-emotion', json={"text": "I am very happy"})
    assert response.status_code == 200
    assert response.get_json().get("label") == "happy"

def test_predict_suicidability(client, mocker):
    mocker.patch('backend.main.get_prediction', return_value={"label": "LABEL_1", "score": 0.85})
    response = client.post('/predict-suicidability', json={"text": "I feel hopeless"})
    assert response.status_code == 200
    # assert response.get_json() == {"label": "LABEL_1", "score": 0.85}

def test_get_score(client, mocker):
    mocker.patch('backend.main.get_prediction', return_value={"label": "LABEL_1", "score": 0.85})
    mocker.patch('backend.main.client.predict', return_value={"label": "sad", "score": 0.75})
    response = client.post('/get-result', json={"text": "I feel hopeless"})
    assert response.status_code == 200
    # assert response.get_json() == {
    #     "emotion": {"label": "sad", "score": 0.75},
    #     "suicide_score": "0.85"
    # }