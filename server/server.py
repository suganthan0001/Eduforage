from flask import Flask, request, jsonify
from chatbot import predict_class, get_response, intents
from flask_cors import CORS


app = Flask(__name__)

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


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



