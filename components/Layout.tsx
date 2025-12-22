import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { NavLink, Outlet, useLocation } = ReactRouterDOM as any;
import * as FramerMotion from 'framer-motion';
const { motion, AnimatePresence, useScroll, useTransform } = FramerMotion as any;
import { Flame, Menu, X, Instagram, ShoppingCart } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

const BackgroundVisuals = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Soft Warm Gradients */}
            <div className="absolute top-[-10%] right-[-5%] w-[60%] h-[60%] bg-pink/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '12s' }} />
            <div className="absolute bottom-[-5%] left-[-5%] w-[50%] h-[50%] bg-rose-200/10 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s' }} />
            
            {/* Animated Particles */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-pink/20 rounded-full"
                    initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                    animate={{ 
                        y: ["-10%", "110%"],
                        opacity: [0, 1, 0]
                    }}
                    transition={{ 
                        duration: 10 + Math.random() * 20, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: Math.random() * 10
                    }}
                />
            ))}
        </div>
    );
};

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`relative flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${
                    scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/40' : 'bg-transparent'
                }`}>
                    <NavLink to="/" className="flex items-center space-x-2 group">
                        <motion.div 
                            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                            className="bg-pink text-white p-2 rounded-xl shadow-lg shadow-pink/20"
                        >
                            <Flame size={20} fill="currentColor" />
                        </motion.div>
                        <span className="font-serif text-xl font-extrabold text-dark-brown tracking-tight">
                            Trinkets <span className="text-pink">&</span> Beyond
                        </span>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-2">
                        {NAVIGATION_LINKS.map((link: any) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }: any) =>
                                    `px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${
                                        isActive ? 'text-pink' : 'text-dark-brown/70 hover:text-pink'
                                    }`
                                }
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div 
                                        layoutId="nav-underline"
                                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink rounded-full"
                                    />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-dark-brown hover:text-pink transition-colors relative"
                        >
                            <ShoppingCart size={22} />
                            <span className="absolute top-0 right-0 w-4 h-4 bg-pink text-white text-[10px] flex items-center justify-center rounded-full font-bold">0</span>
                        </motion.button>
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-dark-brown">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
                    >
                        <div className="p-6 space-y-2">
                            {NAVIGATION_LINKS.map((link: any) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }: any) =>
                                        `block px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
                                            isActive ? 'bg-pink text-white shadow-lg shadow-pink/20' : 'text-dark-brown hover:bg-pink/5 hover:text-pink'
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

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen relative font-sans">
            <BackgroundVisuals />
            <Navbar />
            <main className="flex-grow z-10 relative">
                 <Outlet />
            </main>
            <footer className="bg-dark-brown text-white py-20 z-10 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="col-span-1 md:col-span-2 space-y-6">
                            <div className="flex items-center justify-center md:justify-start space-x-2">
                                <Flame size={24} className="text-pink" fill="currentColor" />
                                <span className="font-serif text-2xl font-bold">Trinkets <span className="text-pink">&</span> Beyond</span>
                            </div>
                            <p className="text-white/60 text-lg max-w-md mx-auto md:mx-0 font-medium">
                                Elevating everyday moments with handcrafted scents that linger in your heart.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-serif text-lg font-bold mb-6 text-pink">Quick Links</h4>
                            <ul className="space-y-4 font-medium text-white/50">
                                {NAVIGATION_LINKS.map(l => (
                                    <li key={l.path}><NavLink to={l.path} className="hover:text-white transition-colors">{l.label}</NavLink></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-serif text-lg font-bold mb-6 text-pink">Socials</h4>
                            <div className="flex justify-center md:justify-start gap-4">
                                <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-pink transition-all transform hover:-translate-y-1">
                                    <Instagram size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;