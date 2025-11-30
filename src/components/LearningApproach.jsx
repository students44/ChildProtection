import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, BookOpen, HelpCircle, Image } from 'lucide-react';
import { Link } from 'react-router-dom';

const LearningApproach = () => {
    const modules = [
        {
            icon: <Gamepad2 size={32} />,
            title: "Games",
            description: "Interactive challenges that teach safety rules through play.",
            color: "bg-purple-100 text-purple-600",
            delay: 0.1,
            path: "/games"
        },
        {
            icon: <BookOpen size={32} />,
            title: "Stories",
            description: "Inspiring tales that help children understand right and wrong in real-life situations.",
            color: "bg-blue-100 text-blue-600",
            delay: 0.2,
            path: "/stories"
        },
        {
            icon: <HelpCircle size={32} />,
            title: "Quizzes",
            description: "Simple question-based learning that boosts awareness and builds confidence.",
            color: "bg-green-100 text-green-600",
            delay: 0.3,
            path: "/quizzes"
        },
        {
            icon: <Image size={32} />,
            title: "Visual Tools",
            description: "Illustrations, animations, and icons that make learning clear and memorable.",
            color: "bg-orange-100 text-orange-600",
            delay: 0.4,
            path: "/visual-tools"
        }
    ];

    return (
        <section className="py-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                    >
                        Children Learn Better Through Activities
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-gray-600"
                    >
                        Kids absorb safety concepts more effectively when they can interact, explore, and experience real-life situations in a playful way. That’s why our learning approach is built around engaging, child-friendly modules designed to make protection knowledge simple, fun, and unforgettable.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {modules.map((module, index) => (
                        <Link to={module.path} key={index} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: module.delay }}
                                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 group h-full cursor-pointer"
                            >
                                <div className={`${module.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {module.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
                                <p className="text-gray-600 mb-4">{module.description}</p>
                            </motion.div>
                        </Link>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 text-center bg-indigo-50 rounded-2xl p-8"
                >
                    <p className="text-lg text-indigo-900 font-medium">
                        Each activity has its own dedicated page, giving children a distraction-free space to learn, explore, and grow.
                        <br className="hidden md:block" />
                        Together, these modules create a safe digital environment where every child can understand how to protect themselves.
                    </p>
                </motion.div>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>
        </section>
    );
};

export default LearningApproach;
