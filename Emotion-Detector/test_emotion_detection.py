"""Unit tests for the emotion detector."""

import unittest
from unittest.mock import patch

from EmotionDetection.emotion_detection import emotion_detector


def fake_response(emotions, status_code=200):
    class FakeResponse:
        def __init__(self):
            self.status_code = status_code

        def json(self):
            return {"emotionPredictions": [{"emotion": emotions}]}

        def raise_for_status(self):
            if self.status_code >= 400:
                raise RuntimeError("HTTP error")

    return FakeResponse()


class TestEmotionDetector(unittest.TestCase):
    """Test the Watson emotion detector."""

    @patch("EmotionDetection.emotion_detection.requests.post")
    def test_joy(self, mock_post):
        mock_post.return_value = fake_response(
            {"anger": .01, "disgust": .01, "fear": .01, "joy": .95, "sadness": .02}
        )
        self.assertEqual(emotion_detector("I am glad")['dominant_emotion'], "joy")

    @patch("EmotionDetection.emotion_detection.requests.post")
    def test_anger(self, mock_post):
        mock_post.return_value = fake_response(
            {"anger": .95, "disgust": .01, "fear": .02, "joy": .01, "sadness": .01}
        )
        self.assertEqual(emotion_detector("I am mad")['dominant_emotion'], "anger")

    @patch("EmotionDetection.emotion_detection.requests.post")
    def test_disgust(self, mock_post):
        mock_post.return_value = fake_response(
            {"anger": .01, "disgust": .95, "fear": .01, "joy": .01, "sadness": .02}
        )
        self.assertEqual(emotion_detector("I feel disgusted")['dominant_emotion'], "disgust")

    @patch("EmotionDetection.emotion_detection.requests.post")
    def test_sadness(self, mock_post):
        mock_post.return_value = fake_response(
            {"anger": .01, "disgust": .01, "fear": .01, "joy": .02, "sadness": .95}
        )
        self.assertEqual(emotion_detector("I am sad")['dominant_emotion'], "sadness")

    @patch("EmotionDetection.emotion_detection.requests.post")
    def test_fear(self, mock_post):
        mock_post.return_value = fake_response(
            {"anger": .01, "disgust": .01, "fear": .95, "joy": .01, "sadness": .02}
        )
        self.assertEqual(emotion_detector("I am afraid")['dominant_emotion'], "fear")


if __name__ == "__main__":
    unittest.main()
