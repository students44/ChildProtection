import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Shield, Users, Lock, Heart, Gavel, ChevronDown, ChevronUp } from 'lucide-react';

const Education = () => {
    const modules = [
        {
            title: "Cyberbullying",
            icon: <Lock size={32} />,
            color: "bg-purple-100 text-purple-600",
            content: "Cyberbullying is bullying that takes place over digital devices like cell phones, computers, and tablets. It can occur through SMS, Text, and apps, or online in social media, forums, or gaming where people can view, participate in, or share content. Cyberbullying includes sending, posting, or sharing negative, harmful, false, or mean content about someone else."
        },
        {
            title: "Good Touch vs Bad Touch",
            icon: <Heart size={32} />,
            color: "bg-pink-100 text-pink-600",
            content: "It's important to teach children the difference between a 'good touch' (like a hug from grandma) and a 'bad touch' (one that makes them uncomfortable or is in a private area). Empower children to say NO, run away, and tell a trusted adult."
        },
        {
            title: "Online Grooming",
            icon: <Users size={32} />,
            color: "bg-blue-100 text-blue-600",
            content: "Online grooming is when an adult builds an emotional connection with a child to gain their trust for the purpose of sexual abuse, sexual exploitation, or trafficking. Predators often pretend to be peers or offer gifts to lure victims."
        },
        {
            title: "Child Labor",
            icon: <Shield size={32} />,
            color: "bg-orange-100 text-orange-600",
            content: "Child labor deprives children of their childhood, their potential, and their dignity, and that is harmful to physical and mental development. It refers to work that is mentally, physically, socially or morally dangerous and harmful to children."
        }
    ];

    const laws = [
        {
            title: "Juvenile Justice System Act 2018",
            description: "Focuses on the rehabilitation and social reintegration of juvenile offenders, emphasizing alternatives to detention."
        },
        {
            title: "Zainab Alert, Response and Recovery Act 2020",
            description: "Establishes a response and recovery mechanism for missing and abducted children."
        },
        {
            title: "Prevention of Electronic Crimes Act 2016",
            description: "Addresses cyberstalking, cyberbullying, and online harassment, providing protection for children online."
        },
        {
            title: "Child Marriage Restraint Act",
            description: "Sets the minimum legal age for marriage to prevent child marriages and protect the rights of children."
        }
    ];

    return (
        <div className="space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Education & Awareness</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Empowering parents, teachers, and children with the knowledge to stay safe and protected.
                </p>
            </div>

            {/* Awareness Modules */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                    <BookOpen className="text-primary" /> Learning Modules
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {modules.map((module, index) => (
                        <ModuleCard key={index} module={module} />
                    ))}
                </div>
            </section>

            {/* Laws & Rights */}
            <section className="bg-gray-50 rounded-3xl p-8 md:p-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
                    <Gavel className="text-primary" /> Laws & Rights in Pakistan
                </h2>
                <div className="space-y-4">
                    {laws.map((law, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{law.title}</h3>
                            <p className="text-gray-600">{law.description}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

const ModuleCard = ({ module }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden"
        >
            <div
                className="p-6 cursor-pointer flex items-center justify-between"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${module.color}`}>
                        {module.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{module.title}</h3>
                </div>
                {isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-6 pb-6 text-gray-600 border-t border-gray-50 pt-4"
                >
                    {module.content}
                    <div className="mt-4">
                        <button className="text-primary font-medium hover:underline text-sm">Read full guide &rarr;</button>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Education;
