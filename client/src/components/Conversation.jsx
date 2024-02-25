import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../styles/Conversation.css"
import sendIcon from "../assets/send-icon.png";

function Conversation({setMessages,messages}) {

    const [inputField, setInputField] = useState("");

    function handleInput(e) {
        setInputField(e.target.value);
    }

    async function addSentMessage() {
        // Add the new message to the state first
        setMessages(messages => [
            ...messages,
            {
                "message": inputField,
                "by": "sent"
            }
        ]);
        
        try {
            // Then send the message
            await sendMessage(inputField);
        } catch (error) {
            console.error(error);
        }

        setInputField("");

    }
    
    async function sendMessage(inputMessage) {
        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "message": inputMessage })
            });
    
            const response = await res.json();
            // Add the received message to the state
            addReceiveMessage(response.response);
        } catch (e) {
            console.log(e);
            throw new Error('Failed to send message');
        }
    }

    function addReceiveMessage(content) {
        setMessages(messages => [
            ...messages,
            {
                "message": content,
                "by": "received"
            }
        ]);
    }
    console.log(messages);

    const now = messages.map((item, index) => {
        return (
            <div key={index} className={`message ${item.by}`}>
                {item.message}
            </div>
        );
    })

    return (
        <div className='chat-convo'>
            <div className='messages-container'>
                {now}
            </div>

            <InputGroup className="mb-3 chat-input" >
                <Form.Control
                    placeholder="Start Typing..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={inputField}
                    onChange={handleInput}
                />
                <Button className='btn btn-light' id="button-addon2" onClick={addSentMessage}>
                    Send <img src={sendIcon} alt="Send Icon" />
                </Button>
            </InputGroup>
        </div>
    )
}

export default Conversation;
