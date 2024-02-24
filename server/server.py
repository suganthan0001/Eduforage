from flask import Flask, request, jsonify
from chatbot import predict_class, get_response, intents


app = Flask(__name__)

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json['message']  
    response = get_chatbot_response(message)
    return jsonify({'response': response})


def get_chatbot_response(message):
    ints = predict_class(message)
    res = get_response(ints, intents)
    return res


if __name__ == '__main__':
    app.run(debug=True)



