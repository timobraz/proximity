import io
import json
import pickle
import tensorflow as tf
# import tensorflow.keras.backend as K
from tensorflow.keras.models import load_model
from fastapi import FastAPI
import base64
from PIL import Image
from io import BytesIO
import numpy as np
import cv2
from keras.models import load_model

app = FastAPI()
model = load_model("resnet50v2_20-EPOCHS_v2")


@app.get("/image")
def hello(base64s:str):
    img = base64_to_np(base64s)
    print(img)
    # preds, confi = model.
    return json.dumps({"prediction":preds,"confidence":confi})  


# resized_img = np.asarray(cv2.resize(img), (224, 224)).astype(np.uint8)

def base64_to_np(base64_string):
    # Remove metadata from base64 string
    base64_string = base64_string.split(',')[1]

    # Convert base64 string to bytes
    image_bytes = base64.b64decode(base64_string)

    # Convert bytes to PIL Image object
    image = Image.open(io.BytesIO(image_bytes))

    # Convert PIL Image object to Numpy array
    np_array = np.array(image)

    return np_array

# model = load_model(r'model/resnet50v2_20-EPOCHS_v2')