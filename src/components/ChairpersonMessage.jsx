import React, { useState } from 'react';
import { Quote, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import ChairpersonImage from '../assets/chairperson.jpg';
import '../index.css';

const ChairpersonMessage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-16 bg-gray-50 transition-colors duration-300 relative overflow-hidden">


            {/* --- Snake Animation Background --- */}
            <div className="absolute inset-0 pointer-events-none">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 800 600"
                    className="snake-path"
                    fill="none"
                >
                    <path
                        d="
                M 0 100 
                C 100 50, 200 150, 300 100
                S 500 150, 600 100
                S 700 50, 800 100
            "
                        stroke="#4F46E5"
                        strokeWidth="4"
                        strokeDasharray="14 20"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* --- End Animated Background --- */}


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal className="flex flex-col md:flex-row items-center gap-12">

                    {/* Image Section */}
                    <div className="md:w-1/3 flex flex-col items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-6 group">
                            <img
                                src={ChairpersonImage}
                                alt="Muneeb Khan"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-indigo-900">MUNEEB KHAN</h3>
                            <p className="text-indigo-600 font-medium tracking-wide uppercase text-sm mt-1">- Chairperson</p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-2/3 space-y-6">
                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 uppercase tracking-tight">
                                Message from Chairperson
                            </h2>
                            <div className="w-24 h-1.5 bg-indigo-600 rounded-full"></div>
                        </div>

                        <Quote className="w-12 h-12 text-indigo-200 rotate-180" />

                        <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                            <p>
                                In the heart of our mission lies an unwavering commitment to ensuring that the rights of every child in Pakistan are not only acknowledged but protected.
                            </p>
                            <p>
                                We are dedicated to creating a transformative landscape for children...
                            </p>
                        </div>

                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 cursor-pointer"
                        >
                            Read more
                        </button>
                    </div>
                </ScrollReveal>
            </div>
        </section>

    );
};

export default ChairpersonMessage;
