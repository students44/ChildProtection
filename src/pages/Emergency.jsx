import React from 'react';
import { Phone, MessageCircle, MapPin, Shield, AlertTriangle } from 'lucide-react';

const Emergency = () => {
    const emergencyContacts = [
        {
            name: "Child Helpline",
            number: "1121",
            description: "24/7 National Child Helpline for reporting abuse and seeking help.",
            color: "bg-red-500",
            textColor: "text-red-500",
            icon: <Phone size={24} />
        },
        {
            name: "Police Emergency",
            number: "15",
            description: "Immediate police assistance for life-threatening situations.",
            color: "bg-blue-600",
            textColor: "text-blue-600",
            icon: <Shield size={24} />
        },
        {
            name: "Cyber Crime Wing",
            number: "1991",
            description: "Report online harassment, cyberbullying, and grooming.",
            color: "bg-purple-600",
            textColor: "text-purple-600",
            icon: <AlertTriangle size={24} />
        },
        {
            name: "Edhi Ambulance",
            number: "115",
            description: "Emergency medical transport and assistance.",
            color: "bg-green-600",
            textColor: "text-green-600",
            icon: <HeartIcon size={24} />
        }
    ];

    // Helper component for Heart Icon since it was used but not imported in the list above, 
    // but I'll just use the lucide-react Heart if I import it, or replace it.
    // Let's import Heart from lucide-react.

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-gray-900">Emergency & Hotlines</h1>
                <p className="text-xl text-gray-600">
                    If you are in immediate danger, please call <span className="font-bold text-red-600">15</span> or <span className="font-bold text-red-600">1121</span> immediately.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {emergencyContacts.map((contact, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">{contact.name}</h2>
                                <div className={`${contact.textColor} bg-opacity-10 p-3 rounded-full bg-gray-100`}>
                                    {contact.icon}
                                </div>
                            </div>
                            <p className="text-gray-600 mb-6">{contact.description}</p>
                        </div>
                        <a
                            href={`tel:${contact.number}`}
                            className={`${contact.color} text-white text-center py-4 rounded-xl font-bold text-xl flex items-center justify-center gap-2 hover:opacity-90 transition-opacity`}
                        >
                            <Phone size={24} />
                            Call {contact.number}
                        </a>
                    </div>
                ))}
            </div>

            {/* WhatsApp Support */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                        <MessageCircle size={28} /> Chat on WhatsApp
                    </h2>
                    <p className="text-green-700">
                        Prefer to chat? Reach out to our support team discreetly via WhatsApp.
                    </p>
                </div>
                <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition-colors flex items-center gap-2 shadow-md">
                    <MessageCircle size={20} />
                    Start Chat
                </button>
            </div>

            {/* Location Based Help */}
            <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100 text-center space-y-6">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mx-auto">
                    <MapPin size={32} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Find Help Near You</h2>
                    <p className="text-gray-600 mt-2">
                        Locate the nearest police station, hospital, or child protection bureau.
                    </p>
                </div>
                <button className="bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition-colors">
                    View Nearby Centers
                </button>
            </div>
        </div>
    );
};

// Small fix for the missing HeartIcon import
const HeartIcon = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
);

export default Emergency;
