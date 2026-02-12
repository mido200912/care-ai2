import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaPaperPlane, FaRobot, FaUser, FaArrowLeft, FaTrash } from 'react-icons/fa';
import './Chat.css';

const Chat = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initial greeting
    useEffect(() => {
        setMessages([
            {
                id: 1,
                sender: 'ai',
                text: `Hello ${user?.name || 'there'}! I'm CareAi, your personal health assistant. I can help analyze your symptoms based on your medical profile. How can I assist you today?`,
                timestamp: new Date()
            }
        ]);
    }, [user]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender: 'user',
            text: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await chatAPI.sendQuery(input);

            const aiMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: response.data.answer,
                sources: response.data.sources || [],
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "I apologize, but I'm having trouble connecting to my medical database right now. Please try again later.",
                isError: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const clearChat = () => {
        if (window.confirm('Are you sure you want to clear the chat history?')) {
            setMessages([
                {
                    id: Date.now(),
                    sender: 'ai',
                    text: `Chat cleared. How can I help you now?`,
                    timestamp: new Date()
                }
            ]);
        }
    };

    // Helper to format text with bold (**text**)
    const formatMessage = (text) => {
        if (!text) return '';
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index} className="highlight-text">{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className="chat-page">
            <div className="chat-container glass-card">
                <div className="chat-header">
                    <button onClick={() => navigate('/dashboard')} className="icon-btn back-btn">
                        <FaArrowLeft />
                    </button>
                    <div className="chat-title">
                        <div className="ai-avatar">
                            <FaRobot />
                            <span className="status-dot online"></span>
                        </div>
                        <div>
                            <h2>CareAi Assistant</h2>
                            <p>Always active • Powered by AI</p>
                        </div>
                    </div>
                    <button onClick={clearChat} className="icon-btn clear-btn" title="Clear Chat">
                        <FaTrash />
                    </button>
                </div>

                <div className="chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message ${msg.sender} ${msg.isError ? 'error' : ''}`}>
                            <div className="message-avatar">
                                {msg.sender === 'ai' ? <FaRobot /> : <FaUser />}
                            </div>
                            <div className="message-content">
                                <div className="message-text">
                                    {formatMessage(msg.text)}
                                </div>
                                {msg.sources && msg.sources.length > 0 && (
                                    <div className="message-sources">
                                        <span>Sources:</span>
                                        <ul>
                                            {msg.sources.map((source, index) => (
                                                <li key={index}>{source}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="message-time">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))}
                    {loading && (
                        <div className="message ai typing">
                            <div className="message-avatar"><FaRobot /></div>
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSend} className="chat-input-area">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your symptoms or health question..."
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !input.trim()} className="send-btn">
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
