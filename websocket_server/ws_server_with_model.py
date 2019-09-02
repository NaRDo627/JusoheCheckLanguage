# -*- coding: utf-8 -*-

import logging
import os
from websocket_server import WebsocketServer
from tensorflow.python.keras import models
from tensorflow.python.keras import layers
from tensorflow.python.keras import optimizers
from tensorflow.python.keras import losses
from tensorflow.python.keras import metrics

import json
import os
from pprint import pprint
import numpy as np

from konlpy.tag import Okt

okt = Okt()

def tokenize(doc):
    # norm은 정규화, stem은 근어로 표시하기를 나타냄
    return ['/'.join(t) for t in okt.pos(doc, norm=True, stem=True)]

with open('./train_docs.json', encoding="utf-8") as f:
    train_docs = json.load(f)
with open('./test_docs.json', encoding="utf-8") as f:
    test_docs = json.load(f)

# train_doc에 존재하는 모든 태깅된 문자열을 담는다
tokens = [t for d in train_docs for t in d[0]]

import nltk
text = nltk.Text(tokens, name='NMSC')
print(text)

selected_size = 4000
selected_words = [f[0] for f in text.vocab().most_common(selected_size)]

def term_frequency(doc):
    return [doc.count(word) for word in selected_words]

def load_model():
    # 저장된 모델이 있다면 그 모델 사용
    model = None
    if os.path.isfile('./review_model.json') and os.path.isfile('./review_model_weight.h5'):
        json_file = open("./review_model.json", "r")
        model_json = json_file.read()
        json_file.close()
        model = models.model_from_json(model_json)

        model.load_weights("./review_model_weight.h5")

        model.compile(optimizer=optimizers.RMSprop(lr=0.001),
             loss=losses.binary_crossentropy,
             metrics=[metrics.binary_accuracy])
    return model

def predict_pos_neg(model, review):
    token = tokenize(review)
    tf = term_frequency(token)
    data = np.expand_dims(np.asarray(tf).astype('float32'), axis=0)
    score = float(model.predict(data))
    if(score > 0.5):
        return "[{}]는 {:.2f}% 확률로 긍정 리뷰이지 않을까 추측해봅니다.^^\n".format(review, score * 100)
    else:
        return "[{}]는 {:.2f}% 확률로 부정 리뷰이지 않을까 추측해봅니다.^^;\n".format(review, (1 - score) * 100)

def solve_encoding(string):
    return string.encode('raw_unicode_escape').decode('utf-8')

def on_connect(client, server):
    server.send_message(client, "You are connected to python server")


def on_message(client, server, message):
    solved_message = message
    # 혹시 글자가 깨지면 아래 주석 해제
    # solved_message = solve_encoding(message)
    loaded_model = load_model()
    predict = predict_pos_neg(loaded_model, solved_message)
    server.send_message(client, predict)

ws_server = WebsocketServer(80, host='0.0.0.0')
ws_server.set_fn_new_client(on_connect)
ws_server.set_fn_message_received(on_message)
ws_server.run_forever()
