import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatWidget = ({ initialEmotion = null, emotionNotes = '', onOpen = null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can we help you today? You are chatting with a safe counselor.", sender: 'agent' }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    // Handle emotion context - updates whenever emotion changes
    useEffect(() => {
        if (initialEmotion && initialEmotion !== 'null' && initialEmotion !== null) {
            setIsOpen(true);
            const emotionGreeting = `I see you're feeling ${initialEmotion} today. ${emotionNotes ? `You mentioned: "${emotionNotes}". ` : ''}I'm here to listen and support you. How can I help?`;
            setMessages([
                { id: Date.now(), text: emotionGreeting, sender: 'agent' }
            ]);
            if (onOpen) onOpen();
        }
    }, [initialEmotion, emotionNotes, onOpen]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        // Add user message
        const userMsg = { id: Date.now(), text: inputText, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoading(true);

        try {
            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "system",
                            content: `You are a helpful, empathetic, and safe counselor for a child protection website. Your goal is to provide support, guidance, and resources to children and adults who may be facing abuse or difficult situations. Always prioritize safety and encourage seeking professional help or contacting authorities in emergencies. Be kind, patient, and non-judgmental.${initialEmotion ? ` The user has indicated they are feeling ${initialEmotion}.${emotionNotes ? ` They shared: "${emotionNotes}"` : ''}` : ''}`
                        },
                        ...messages.map(m => ({
                            role: m.sender === 'user' ? 'user' : 'assistant',
                            content: m.text
                        })),
                        { role: "user", content: userMsg.text }
                    ],
                    model: "meta-llama/llama-4-maverick-17b-128e-instruct",

                    temperature: 0.7,
                    max_tokens: 1024,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response');
            }

            const data = await response.json();
            const botResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process that. Please try again.";

            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'agent' }]);
        } catch (error) {
            console.error("Error calling Groq API:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting right now. Please try again later or call our helpline at 1121.", sender: 'agent' }]);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-80 md:w-96 mb-4 overflow-hidden border border-gray-200 flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex justify-between items-center text-white">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="font-bold">Live Support</span>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded cursor-pointer">
                                    <Minimize2 size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                                            ? 'bg-primary text-white rounded-tr-none'
                                            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none shadow-sm'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-tl-none shadow-sm p-3">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />

                        </div>

                        {/* Input */}
                        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-grow px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-primary text-sm"
                            />
                            <button
                                type="submit"
                                className="bg-primary text-white p-2 rounded-full hover:bg-indigo-700 transition-colors cursor-pointer"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="bg-primary cursor-pointer text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
