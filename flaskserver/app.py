# import os
# import sys

# import pandas as pd

# from keras.models import Sequential
# from keras.layers import Dense, Dropout
# from tensorflow.keras.optimizers import SGD, Adam
# from keras.utils.np_utils import to_categorical
# Flask
import json
from flask import Flask, url_for, request, render_template,redirect,jsonify

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
from flask_cors import CORS

import os

sys.modules['Image'] = Image 
# import Image
# from sklearn.metrics import classification_report, confusion_matrix


# Declare a flask app
app = Flask(__name__)
CORS(app)
# model=pickle.load(open('model.pkl','rb'))
print('Model loaded. Check http://127.0.0.1:5000/')


# Model saved with Keras model.save()
CROP_MODEL_PATH = 'model/croppredictor.h5'
DISEASE_MODEL_PATH = 'model/finetunedmodel.h5'
model1=load_model(CROP_MODEL_PATH)
model2=load_model(DISEASE_MODEL_PATH)
        # Necessary
print('Models loaded')



@app.route('/predictcrop',methods=['POST'])
def predict():
    req=request.get_json()
    input_arr=[req['nitrogen'],req['phosphrous'],req['potassium'],req['temp'],req['humidity'],req['ph'],req['rainfall']]
    print(input_arr)
    input_arr1=np.array([input_arr])
    # layer = tf.keras.layers.Softmax()
    pred = model1.predict(input_arr1)
    pred=softmax(pred)
    print(pred[0].tolist())
    
    return pred[0].tolist()

@app.route('/predictdisease',methods=['POST'])
def predict1():
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

if __name__ == '__main__':
    app.run(host='0.0.0.0')