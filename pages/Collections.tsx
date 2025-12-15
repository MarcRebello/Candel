import React, { useEffect, useState } from 'react';

// Fix: Cast framer-motion to any to bypass prop validation type errors
import * as FramerMotion from 'framer-motion';
const { motion } = FramerMotion as any;

import { api } from '../lib/api';
import { Candle } from '../types';
import CandleCard from '../components/CandleCard';
import { Loader } from 'lucide-react';

const Collections: React.FC = () => {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.getCandles().then(data => {
            setCandles(data);
            setLoading(false);
        });
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-pink" size={40} /></div>;

    return (
        <section className="py-16 md:py-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-pink font-serif italic text-xl">Discover our scents</span>
                    <h1 className="font-serif text-5xl md:text-6xl font-bold text-dark-brown mt-2 mb-6">The Collection</h1>
                    <div className="w-24 h-1 bg-pink mx-auto rounded-full"></div>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                    initial="hidden"
                    animate="show"
                    variants={{
                        show: { transition: { staggerChildren: 0.1 } }
                    }}
                >
                    {candles.map((candle) => (
                        <motion.div 
                            key={candle.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0 }
                            }}
                        >
                            <CandleCard candle={candle} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Collections;