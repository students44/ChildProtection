import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Heart, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/Heroimage.png';
import ScrollReveal from '../components/ScrollReveal';
import ChairpersonMessage from '../components/ChairpersonMessage';
import EmotionTracker from '../components/EmotionTracker';
import LearningApproach from '../components/LearningApproach';


const Home = () => {


    const [user, setUser] = useState({ age: 22, name: 'Ali' });


    const handleClick = () => {

        setUser({ ...user, name: 'Ahmed' });
        console.log(user.name);
    }





    return (
        <div className="space-y-16">
            {/* Hero Section */}
            <section className="relative bg-indigo-600 rounded-3xl overflow-hidden text-white p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 transition-colors duration-300">
                <div className="md:w-1/2 space-y-6 z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-heading font-bold leading-tight"
                    >
                        Protecting Our Future, <br />
                        <span className="text-yellow-300">One Child at a Time</span>



                        {/* <button className='p-10' bg-gray-500 onClick={handleClick}
                            label="Click me">click</button> */}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-indigo-100"
                    >
                        A safe space to learn, report, and get help. We are here for you 24/7.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link to="/report" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-indigo-50 transition-colors flex items-center space-x-2">
                            <AlertTriangle size={20} />
                            <span>Report Abuse</span>
                        </Link>
                        <Link to="/emergency" className="bg-danger text-white px-8 py-3 rounded-full font-bold hover:bg-red-600 transition-colors flex items-center space-x-2">
                            <Phone size={20} />
                            <span>Get Help Now</span>
                        </Link>
                    </motion.div>
                </div>
                <div className="md:w-1/2 z-10 flex justify-center">
                    <motion.img
                        src={HeroImage}
                        alt="Child Protection"
                        className="w-full max-w-md h-auto rounded-full shadow-2xl object-cover"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Abstract decorative circles */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500 rounded-full opacity-50 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-72 h-72 bg-purple-500 rounded-full opacity-50 blur-3xl"></div>
            </section>

            {/* Chairperson Message */}
            <ChairpersonMessage />

            {/* Emotion Tracker Section */}
            <ScrollReveal>
                <EmotionTracker />
            </ScrollReveal>

            {/* Features Grid */}
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center text-red-600 mb-4">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Report Safely</h3>
                    <p className="text-gray-600 mb-4">Securely report abuse with options for anonymity. Your safety is our priority.</p>
                    <Link to="/report" className="text-primary font-medium hover:underline">Report now &rarr;</Link>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <Shield size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Learn Rights</h3>
                    <p className="text-gray-600 mb-4">Understand child rights and laws in Pakistan. Knowledge is power.</p>
                    <Link to="/education" className="text-primary font-medium hover:underline">Learn more &rarr;</Link>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center text-green-600 mb-4">
                        <Heart size={24} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">Get Support</h3>
                    <p className="text-gray-600 mb-4">Connect with counselors and find nearby help centers and NGOs.</p>
                    <Link to="/resources" className="text-primary font-medium hover:underline">Find help &rarr;</Link>
                </div>
            </ScrollReveal>

            {/* Learning Approach Section */}
            <LearningApproach />

            {/* Scrolling Awareness */}
            <ScrollReveal className="bg-yellow-50 p-8 rounded-2xl border border-yellow-100">
                <h2 className="text-2xl font-bold text-yellow-800 mb-4 text-center">Did You Know?</h2>
                <div className="overflow-hidden relative">
                    <div className="whitespace-nowrap animate-marquee text-yellow-900 font-medium text-lg">
                        Every child has the right to protection from violence. • Call 1121 for immediate help. • Cyberbullying is a crime. • You are not alone.
                    </div>
                </div>
            </ScrollReveal>
        </div>
    );
};

export default Home;
