import json
import pathlib
import textwrap
from flask import Flask, request, render_template, jsonify
import google.generativeai as genai
from flask_cors import CORS

genai.configure(api_key="AIzaSyBPBtg4B3eSf_KpvAWF9cxnF-Q2cpUs-i0")
app = Flask(__name__)
CORS(app)

@app.route("/geminioutput", methods=["POST"])
def geminioutput():
  model = genai.GenerativeModel('gemini-1.5-pro')
  input_data = request.json
  context = input_data.get("context", "")
  context_string=""
  l={}
  # Convert context list to a string suitable for Gemini
  if context is not None:
    if isinstance(context, list):
      context_string = "\n".join(message["input"] for message in context)
    else:
      context_string = context
    l={}
    count=0
    for i in context:
      l.update({'turn'+str(count):{"user_input":i["input"],"ai_response":i["ai"]}})

  query = input_data.get("query", "")
  print(context_string, query)
  response = model.generate_content(f"""**Conversational Context:** {l}

**Query:** {query}

**Response Strategy:**

* **Medical Focus:** Only answer queries related to the medical field and generate image related to that .
* **Context Matching:**
    * If the context ({l}) is relevant to the query ({query}), use that context to provide a more tailored response.
    * If the context doesn't match, provide a generalized answer suitable for the medical field.
* **Answer Detail:**
    * If the word "detail" is present in the query ({query}), provide a comprehensive and informative response.
    * If "detail" is not present, give a brief and summarized answer.
    
**Important Notes:**

* I cannot provide medical advice. If the query requires such advice, I will recommend consulting a healthcare professional.
* My responses are based on the information I have been trained on, and may not be exhaustive or perfectly accurate.
""" )
  print(response)
  
  return jsonify({"output": response.text})

if __name__ == "__main__":
  app.run(debug=True, port=8000)