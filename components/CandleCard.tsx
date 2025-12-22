import React from 'react';
import { Star, ShoppingBag, ArrowUpRight } from 'lucide-react';
import * as FramerMotion from 'framer-motion';
const { motion } = FramerMotion as any;
import { Candle } from '../types';

interface CandleCardProps {
    candle: Candle;
}

const CandleCard: React.FC<CandleCardProps> = ({ candle }) => {
    return (
        <motion.div 
            whileHover={{ y: -15 }}
            className="group relative flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(216,27,96,0.2)] border border-gray-100/50"
        >
            {/* Image Wrap */}
            <div className="relative aspect-[4/5] overflow-hidden bg-cream">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={candle.image} 
                    alt={candle.name} 
                    className="w-full h-full object-cover"
                />
                
                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Category Tag */}
                <div className="absolute top-6 left-6">
                    <span className="bg-white/80 backdrop-blur-xl px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-dark-brown shadow-sm">
                        {candle.collection.split(' ')[0]}
                    </span>
                </div>

                {/* Quick Add Floating Button */}
                <motion.button
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-6 right-6 w-12 h-12 bg-pink text-white rounded-2xl flex items-center justify-center shadow-xl opacity-0 translate-y-[-20px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
                >
                    <ShoppingBag size={20} />
                </motion.button>
            </div>

            {/* Info */}
            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-serif text-2xl font-black text-dark-brown group-hover:text-pink transition-colors leading-tight">
                        {candle.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-pink/5 px-2 py-1 rounded-lg">
                        <Star size={12} className="text-pink fill-pink" />
                        <span className="text-xs font-black text-pink">{candle.rating}</span>
                    </div>
                </div>

                <p className="text-dark-brown/50 text-sm font-medium leading-relaxed line-clamp-2 mb-8 flex-grow">
                    {candle.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-xl font-serif font-black text-dark-brown">$34.00</span>
                    <button className="flex items-center gap-2 text-pink font-bold text-sm uppercase tracking-widest hover:translate-x-1 transition-transform">
                        Details <ArrowUpRight size={16} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CandleCard;