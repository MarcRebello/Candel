import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream"><Loader className="animate-spin text-rose" size={40} /></div>;

    return (
        <section className="py-32 md:py-40 min-h-screen bg-cream">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <span className="text-rose font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Seasonal</span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-charcoal tracking-tighter leading-tight">The Collection</h1>
                    <div className="w-24 h-1 bg-rose/20 mx-auto rounded-full mt-8"></div>
                </motion.div>
                
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20"
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
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
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