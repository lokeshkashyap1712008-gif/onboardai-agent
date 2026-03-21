from google import genai
import os
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("AIzaSyCLXqsFT9PhH3CF6GZyql1XRdFvYkKmyMI"))