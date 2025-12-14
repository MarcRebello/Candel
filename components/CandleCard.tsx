// Import React
import React from 'react';
// Import icons
import { Star, ShoppingBag } from 'lucide-react';
// Import motion from framer-motion for animations
import { motion } from 'framer-motion';
// Import the Candle type definition
import { Candle } from '../types';

interface CandleCardProps {
    candle: Candle;
}

const CandleCard: React.FC<CandleCardProps> = ({ candle }) => {
    return (
        <motion.div 
            whileHover={{ y: -15, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group bg-white rounded-[2rem] shadow-lg hover:shadow-2xl hover:shadow-pink/30 transition-all duration-300 h-full flex flex-col overflow-hidden border border-gray-100"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden aspect-[4/5]">
                <motion.img 
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    src={candle.image} 
                    alt={candle.name} 
                    className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Collection Badge */}
                <div className="absolute top-4 left-4">
                     <span className="text-[10px] font-bold text-dark-brown bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                        {candle.collection}
                    </span>
                </div>

                {/* Quick Action Button (Visible on Hover) */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-6 right-6 w-12 h-12 bg-white text-pink rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0"
                >
                    <ShoppingBag size={20} />
                </motion.button>
            </div>
            
            {/* Content Container */}
            <div className="p-8 flex flex-col flex-grow relative bg-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl font-bold text-dark-brown group-hover:text-pink transition-colors">{candle.name}</h3>
                    <div className="flex items-center gap-1 bg-cream px-2 py-1 rounded-lg">
                        <Star size={12} className="text-pink fill-pink" />
                        <span className="text-xs font-bold text-dark-brown">{candle.rating}</span>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">{candle.description}</p>
                
                <button 
                    className="w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider border-2 border-pink/10 text-pink hover:bg-pink hover:text-white transition-all duration-300"
                >
                    View Details
                </button>
            </div>
        </motion.div>
    );
};

export default CandleCard;