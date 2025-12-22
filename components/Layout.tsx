import React, { useState, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { NavLink, Outlet, useLocation } = ReactRouterDOM as any;
import * as FramerMotion from 'framer-motion';
const { motion, AnimatePresence } = FramerMotion as any;
import { Flame, Menu, X, Instagram, ShoppingCart, Search } from 'lucide-react';
import { NAVIGATION_LINKS } from '../constants';

const BackgroundVisuals = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Soft Organic Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-rose/10 rounded-full blur-[140px] animate-pulse-slow" />
            <div className="absolute bottom-[-10%] left-[-5%] w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
            
            {/* Ember Particles */}
            {[...Array(12)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-rose/40 rounded-full animate-ember"
                    style={{ 
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 10}s`,
                        animationDuration: `${10 + Math.random() * 10}s`
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
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-700 ${scrolled ? 'py-4' : 'py-8'}`}>
            <div className="max-w-7xl mx-auto px-6 sm:px-10">
                <div className={`flex justify-between items-center transition-all duration-500 rounded-[2rem] px-8 py-3 ${
                    scrolled ? 'bg-white/70 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50' : 'bg-transparent'
                }`}>
                    <NavLink to="/" className="flex items-center space-x-3 group">
                        <motion.div 
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            className="text-rose transition-colors duration-300 group-hover:text-charcoal"
                        >
                            <Flame size={28} strokeWidth={1.5} fill="currentColor" />
                        </motion.div>
                        <span className="font-serif text-2xl font-black text-charcoal tracking-tighter uppercase">
                            Trinkets <span className="text-rose italic">&</span> Beyond
                        </span>
                    </NavLink>

                    <div className="hidden md:flex items-center space-x-2">
                        {NAVIGATION_LINKS.map((link: any) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }: any) =>
                                    `px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.15em] uppercase transition-all duration-500 relative ${
                                        isActive ? 'text-rose' : 'text-charcoal/60 hover:text-charcoal'
                                    }`
                                }
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <motion.div 
                                        layoutId="nav-glow"
                                        className="absolute -inset-1 bg-rose/5 rounded-full -z-10"
                                    />
                                )}
                            </NavLink>
                        ))}
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-4">
                            <button className="text-charcoal/40 hover:text-charcoal transition-colors">
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                            <motion.button 
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 text-charcoal transition-colors relative"
                            >
                                <ShoppingCart size={22} strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose text-white text-[9px] flex items-center justify-center rounded-full font-black">0</span>
                            </motion.button>
                        </div>
                        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-charcoal">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-6 right-6 mt-4 bg-white/95 backdrop-blur-3xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden"
                    >
                        <div className="p-8 space-y-4">
                            {NAVIGATION_LINKS.map((link: any) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }: any) =>
                                        `block px-8 py-5 rounded-2xl text-xl font-serif font-bold transition-all ${
                                            isActive ? 'bg-rose text-white shadow-xl shadow-rose/20' : 'text-charcoal hover:bg-rose/5 hover:text-rose'
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
        <div className="flex flex-col min-h-screen relative font-sans selection:bg-rose/30">
            <BackgroundVisuals />
            <Navbar />
            <main className="flex-grow z-10 relative">
                 <Outlet />
            </main>
            <footer className="bg-charcoal text-white py-32 z-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-rose rounded-full blur-[100px]" />
                </div>
                
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-20">
                        <div className="md:col-span-5 space-y-8">
                            <div className="flex items-center space-x-3">
                                <Flame size={32} className="text-rose" fill="currentColor" />
                                <span className="font-serif text-3xl font-black uppercase tracking-tighter">
                                    Trinkets <span className="text-rose italic">&</span> Beyond
                                </span>
                            </div>
                            <p className="text-white/50 text-xl font-light leading-relaxed max-w-sm">
                                Elevating everyday moments with handcrafted scents that linger in your heart and home.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-14 h-14 border border-white/10 rounded-full flex items-center justify-center hover:bg-rose hover:border-rose transition-all group">
                                    <Instagram size={22} className="group-hover:scale-110 transition-transform" />
                                </a>
                            </div>
                        </div>
                        
                        <div className="md:col-span-3">
                            <h4 className="font-serif text-lg font-bold mb-8 text-rose">Discovery</h4>
                            <ul className="space-y-5">
                                {NAVIGATION_LINKS.map(l => (
                                    <li key={l.path}>
                                        <NavLink to={l.path} className="text-white/40 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
                                            {l.label}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="md:col-span-4">
                            <h4 className="font-serif text-lg font-bold mb-8 text-rose">Newsletter</h4>
                            <p className="text-white/40 text-sm mb-6">Join our list for exclusive scents and stories.</p>
                            <div className="relative">
                                <input 
                                    type="email" 
                                    placeholder="your@email.com" 
                                    className="w-full bg-white/5 border-b border-white/20 px-0 py-4 focus:outline-none focus:border-rose transition-colors placeholder:text-white/20 text-sm"
                                />
                                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-rose font-black text-xs uppercase tracking-widest">Join</button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
                            © 2024 Trinkets and Beyond. All Rights Reserved.
                        </p>
                        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
                            <a href="#" className="hover:text-rose transition-colors">Privacy</a>
                            <a href="#" className="hover:text-rose transition-colors">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;