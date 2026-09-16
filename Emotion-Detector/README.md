# Emotion Detector

An AI-based emotion detection web application using IBM Watson NLP and Flask.

## Features
- Detects anger, disgust, fear, joy and sadness
- Returns the dominant emotion
- Flask web deployment
- Unit testing
- Error handling
- Pylint static analysis

## Run
```bash
pip install -r requirements.txt
python server.py
```

## Test
```bash
python -m unittest test_emotion_detection.py
pylint server.py
```