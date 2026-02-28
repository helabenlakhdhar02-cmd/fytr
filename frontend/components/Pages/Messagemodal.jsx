import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../config/api';

const MessageModal = ({ isOpen, onClose, recipientId }) => {




    const [messageText, setMessageText] = useState('');
    const [error, setError] = useState(null);

    const handleMessageChange = (event) => {
        setMessageText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!messageText.trim()) {
            setError('Message cannot be empty.');
            return;
        }

        try {
            const token = Cookies.get('access_token');
            const response = await fetch(`${API_BASE_URL}/fyter/privetmessage/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    receiver: recipientId,
                    content: messageText.trim()
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessageText('');
                alert("message sended")  // Clear the input field
                onClose(); // Clear the input field after successful submission
            } else {
                console.error('Failed to add comment:', response.statusText);
            }
            // Close the modal after sending the message
        } catch (error) {
            setError('Failed to send the message.');
            console.error("Send Message Error:", error);
        }
    };

    if (!isOpen) return null;  // Return null if the modal is closed

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-96 relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                    onClick={onClose}
                >
                    &times;
                </button>
                <h2 className="text-xl font-semibold mb-4">Send Message</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <textarea
                        placeholder="Type your message here..."
                        value={messageText}
                        onChange={handleMessageChange}
                        rows="4"
                        className="w-full p-3 border border-gray-300 rounded-md mb-4"
                    />
                    <br />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MessageModal;
