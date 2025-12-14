import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Star, Loader } from 'lucide-react';
import { api } from '../lib/api';
import { Candle, Review } from '../types';
import CandleCard from '../components/CandleCard';

const Home: React.FC = () => {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

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
        return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-pink" size={40} /></div>;
    }

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-16 md:py-24 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <motion.div 
                            className="flex-1 text-center lg:text-left z-10"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <motion.div 
                                className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md mb-6 border-2 border-pink/50"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-pink text-sm font-medium flex items-center gap-2 justify-center lg:justify-start">
                                    <Heart size={16} fill="currentColor" />
                                    Handcrafted with Love
                                </span>
                            </motion.div>
                            
                            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink to-rose-600 mb-6 leading-tight drop-shadow-sm">
                                Illuminate Your Space with Elegance
                            </h1>
                            
                            <p className="text-lg md:text-xl text-dark-brown/80 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
                                Handcrafted artisan candles created to bring warmth, comfort, and luxury to your home.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/collections">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(233, 30, 99, 0.4)" }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-pink text-white px-8 py-4 rounded-xl font-medium hover:bg-rose-600 transition shadow-lg w-full sm:w-auto"
                                    >
                                        Explore Collections
                                    </motion.button>
                                </Link>
                                <Link to="/reviews">
                                    <motion.button 
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-white/80 backdrop-blur text-pink px-8 py-4 rounded-xl font-medium hover:bg-white transition shadow-lg border-2 border-pink w-full sm:w-auto"
                                    >
                                        Write a Review
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            className="flex-1 w-full z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative group">
                                <div className="absolute inset-0 bg-pink blur-3xl opacity-30 rounded-full group-hover:opacity-50 transition-opacity duration-1000"></div>
                                <img 
                                    src="https://images.unsplash.com/photo-1602874801006-e24946a9a1c2?w=800&h=600&fit=crop" 
                                    alt="Artisan Candles" 
                                    className="relative rounded-3xl shadow-2xl w-full h-96 object-cover border-4 border-white/50 animate-float"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="py-16 md:py-24 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-serif text-4xl font-bold text-pink mb-4">Trending Now</h2>
                        <p className="text-dark-brown text-lg font-medium">Customer favorites from our collection</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {candles.map((candle, i) => (
                            <motion.div 
                                key={candle.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <CandleCard candle={candle} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reviews Preview */}
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="font-serif text-4xl font-bold text-pink mb-4">Love Notes</h2>
                        <p className="text-dark-brown text-lg font-medium">Experiences shared by our community</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {reviews.map((review, i) => (
                            <motion.div 
                                key={review.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow-xl border border-pink/10 hover:border-pink/30 transition-all"
                            >
                                <div className="flex text-pink mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                    ))}
                                </div>
                                <p className="text-dark-brown/80 mb-6 italic font-medium leading-relaxed">"{review.text}"</p>
                                <div className="flex items-center gap-4 border-t border-pink/10 pt-4">
                                    <div className="w-10 h-10 rounded-full bg-pink/20 flex items-center justify-center text-pink font-bold font-serif">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-pink">{review.name}</div>
                                        <div className="text-xs text-gray-500">{review.date}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;