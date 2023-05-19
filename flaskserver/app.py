# import os
# import sys

# import pandas as pd

# from keras.models import Sequential
# from keras.layers import Dense, Dropout
# from tensorflow.keras.optimizers import SGD, Adam
# from keras.utils.np_utils import to_categorical
# Flask
import json
from flask import Flask, url_for, request, render_template,redirect,jsonify,make_response

from scipy.special import softmax
# TensorFlow and tf.keras
import tensorflow as tf
from tensorflow import keras

# from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions
from tensorflow.keras.models import load_model

from tensorflow.keras.utils import load_img,img_to_array
# Some utilites
import numpy as np
import sys
from PIL import Image
from flask_cors import CORS, cross_origin

import os

sys.modules['Image'] = Image 
# import Image
# from sklearn.metrics import classification_report, confusion_matrix


# Declare a flask app
app = Flask(__name__)
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'
# cors = CORS(app, resources={r"/predictcrop": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'
# model=pickle.load(open('model.pkl','rb'))
print('Model loaded. Check http://127.0.0.1:5000/')


# Model saved with Keras model.save()
CROP_MODEL_PATH = 'model/croppredictor.h5'
DISEASE_MODEL_PATH = 'model/finetunedmodel.h5'
model1=load_model(CROP_MODEL_PATH)
model2=load_model(DISEASE_MODEL_PATH)
        # Necessary
print('Models loaded')
# @app.after_request
# def add_headers(response):
#     response.headers.add('Content-Type', 'application/json')
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     response.headers.add('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
#     response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#     response.headers.add('Access-Control-Expose-Headers', 'Content-Type,Content-Length,Authorization,X-Pagination')
#     return response


@app.route('/predictcrop',methods=['POST','OPTIONS'])

def predict():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    if request.method == "POST": # CORS preflight
        req=(request.get_json())
        input_arr=[req['nitrogen'],req['phosphrous'],req['potassium'],req['temp'],req['humidity'],req['ph'],req['rainfall']]
        print(input_arr)
        input_arr1=np.array([input_arr])
        # layer = tf.keras.layers.Softmax()
        pred = model1.predict(input_arr1)
        pred=softmax(pred)
        print(pred[0].tolist())
    
        return (pred[0].tolist())
    else:
        raise RuntimeError("Weird - don't know how to handle method {}".format(request.method))

@app.route('/predictdisease',methods=['POST','OPTIONS'])
def predict1():
    if request.method == "OPTIONS":
        return _build_cors_preflight_response()
    if request.method=='POST':
        image=request.files['file']
        # image = request.args.get('image')
        path="./images/"+image.filename
        image.save(path)
        img=load_img(path,target_size=(224,224))
        i=img_to_array(img)/255

        input_arr=np.array([i])
        input_arr.shape
        pred = model2.predict(input_arr)
        pred=softmax(pred)
        print(pred)
        os.remove(path)
        return pred[0].tolist()

def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0')