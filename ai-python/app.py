from fastapi import FastAPI, UploadFile, File
from google.cloud import vision
import os


app= FastAPI()

#Google vision client

client = vision.ImageAnnotatorClient()

@app.get("/")

def health_check():
    return {"status": "VisionFlow AI is running "}

@app.post("/analyze")

async def analyze_image(file:UploadFile = File(...)):
    content = await file.read()

    image = vision.Image(content=content)

    # for the detection of objects

    object_response = client.object_localization(image=image)

    objects =[
        {"name": obj.name, "score": obj.score}

        for obj in object_response.localized_object_annotations
    ]

    # for the detection of the label

    label_response = client.label_detection(image=image)

    labels = [
        {"name": label.description, "score": label.description}
        for label in label_response.label_annotations
    ]

    best_guess  = labels[0]["name"] if labels else "Unknown"

    tags = list(set([obj["name"].lower() for obj in objects]))

    return {
        "objects": objects,
        "labels": labels,
        "bestGuess": best_guess,
        "tags": tags,
        "confidenceScore": labels[0]["score"] if labels else 0
    }