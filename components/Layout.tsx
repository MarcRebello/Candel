import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, Instagram } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

const BackgroundTexture = () => (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.4] mix-blend-multiply">
        <svg className='w-full h-full'>
            <filter id='noiseFilter'>
                <feTurbulence 
                    type='fractalNoise' 
                    baseFrequency='0.8' 
                    numOctaves='3' 
                    stitchTiles='stitch' />
            </filter>
            <rect width='100%' height='100%' filter='url(#noiseFilter)' />
        </svg>
    </div>
);

const FloatingParticles = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Animated Glow Orbs - Softer Colors */}
        {[...Array(4)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-pink/5 to-rose-100/10 blur-3xl"
                initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: Math.random() * window.innerHeight,
                }}
                animate={{ 
                    x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
                    y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ 
                    duration: 20 + Math.random() * 10, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut"
                }}
                style={{
                    width: `${400 + Math.random() * 300}px`,
                    height: `${400 + Math.random() * 300}px`,
                }}
            />
        ))}
    </div>
);

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full top-0 z-50 transition-all duration-300">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-between items-center h-20">
                    <NavLink to="/" className="flex items-center space-x-2 group">
                        <motion.div 
                            whileHover={{ scale: 1.2, rotate: 180 }} 
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="bg-pink/10 p-2 rounded-full text-pink"
                        >
                            <Flame size={24} fill="currentColor" />
                        </motion.div>
                        <span className="font-serif text-2xl font-bold text-dark-brown tracking-tight group-hover:text-pink transition-colors">Trinkets <span className="text-pink font-light">&</span> Beyond</span>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-1">
                        {NAVIGATION_LINKS.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 relative group ${
                                        isActive ? 'text-pink bg-pink/5' : 'text-dark-brown hover:text-pink hover:bg-white/50'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-dark-brown hover:text-pink transition-colors">
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
                        className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden absolute w-full shadow-xl"
                    >
                        <div className="px-4 py-6 space-y-2">
                            {NAVIGATION_LINKS.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                                            isActive ? 'bg-pink text-white shadow-md' : 'text-dark-brown hover:bg-pink/5 hover:text-pink'
                                        }`
                                    }
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
    <footer className="bg-dark-brown text-white py-16 relative overflow-hidden z-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Flame size={24} className="text-pink" fill="currentColor" />
                        <span className="font-serif text-2xl font-bold">Trinkets <span className="text-pink">&</span> Beyond</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed text-sm">Handcrafted artisan candles that illuminate your space with authentic elegance and warmth.</p>
                </div>
                <div>
                    <h3 className="font-serif text-lg font-bold mb-6 text-pink">Explore</h3>
                    <ul className="space-y-3">
                        {NAVIGATION_LINKS.map(link => (
                            <li key={link.path}><NavLink to={link.path} className="text-gray-300 hover:text-white hover:translate-x-1 transition-all inline-block text-sm">{link.label}</NavLink></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-serif text-lg font-bold mb-6 text-pink">Collections</h3>
                    <ul className="space-y-3">
                        {['Signature', 'Relaxation', 'Energizing', 'Seasonal'].map(c => (
                            <li key={c}><span className="text-gray-300 cursor-pointer hover:text-white transition text-sm">{c}</span></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h3 className="font-serif text-lg font-bold mb-6 text-pink">Stay Connected</h3>
                    <div className="flex gap-4 mb-4">
                        <a href="#" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-pink hover:text-white transition-all transform hover:scale-110 border border-white/10">
                            <Instagram size={20} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Trinkets and Beyond. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen relative bg-cream selection:bg-pink selection:text-white">
            <BackgroundTexture />
            <FloatingParticles />
            <Navbar />
            <main className="flex-grow z-10 relative pt-20">
                 <Outlet />
            </main>
            <Footer />
            <div className="fixed bottom-4 right-4 z-50">
                <NavLink to="/secret" className="block w-4 h-4 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 cursor-default" />
            </div>
        </div>
    );
};

export default Layout;