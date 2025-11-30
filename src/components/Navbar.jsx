import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Phone, BookOpen, Users, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import Logo from '../assets/logo.png'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/', icon: <Shield size={18} /> },
        { name: 'Report Abuse', path: '/report', icon: <Shield size={18} className="text-danger" /> },
        { name: 'Emergency', path: '/emergency', icon: <Phone size={18} /> },
        { name: 'Education', path: '/education', icon: <BookOpen size={18} /> },
        { name: 'Resources', path: '/resources', icon: <Users size={18} /> },
        { name: 'Contact Us', path: '/contact', icon: <Phone size={18} /> },
    ];

    return (
        <nav className="bg-transparent sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center space-x-2 text-primary font-heading font-bold text-xl">
                        <img src={Logo} alt="site logo" style={{ width: "90px", height: "90px", objectFit: "cover" }} />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className={`flex items-center space-x-1 transition-colors font-medium text-sm ${isActive
                                        ? 'text-indigo-600 font-bold'
                                        : 'text-text hover:text-primary'
                                        }`}
                                >
                                    <span>{link.name}</span>
                                </Link>
                            );
                        })}

                        <div className="border-l border-gray-200 h-6 mx-4"></div>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-700 font-medium">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-primary">
                                        <User size={18} />
                                    </div>
                                    <span>{user?.name}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1 text-gray-500 hover:text-danger transition-colors"
                                    title="Logout"
                                >
                                    <LogOut size={17} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all font-medium text-sm shadow-md">
                                    <LogIn size={16} />
                                    Log In
                                </Link>
                                <Link to="/signup" className="flex items-center gap-2 px-5 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition-all font-medium text-sm">
                                    <User size={16} />
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-text hover:text-primary focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-4 pt-2 pb-4 space-y-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center space-x-2 py-2 rounded-md px-2 transition-colors ${isActive
                                            ? 'text-indigo-600 font-bold'
                                            : 'text-text hover:text-primary hover:bg-gray-50'
                                            }`}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </Link>
                                );
                            })}

                            <div className="border-t border-gray-100 my-2 pt-2">
                                {isAuthenticated ? (
                                    <>
                                        <div className="flex items-center gap-2 py-2 px-2 text-gray-700 font-medium">
                                            <User size={18} />
                                            <span>{user?.name}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 py-2 px-2 text-danger w-full hover:bg-red-50 rounded-md"
                                        >
                                            <LogOut size={18} />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-col gap-2 mt-2">
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 font-medium text-sm"
                                        >
                                            <LogIn size={16} />
                                            Log In
                                        </Link>
                                        <Link
                                            to="/signup"
                                            onClick={() => setIsOpen(false)}
                                            className="flex items-center justify-center gap-2 py-2 border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full font-medium text-sm"
                                        >
                                            <User size={16} />
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
