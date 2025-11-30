import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

const Stories = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
            >
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <BookOpen size={40} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Safety Stories</h1>
                <p className="text-[14px] text-gray-600 mb-8">
                    Inspiring tales that help children understand right and wrong in real-life situations.
                </p>
                <div className="p-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">Story library loading...</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Stories;
