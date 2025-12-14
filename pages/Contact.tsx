import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

const Contact: React.FC = () => {
    return (
        <section className="py-16 md:py-24 bg-white min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="font-serif text-4xl md:text-5xl font-bold text-pink mb-4">Connect With Us</h1>
                    <p className="text-dark-brown text-lg font-medium">Follow us on Instagram for daily inspiration</p>
                </motion.div>
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-2xl p-12 text-center border border-pink/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink to-rose-300"></div>
                    
                    <div className="mb-8">
                        <motion.div 
                            whileHover={{ rotate: 180, scale: 1.2 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block"
                        >
                            <Instagram size={64} className="text-pink mb-4" />
                        </motion.div>
                        <h2 className="font-serif text-3xl font-bold text-pink mb-4">Follow Our Journey</h2>
                        <p className="text-dark-brown text-lg mb-8 font-medium">Stay updated with our latest collections, behind-the-scenes moments, and customer stories on Instagram</p>
                    </div>
                    
                    <div className="bg-soft-pink rounded-xl p-8 mb-8 border border-pink/20">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Instagram className="text-pink" size={28} />
                            <span className="font-serif text-2xl font-bold text-pink">@trinketsand.beyond</span>
                        </div>
                        <p className="text-dark-brown font-medium">Tag us in your photos and use #TrinketsAndBeyond to be featured!</p>
                    </div>

                    <motion.a 
                        href="https://www.instagram.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-pink text-white px-8 py-4 rounded-lg font-medium hover:bg-rose-600 transition shadow-lg"
                    >
                        <Instagram size={20} />
                        <span>Follow Us on Instagram</span>
                    </motion.a>
                    
                    <div className="mt-12 pt-8 border-t-2 border-pink/10">
                        <p className="text-dark-brown mb-4 font-medium">Share your candle moments with us!</p>
                        <div className="flex justify-center gap-4 flex-wrap">
                            {['#TrinketsAndBeyond', '#CandleLove', '#ArtisanCandles', '#CozyVibes'].map(tag => (
                                <motion.span 
                                    key={tag}
                                    whileHover={{ scale: 1.1, backgroundColor: '#E91E63' }}
                                    className="bg-pink/80 text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors"
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