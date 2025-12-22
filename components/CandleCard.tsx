import React from 'react';
import { Star, ShoppingBag, Plus } from 'lucide-react';
import * as FramerMotion from 'framer-motion';
const { motion } = FramerMotion as any;
import { Candle } from '../types';

interface CandleCardProps {
    candle: Candle;
}

const CandleCard: React.FC<CandleCardProps> = ({ candle }) => {
    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="group relative flex flex-col h-full bg-transparent overflow-hidden"
        >
            {/* Image Wrap */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone-100">
                <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    src={candle.image} 
                    alt={candle.name} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Visual Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Floating Meta */}
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] text-charcoal shadow-sm">
                        {candle.collection.split(' ')[0]}
                    </span>
                </div>

                {/* Elegant Action Button */}
                <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#000' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-charcoal text-white rounded-2xl flex items-center justify-center gap-3 shadow-2xl text-xs font-black uppercase tracking-widest"
                    >
                        <ShoppingBag size={16} strokeWidth={2} />
                        Quick Add
                    </motion.button>
                </div>
            </div>

            {/* Info */}
            <div className="pt-8 pb-4 flex flex-col flex-grow px-2">
                <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-serif text-2xl font-black text-charcoal tracking-tight">
                        {candle.name}
                    </h3>
                    <span className="text-lg font-serif italic text-rose font-medium">$38.00</span>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} className={`${i < Math.floor(candle.rating) ? 'text-rose fill-rose' : 'text-stone-300'}`} />
                        ))}
                    </div>
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">({candle.reviewCount} Reviews)</span>
                </div>

                <p className="text-stone-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    {candle.description}
                </p>

                <div className="mt-auto">
                    <button className="flex items-center gap-2 text-charcoal font-black text-[10px] uppercase tracking-[0.2em] border-b border-charcoal/10 pb-1 hover:border-rose hover:text-rose transition-all">
                        View Details <Plus size={14} />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CandleCard;