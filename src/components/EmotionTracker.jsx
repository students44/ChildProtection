import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Frown, Meh, AlertTriangle, Heart, Send, X } from 'lucide-react';
import { EmotionContext } from '../layout/Layout';

const EmotionTracker = () => {
    const { setEmotionData } = useContext(EmotionContext);
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [notes, setNotes] = useState('');
    const [showCounselorAlert, setShowCounselorAlert] = useState(false);

    const emotions = [
        {
            id: 'happy',
            name: 'Happy',
            icon: '😊',
            color: 'bg-green-100 hover:bg-green-200 border-green-300',
            activeColor: 'bg-green-500 text-white',
            IconComponent: Smile
        },
        {
            id: 'sad',
            name: 'Sad',
            icon: '😢',
            color: 'bg-blue-100 hover:bg-blue-200 border-blue-300',
            activeColor: 'bg-blue-500 text-white',
            IconComponent: Frown
        },
        {
            id: 'confused',
            name: 'Confused',
            icon: '😕',
            color: 'bg-yellow-100 hover:bg-yellow-200 border-yellow-300',
            activeColor: 'bg-yellow-500 text-white',
            IconComponent: Meh
        },
        {
            id: 'angry',
            name: 'Angry',
            icon: '😠',
            color: 'bg-orange-100 hover:bg-orange-200 border-orange-300',
            activeColor: 'bg-orange-500 text-white',
            IconComponent: AlertTriangle
        },
        {
            id: 'scared',
            name: 'Scared',
            icon: '😰',
            color: 'bg-red-100 hover:bg-red-200 border-red-300',
            activeColor: 'bg-red-500 text-white',
            IconComponent: AlertTriangle
        }
    ];

    const responses = {
        happy: { needsAlert: false },
        sad: { needsAlert: false },
        confused: { needsAlert: false },
        angry: { needsAlert: false },
        scared: { needsAlert: true }
    };

    const handleEmotionSelect = (emotionId) => {
        setSelectedEmotion(emotionId);
    };

    const handleSubmit = () => {
        if (selectedEmotion) {
            // Pass emotion data to ChatWidget via context
            setEmotionData({
                emotion: selectedEmotion,
                notes: notes
            });

            // Only show counselor alert for scared emotion
            if (responses[selectedEmotion].needsAlert) {
                setShowCounselorAlert(true);
            }

            // Reset the form after submitting
            setSelectedEmotion(null);
            setNotes('');
        }
    };

    const handleReset = () => {
        setSelectedEmotion(null);
        setNotes('');
        setShowCounselorAlert(false);
    };

    const handleAlertCounselor = () => {
        // In a real app, this would send an alert to a counselor
        alert('A counselor has been notified and will reach out to help you soon. You are not alone!');
        setShowCounselorAlert(false);
    };

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3">
                        <Heart className="text-pink-500" size={36} />
                        How Are You Feeling Today?
                    </h2>
                    <p className="text-gray-600 text-lg">
                        It's important to share your feelings. We're here to listen! 💙
                    </p>
                </div>

                {/* Emotion Selection */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                    {emotions.map((emotion) => (
                        <motion.button
                            key={emotion.id}
                            onClick={() => handleEmotionSelect(emotion.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer ${selectedEmotion === emotion.id
                                    ? emotion.activeColor
                                    : emotion.color
                                }`}
                        >
                            <div className="text-5xl mb-2">{emotion.icon}</div>
                            <div className="font-semibold text-sm">{emotion.name}</div>
                        </motion.button>
                    ))}
                </div>

                {/* Notes Section */}
                <AnimatePresence>
                    {selectedEmotion && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mb-6"
                        >
                            <label className="block text-gray-700 font-medium mb-2">
                                Want to tell us more? (Optional)
                            </label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="You can write about what happened or how you're feeling..."
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all resize-none"
                                rows="4"
                            />
                            <div className="flex gap-3 mt-4">
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <Send size={20} />
                                    Share My Feelings
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Counselor Alert Modal */}
                <AnimatePresence>
                    {showCounselorAlert && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                            onClick={() => setShowCounselorAlert(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                            >
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <AlertTriangle className="text-red-600" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                        We're Here to Help
                                    </h3>
                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        We noticed you're feeling scared. Would you like us to alert a counselor who can help you feel safe?
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <button
                                            onClick={handleAlertCounselor}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Yes, Please Alert a Counselor
                                        </button>
                                        <button
                                            onClick={() => setShowCounselorAlert(false)}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                                        >
                                            Not Right Now
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EmotionTracker;
