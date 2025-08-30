# Text-to-PowerPoint Generator

A web app that turns bulk text, markdown, or prose into a fully formatted PowerPoint presentation using your chosen template and LLM provider.

## Features
- Paste text or markdown
- Enter LLM API key (never stored)
- Upload a PowerPoint template (.pptx/.potx)
- Download a styled .pptx presentation
- Supports Tavily, OpenAI, Anthropic, Gemini, etc.

## Tech Stack
- Frontend: React + Bootstrap
- Backend: Python (FastAPI), python-pptx, Tavily API

## Backend LLM Integration
This app uses the Tavily API to split your input text into slides (title/content) using your provided Tavily API key. No API keys or files are ever stored.

## How to Test the Backend
1. Start the backend server (see backend/README or run `uvicorn main:app --reload`).
2. Make a POST request to `/generate` with:
	 - `text`: Your input text
	 - `guidance`: (optional) Guidance for the LLM
	 - `api_key`: Your Tavily API key
	 - `pptx_file`: (optional) PowerPoint template file
3. The response will be a generated `.pptx` file for download.

**Example using curl:**
```
curl -X POST "http://localhost:8000/generate" \
	-F "text=Your text here" \
	-F "guidance=Make it concise" \
	-F "api_key=YOUR_TAVILY_API_KEY" \
	-F "pptx_file=@template.pptx"
```

## License
MIT
