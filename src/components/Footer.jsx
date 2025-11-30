import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';


const Footer = ({ logo, logoStyle }) => {
    return (
        <footer className="bg-gray-800 text-white pt-12 pb-6">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 text-white font-heading font-bold text-xl">
                            <img src={logo} alt="ChildSafe Logo" style={logoStyle} />
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed">
                            Dedicated to protecting children and providing a safe environment for everyone.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Quick Links</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li><Link to="/" className="hover:text-indigo-400 transition-colors inline-block">Home</Link></li>
                            <li><Link to="/report" className="hover:text-indigo-400 transition-colors inline-block">Report Abuse</Link></li>
                            <li><Link to="/education" className="hover:text-indigo-400 transition-colors inline-block">Education</Link></li>
                            <li><Link to="/resources" className="hover:text-indigo-400 transition-colors inline-block">Resources</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-white">Contact Us</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-center space-x-2">
                                <Phone size={16} className="text-indigo-400" />
                                <span>1121 (Helpline)</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <Mail size={16} className="text-indigo-400" />
                                <span>help@childsafe.org</span>
                            </li>
                            <li className="flex items-center space-x-2">
                                <MapPin size={16} className="text-indigo-400" />
                                <span>Islamabad, Pakistan</span>
                            </li>
                        </ul>
                    </div>

                    {/* Emergency */}
                    <div>
                        <h3 className="font-bold text-lg mb-4 text-red-400">Emergency</h3>
                        <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                            If you or someone you know is in immediate danger, call the police immediately.
                        </p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-all w-full shadow-lg hover:shadow-xl transform hover:scale-105">
                            Call 15 Now
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} ChildSafe. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
