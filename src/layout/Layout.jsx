import React, { useState, createContext } from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import { Outlet } from 'react-router-dom';
import Logo from '../assets/logo.png';

// Create context for emotion data
export const EmotionContext = createContext();

const Layout = () => {
    const [emotionData, setEmotionData] = useState({ emotion: null, notes: '' });

    return (
        <EmotionContext.Provider value={{ emotionData, setEmotionData }}>
            <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900 font-sans relative overflow-hidden">
                {/* Animated Background Blobs */}
                <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 flex flex-col min-h-screen">
                    <Navbar />
                    <main className="flex-grow container mx-auto px-4 py-8">
                        <Outlet />
                    </main>
                    <ChatWidget
                        initialEmotion={emotionData.emotion}
                        emotionNotes={emotionData.notes}
                    />
                    <Footer logo={Logo} logoStyle={{ width: "90px", height: "90px", objectFit: "cover" }} />

                </div>
            </div>
        </EmotionContext.Provider>
    );
};


export default Layout;
