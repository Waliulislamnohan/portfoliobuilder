import requests
from bs4 import BeautifulSoup
import os

# Set your GROQ API Key
GROQ_API_KEY = "your_groq_api_key_here"

def get_page_html(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.text, "html.parser")
    return soup.prettify()

def evaluate_ui_with_groq(html_content):
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mixtral-8x7b-32768",  # or use "llama3-70b-8192"
        "messages": [
            {"role": "system", "content": "You are a UX/UI design expert."},
            {"role": "user", "content": f"Evaluate the UI/UX of the following website HTML:\n\n{html_content[:12000]}\n\nGive feedback on layout, accessibility, mobile-friendliness, color scheme, and user experience. Suggest improvements if needed."}
        ]
    }

    response = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload)
    result = response.json()
    return result["choices"][0]["message"]["content"]

if __name__ == "__main__":
    website_url = input("Enter website URL: ")
    
    try:
        html = get_page_html(website_url)
        evaluation = evaluate_ui_with_groq(html)
        print("\n--- UI/UX Evaluation ---\n")
        print(evaluation)
    except Exception as e:
        print(f"Error: {e}")