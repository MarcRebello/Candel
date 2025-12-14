import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, Instagram } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-cream opacity-90"></div>
        
        {/* Animated Glow Orbs */}
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full bg-pink/5 blur-3xl"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                    scale: 1
                }}
                animate={{ 
                    x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                    y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ 
                    duration: 15 + Math.random() * 10, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    width: `${300 + Math.random() * 200}px`,
                    height: `${300 + Math.random() * 200}px`,
                }}
            />
        ))}

        {/* Small Flame Particles */}
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={`flame-${i}`}
                className="absolute text-pink/10"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 100 
                }}
                animate={{ 
                    y: -100,
                    x: `calc(${Math.random() * 100}% + ${Math.sin(i) * 50}px)`,
                    opacity: [0, 1, 0],
                    rotate: [0, 45, -45, 0]
                }}
                transition={{ 
                    duration: 10 + Math.random() * 15, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 10
                }}
            >
                <Flame size={20 + Math.random() * 30} />
            </motion.div>
        ))}
    </div>
);

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-pink/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <NavLink to="/" className="flex items-center space-x-2 group z-50">
                        <motion.div whileHover={{ scale: 1.2, rotate: 15 }} className="text-pink drop-shadow-lg">
                            <Flame size={28} fill="currentColor" />
                        </motion.div>
                        <span className="font-serif text-2xl font-bold text-pink group-hover:text-rose-600 transition-colors">Trinkets and Beyond</span>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-8">
                        {NAVIGATION_LINKS.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `font-medium transition hover:text-pink relative group py-2 ${isActive ? 'text-pink' : 'text-dark-brown'}`
                                }
                            >
                                {link.label}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink transition-all group-hover:w-full"></span>
                            </NavLink>
                        ))}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-pink z-50">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-pink/20 overflow-hidden absolute w-full shadow-xl"
                    >
                        <div className="px-4 py-4 space-y-3">
                            {NAVIGATION_LINKS.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-dark-brown hover:text-pink transition font-medium p-3 rounded-lg hover:bg-pink/5"
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-gradient-to-br from-pink to-rose-500 text-white py-12 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Flame size={24} fill="currentColor" />
                        <span className="font-serif text-2xl font-bold">Trinkets and Beyond</span>
                    </div>
                    <p className="text-pink-100">Handcrafted artisan candles that illuminate your space with authentic elegance.</p>
                </div>
                <div>
                    <h3 className="font-serif text-xl font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        {NAVIGATION_LINKS.map(link => (
                            <li key={link.path}><NavLink to={link.path} className="text-pink-100 hover:text-white hover:translate-x-1 transition-all inline-block">{link.label}</NavLink></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-serif text-xl font-bold mb-4">Collections</h3>
                    <ul className="space-y-2">
                        {['Signature', 'Relaxation', 'Energizing', 'Seasonal'].map(c => (
                            <li key={c}><span className="text-pink-100 cursor-pointer hover:text-white transition">{c}</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-serif text-xl font-bold mb-4">Follow Us</h3>
                    <div className="flex gap-4 mb-4">
                        <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/40 transition transform hover:scale-110">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/20 pt-8 text-center text-pink-100">
                <p>&copy; {new Date().getFullYear()} Trinkets and Beyond. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen relative bg-cream selection:bg-pink selection:text-white">
            <FloatingParticles />
            <Navbar />
            <main className="flex-grow z-10 relative">
                 <Outlet />
            </main>
            <Footer />
            <div className="fixed bottom-4 right-4 z-50">
                <NavLink to="/secret" className="block w-6 h-6 bg-pink/10 hover:bg-pink/30 rounded-full transition-all duration-300 opacity-0 hover:opacity-100" />
            </div>
        </div>
    );
};

export default Layout;