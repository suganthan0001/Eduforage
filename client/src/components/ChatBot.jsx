import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/ChatBot.css'; 
import Conversation from './Conversation';
import chaticon from "../assets/chatbot.png"
const Chatbot = () => {
  const [showModal, setShowModal] = useState(false);

  const [messages, setMessages] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  }; 

  return (
    <div>
      {/* Button to toggle modal */}
      <Button variant="btn" onClick={toggleModal} className='chat-btn'>
        Chat <img src={chaticon} alt="Chat Icon" />
      </Button>
 
      {/* Modal component */}
      <Modal show={showModal} onHide={toggleModal} dialogClassName="modal-dialog-slideout">
        <Modal.Header>
          <Modal.Title className='modal-title'>AI CHATBOT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Conversation setMessages={setMessages} messages={messages} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Chatbot;
