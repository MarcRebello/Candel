import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Heart, Star, Loader, ArrowRight } from 'lucide-react';
import { api } from '../lib/api';
import { Candle, Review } from '../types';
import CandleCard from '../components/CandleCard';

const Home: React.FC = () => {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // Fetch data from API
            const [c, r] = await Promise.all([api.getCandles(), api.getReviews()]);
            setCandles(c.slice(0, 3));
            setReviews(r.slice(0, 3));
            setLoading(false);
        };
        loadData();
    }, []);

    // Staggered entrance for children elements
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    // Bouncy "Pop" animation
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 50, scale: 0.8 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                type: "spring", 
                stiffness: 400, 
                damping: 20 
            } 
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-cream"><Loader className="animate-spin text-pink" size={40} /></div>;
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-pink/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-rose-200/20 rounded-full blur-3xl"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Content */}
                        <motion.div 
                            className="flex-1 text-center lg:text-left"
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.div variants={itemVariants}>
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-pink/20 shadow-sm mb-8">
                                    <Heart size={14} className="text-pink fill-pink" />
                                    <span className="text-xs font-bold tracking-widest text-dark-brown uppercase">Artisan Crafted</span>
                                </div>
                            </motion.div>
                            
                            <motion.h1 
                                variants={itemVariants}
                                className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-dark-brown mb-6 leading-[1.1]"
                            >
                                Scents that <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink to-rose-500">Ignite Memories</span>
                            </motion.h1>
                            
                            <motion.p 
                                variants={itemVariants}
                                className="text-lg md:text-xl text-dark-brown/70 mb-10 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
                            >
                                Discover our collection of hand-poured soy candles, designed to transform your space into a sanctuary of warmth and tranquility.
                            </motion.p>
                            
                            <motion.div 
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            >
                                <Link to="/collections">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(233, 30, 99, 0.5)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-gradient-to-r from-pink to-rose-500 text-white px-8 py-4 rounded-full font-semibold hover:brightness-110 transition-all shadow-xl flex items-center gap-2 justify-center w-full sm:w-auto"
                                    >
                                        Shop Collection <ArrowRight size={18} />
                                    </motion.button>
                                </Link>
                                <Link to="/about">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white/50 backdrop-blur-md text-dark-brown px-8 py-4 rounded-full font-semibold transition-all shadow-lg border border-white/50 w-full sm:w-auto"
                                    >
                                        Our Story
                                    </motion.button>
                                </Link>
                            </motion.div>
                        </motion.div>
                        
                        {/* Hero Image with Blob */}
                        <motion.div 
                            className="flex-1 w-full relative"
                            initial={{ opacity: 0, x: 100, rotate: 10 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
                        >
                            <div className="relative z-10">
                                <motion.div
                                    animate={{ y: [-15, 15] }}
                                    transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1602874801006-e24946a9a1c2?w=800&h=900&fit=crop" 
                                        alt="Luxury Candle" 
                                        className="rounded-[2.5rem] shadow-2xl w-full max-w-md mx-auto object-cover border-8 border-white"
                                    />
                                </motion.div>
                                
                                {/* Floating Badge */}
                                <motion.div 
                                    className="absolute -bottom-8 -left-4 md:left-10 bg-white p-4 rounded-2xl shadow-xl border border-pink/10 flex items-center gap-4"
                                    initial={{ opacity: 0, scale: 0, y: 50 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.8 }}
                                >
                                    <div className="bg-green-100 p-3 rounded-full">
                                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-dark-brown text-sm">New Arrival</p>
                                        <p className="text-xs text-gray-500">Vanilla Dreams</p>
                                    </div>
                                </motion.div>
                            </div>
                            
                            {/* Organic Blob Behind */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] -z-10">
                                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-pink/10 animate-pulse" style={{ animationDuration: '10s' }}>
                                    <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,31.2C59,40.9,47.1,47.4,36.1,55.1C25.1,62.8,15,71.7,2.7,67C-9.6,62.3,-24.1,44,-37.2,30.3C-50.3,16.6,-62,7.5,-66.1,-4.2C-70.2,-15.9,-66.7,-30.2,-57.4,-41.2C-48.1,-52.2,-33,-59.9,-18.7,-68.8C-4.4,-77.7,9,-87.8,22.7,-87.2C36.4,-86.6,50.3,-75.3,44.7,-76.4Z" transform="translate(100 100)" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="py-24 bg-white/50 backdrop-blur-sm relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-brown mb-4">Trending Scents</h2>
                        <div className="w-24 h-1 bg-pink mx-auto rounded-full"></div>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {candles.map((candle, i) => (
                            <motion.div 
                                key={candle.id}
                                initial={{ opacity: 0, y: 100, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ 
                                    type: "spring", 
                                    stiffness: 100, 
                                    damping: 20, 
                                    delay: i * 0.1 
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <CandleCard candle={candle} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Preview */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-pink/5 -skew-y-3 transform origin-top-left z-0"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                        <div className="text-left">
                            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark-brown mb-4">Love Notes</h2>
                            <p className="text-dark-brown/70 text-lg">See what our community is saying</p>
                        </div>
                        <Link to="/reviews" className="hidden md:block text-pink font-bold hover:text-rose-600 transition-colors">View all reviews &rarr;</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review, i) => (
                            <motion.div 
                                key={review.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 20,
                                    delay: i * 0.1 
                                }}
                                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-pink/20"
                            >
                                <div className="flex text-pink mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-200"} />
                                    ))}
                                </div>
                                <p className="text-dark-brown/80 mb-8 font-medium leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink to-rose-400 flex items-center justify-center text-white font-bold font-serif text-lg shadow-md">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-dark-brown">{review.name}</div>
                                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{review.date}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="mt-8 text-center md:hidden">
                        <Link to="/reviews" className="text-pink font-bold hover:text-rose-600 transition-colors">View all reviews &rarr;</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;