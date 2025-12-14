// Import React
import React from 'react';
// Import the Star icon from Lucide icon library
import { Star } from 'lucide-react';
// Import motion from framer-motion for animations
import { motion } from 'framer-motion';
// Import the Candle type definition
import { Candle } from '../types';

// Define the props (inputs) this component accepts
interface CandleCardProps {
    candle: Candle; // It expects a single 'candle' object
}

// Define the component
const CandleCard: React.FC<CandleCardProps> = ({ candle }) => {
    return (
        // motion.div acts like a regular div but allows animations
        <motion.div 
            // When mouse hovers, move up 10 pixels (y: -10)
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            // Styles: white bg, rounded corners, shadow, flexbox layout
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow cursor-pointer border border-pink/20 overflow-hidden flex flex-col h-full"
        >
            {/* Image Container */}
            <div className="relative overflow-hidden h-64">
                {/* Animated Image */}
                <motion.img 
                    // Zoom in slightly (scale 1.1) when hovering
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={candle.image} 
                    alt={candle.name} 
                    className="w-full h-full object-cover" // Ensure image covers area without distorting
                />
                {/* Collection Badge (Top Left) */}
                <div className="absolute top-4 left-4">
                     <span className="text-xs font-bold text-pink bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {candle.collection}
                    </span>
                </div>
            </div>
            
            {/* Content Container */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Candle Name */}
                <h3 className="font-serif text-2xl font-bold text-pink mb-2">{candle.name}</h3>
                {/* Description - flex-grow pushes the button to the bottom */}
                <p className="text-dark-brown mb-4 font-medium flex-grow">{candle.description}</p>
                
                {/* Rating Section */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-pink">
                        {/* Create an array of 5 items to render 5 stars */}
                        {[...Array(5)].map((_, i) => (
                            <Star 
                                key={i} 
                                size={16} 
                                // If index (0-4) is less than rating, fill it.
                                fill={i < candle.rating ? "currentColor" : "none"} 
                                // If star is empty, make it gray
                                className={i < candle.rating ? "" : "text-gray-300"}
                            />
                        ))}
                    </div>
                    {/* Review count text */}
                    <span className="text-dark-brown text-sm font-medium">({candle.reviewCount} reviews)</span>
                </div>
                
                {/* Action Button */}
                <motion.button 
                    // Small grow effect on hover
                    whileHover={{ scale: 1.02 }}
                    // Small shrink effect on click (Tap)
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-pink text-white py-3 rounded-lg font-medium hover:bg-rose-600 transition-colors shadow-md"
                >
                    View Details
                </motion.button>
            </div>
        </motion.div>
    );
};

export default CandleCard;