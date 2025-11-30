import React from 'react';
import { motion } from 'framer-motion';
import { Image } from 'lucide-react';

const VisualTools = () => {
    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center max-w-3xl mx-auto"
            >
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-600">
                    <Image size={40} />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Visual Learning Tools</h1>
                <p className="text-[14px] text-gray-600 mb-8">
                    Illustrations, animations, and icons that make learning clear and memorable.
                </p>
                <div className="p-12 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <p className="text-gray-500 font-medium">Visual gallery loading...</p>
                </div>
            </motion.div>
        </div>
    );
};

export default VisualTools;
