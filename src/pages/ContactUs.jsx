import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import Contactimage from '../assets/Contact.jpg';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.subject) newErrors.subject = 'Subject is required';
        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', subject: 'General Inquiry', message: '' });
            setTimeout(() => setIsSuccess(false), 5000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
                >
                    {/* Left Side - Contact Form */}
                    <div className="md:w-1/2 p-12 bg-white relative transition-colors duration-300">
                        {isSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-0 left-0 right-0 bg-green-100 text-green-800 p-4 text-center flex items-center justify-center gap-2 z-20"
                            >
                                <CheckCircle size={20} />
                                <span className="font-medium">Message sent successfully!</span>
                            </motion.div>
                        )}

                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-colors bg-gray-50`}
                                        placeholder="Enter First Name"
                                    />
                                    {errors.firstName && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.firstName}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-colors bg-gray-50`}
                                        placeholder="Enter Last Name"
                                    />
                                    {errors.lastName && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.lastName}</p>}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-colors bg-gray-50`}
                                    placeholder="Enter Email Address"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
                                >
                                    <option>General Inquiry</option>
                                    <option>Report an Issue</option>
                                    <option>Feedback</option>
                                    <option>Partnership</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-500'} focus:border-transparent focus:ring-2 transition-colors bg-gray-50`}
                                    placeholder="Write your message here..."
                                ></textarea>
                                {errors.message && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{errors.message}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send size={20} />
                                        <span>Send Message</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Side - Image & Info */}
                    <div className="md:w-1/2 bg-indigo-900 text-white p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                            <p className="text-indigo-100 mb-8 text-lg">
                                We are here to help and answer any question you might have. We look forward to hearing from you.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-500 p-3 rounded-full">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-indigo-200 text-sm">Phone</p>
                                        <p className="font-semibold">+92 3452645064</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-500 p-3 rounded-full">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-indigo-200 text-sm">Email</p>
                                        <p className="font-semibold">muneebtech005@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="bg-indigo-500 p-3 rounded-full">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-indigo-200 text-sm">Office</p>
                                        <p className="font-semibold">Islamabad, Pakistan</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-purple-500 rounded-full opacity-50 blur-2xl"></div>

                        {/* Background Image Overlay */}
                        <div className="absolute inset-0 z-0 opacity-20">
                            <img
                                src={Contactimage}
                                alt="Contact Background"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ContactUs;
