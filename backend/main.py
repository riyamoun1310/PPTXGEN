# Backend - FastAPI setup

from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
import tempfile
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
async def generate_pptx(
    text: str = Form(...),
    guidance: str = Form(None),
    api_key: str = Form(...),
    pptx_file: UploadFile = File(...)
):
    # TODO: Call LLM, parse text, use python-pptx to generate new file
    # For now, just return the uploaded file as a placeholder
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pptx") as tmp:
        tmp.write(await pptx_file.read())
        tmp_path = tmp.name
    return FileResponse(tmp_path, filename="generated.pptx")

@app.get("/")
def root():
    return {"status": "Backend running"}
