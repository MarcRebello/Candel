import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Send } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section className="py-32 md:py-48 bg-cream min-h-screen">
            <div className="max-w-4xl mx-auto px-6 sm:px-10">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <span className="text-rose font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Connections</span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-charcoal tracking-tighter leading-tight">Join the Inner <span className="italic font-normal text-rose">Circle.</span></h1>
                </motion.div>
                
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-[3.5rem] shadow-2xl p-16 text-center border border-rose/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose/40 via-gold/40 to-rose/40 opacity-50"></div>
                    
                    <div className="mb-16">
                        <motion.div 
                            whileHover={{ rotate: 180, scale: 1.1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="inline-flex w-24 h-24 bg-cream items-center justify-center rounded-full mb-10 shadow-sm border border-rose/5"
                        >
                            <Instagram size={40} className="text-rose" strokeWidth={1.5} />
                        </motion.div>
                        <h2 className="font-serif text-4xl font-black text-charcoal mb-6 tracking-tight">Olfactive Inspiration</h2>
                        <p className="text-muted-brown text-lg font-light leading-relaxed max-w-xl mx-auto opacity-70">
                            Follow our slow-pour journey and discover the botanical stories behind every limited release.
                        </p>
                    </div>
                    
                    <div className="bg-cream rounded-[2.5rem] p-12 mb-16 border border-rose/10 group hover:border-rose transition-colors duration-700">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <Instagram className="text-rose" size={24} strokeWidth={1.5} />
                            <span className="font-serif text-3xl font-black text-charcoal tracking-tight">@trinketsand.beyond</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-stone-400">Join our 50k+ community</p>
                    </div>

                    <motion.a 
                        href="https://www.instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02, y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-4 bg-charcoal text-white px-12 py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-2xl border border-white/10"
                    >
                        <Instagram size={18} strokeWidth={1.5} />
                        <span>Follow Our Story</span>
                    </motion.a>
                    
                    <div className="mt-20 pt-12 border-t border-stone-50">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-300 mb-8">Current Mood Tags</p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {['#TrinketsAndBeyond', '#StillnessPoured', '#OlfactiveArt', '#TheAlchemistManual'].map(tag => (
                                <motion.span 
                                    key={tag}
                                    whileHover={{ scale: 1.1, color: '#D4A3A3' }}
                                    className="text-stone-400 text-[10px] font-bold uppercase tracking-widest cursor-pointer px-4 py-2 hover:bg-cream rounded-full transition-all duration-300"
                                >
                                    {tag}
                                </motion.span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;