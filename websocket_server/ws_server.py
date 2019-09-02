# -*- coding: utf-8 -*-

import logging
from websocket_server import WebsocketServer

def solve_encoding(string):
    return string.encode('raw_unicode_escape').decode('utf-8')

def on_connect(client, server):
    server.send_message(client, "You are connected to python server")

def on_message(client, server, message):
    solved_message = message
    # 혹시 글자가 깨지면 아래 주석 해제
    # solved_message = solve_encoding(message)
    server.send_message(client, "you said " + solved_message)

ws_server = WebsocketServer(80, host='0.0.0.0')
ws_server.set_fn_new_client(on_connect)
ws_server.set_fn_message_received(on_message)
ws_server.run_forever()
