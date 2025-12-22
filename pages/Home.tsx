import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM as any;
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Star, Loader, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../lib/api';
import { Candle, Review } from '../types';
import CandleCard from '../components/CandleCard';

const Home: React.FC = () => {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        const loadData = async () => {
            const [c, r] = await Promise.all([api.getCandles(), api.getReviews()]);
            setCandles(c.slice(0, 3));
            setReviews(r.slice(0, 3));
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
                    <Loader className="text-pink" size={48} />
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[100vh] flex items-center pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div 
                            style={{ y: heroY, opacity: heroOpacity }}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink/5 border border-pink/10 mb-8">
                                <Sparkles size={14} className="text-pink" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-pink uppercase">Artisan Small Batch</span>
                            </div>
                            
                            <h1 className="font-serif text-6xl md:text-8xl font-black text-dark-brown mb-8 leading-[0.95] tracking-tight">
                                Pure Soul, <br/>
                                <span className="italic font-normal text-pink">Poured Heart.</span>
                            </h1>
                            
                            <p className="text-xl text-dark-brown/60 mb-12 max-w-lg leading-relaxed font-medium">
                                We craft sensory experiences that turn your house into a home. 100% soy wax, zero toxins, endless warmth.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link to="/collections">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-pink text-white px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-pink/30 flex items-center gap-3 justify-center group"
                                    >
                                        Explore Scents 
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </motion.button>
                                </Link>
                                <Link to="/about">
                                    <motion.button 
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 1)", scale: 1.05 }}
                                        className="bg-white/50 backdrop-blur-md text-dark-brown px-10 py-5 rounded-2xl font-bold border border-white/80 shadow-xl"
                                    >
                                        Our Craft
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative z-10 group">
                                <motion.div
                                    animate={{ 
                                        y: [0, -20, 0],
                                        rotate: [0, 1, 0]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1602874801006-e24946a9a1c2?w=800&h=1000&fit=crop" 
                                        alt="Signature Candle" 
                                        className="rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(45,27,23,0.3)] w-full object-cover border-[12px] border-white transition-transform duration-700 group-hover:scale-[1.02]"
                                    />
                                </motion.div>
                                
                                <motion.div 
                                    className="absolute -bottom-10 -right-10 bg-white p-6 rounded-[2rem] shadow-2xl border border-pink/5 max-w-[200px]"
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 1 }}
                                >
                                    <div className="flex gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-pink fill-pink" />)}
                                    </div>
                                    <p className="text-sm font-serif font-bold italic">"Literally changed the energy of my home."</p>
                                    <p className="text-[10px] text-pink font-bold mt-2">— SARAH J.</p>
                                </motion.div>
                            </div>

                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 opacity-30">
                                <div className="w-full h-full bg-gradient-to-br from-rose/40 to-transparent rounded-full blur-[100px] animate-pulse" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Trending Section */}
            <section className="py-32 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
                    >
                        <div>
                            <span className="text-pink font-bold tracking-widest text-xs uppercase mb-3 block">Selected by Hand</span>
                            <h2 className="font-serif text-5xl font-black text-dark-brown">The Signature Edits</h2>
                        </div>
                        <Link to="/collections" className="group flex items-center gap-2 text-pink font-bold text-lg">
                            Explore All <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {candles.map((candle, i) => (
                            <motion.div 
                                key={candle.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <CandleCard candle={candle} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-32 bg-cream/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-dark-brown rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center md:text-left">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-pink/20 rounded-full blur-[100px]" />
                        <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 className="font-serif text-5xl md:text-6xl font-bold text-white mb-8">Loved by <br/><span className="italic text-pink">Our Community.</span></h2>
                                <p className="text-white/60 text-lg font-medium max-w-md mx-auto md:mx-0">
                                    Over 10,000 candles shipped worldwide. Join the movement of mindful living.
                                </p>
                            </div>
                            <div className="space-y-6">
                                {reviews.map((review, i) => (
                                    <motion.div 
                                        key={review.id}
                                        initial={{ opacity: 0, x: 50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/5 backdrop-blur-md p-6 rounded-3xl border border-white/10"
                                    >
                                        <div className="flex gap-1 text-pink mb-3">
                                            {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                        </div>
                                        <p className="text-white/80 italic font-medium mb-4">"{review.text}"</p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-pink flex items-center justify-center text-[10px] font-bold text-white">
                                                {review.name.charAt(0)}
                                            </div>
                                            <span className="text-white text-xs font-bold uppercase tracking-widest">{review.name}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;