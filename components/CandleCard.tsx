import React from 'react';
import { Star, ShoppingBag, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Candle } from '../types';

interface CandleCardProps {
    candle: Candle;
}

const CandleCard: React.FC<CandleCardProps> = ({ candle }) => {
    return (
        <motion.div 
            whileHover={{ y: -12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col h-full bg-transparent overflow-hidden"
        >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-sm transition-shadow group-hover:shadow-2xl group-hover:shadow-charcoal/10">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    src={candle.image} 
                    alt={candle.name} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] text-charcoal shadow-sm border border-black/5">
                        {candle.collection.split(' ')[0]}
                    </span>
                </div>

                <div className="absolute inset-x-6 bottom-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.button
                        whileHover={{ scale: 1.02, backgroundColor: '#000' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 bg-charcoal text-white rounded-2xl flex items-center justify-center gap-3 shadow-2xl text-[10px] font-black uppercase tracking-widest border border-white/10"
                    >
                        <ShoppingBag size={14} strokeWidth={2} />
                        Quick Add
                    </motion.button>
                </div>
            </div>

            <div className="pt-8 pb-4 flex flex-col flex-grow px-2">
                <div className="flex justify-between items-baseline mb-2">
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
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">({candle.reviewCount})</span>
                </div>

                <p className="text-stone-500 text-sm font-medium leading-relaxed line-clamp-2 mb-6 opacity-70 group-hover:opacity-100 transition-opacity">
                    {candle.description}
                </p>

                <div className="mt-auto">
                    <button className="flex items-center gap-2 text-charcoal font-black text-[10px] uppercase tracking-[0.25em] border-b border-charcoal/10 pb-1 hover:border-rose hover:text-rose transition-all group/link">
                        Discover More <Plus size={12} className="group-hover/link:rotate-90 transition-transform duration-500" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default CandleCard;