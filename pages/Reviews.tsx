// Import React hooks for state and side-effects
import React, { useState, useEffect } from 'react';

// Fix: Cast framer-motion to any to bypass prop validation type errors
import * as FramerMotion from 'framer-motion';
const { motion } = FramerMotion as any;

// Import icons
import { Star, User, Loader } from 'lucide-react';
// Import our API helper
import { api } from '../lib/api';
// Import the Review type
import { Review } from '../types';

const Reviews: React.FC = () => {
    // State to store the list of reviews
    const [reviews, setReviews] = useState<Review[]>([]);
    // State to track if data is loading
    const [loading, setLoading] = useState(true);
    // State for the "Write Review" form inputs
    const [formState, setForm] = useState({ name: '', text: '', rating: 5 });
    // State to disable button while submitting
    const [isSubmitting, setIsSubmitting] = useState(false);
    // State to show success message
    const [success, setSuccess] = useState(false);

    // useEffect runs once when component mounts (opens)
    useEffect(() => {
        // Fetch reviews from API
        api.getReviews().then(data => {
            setReviews(data); // Save data to state
            setLoading(false); // Turn off loading spinner
        });
    }, []);

    // Function to handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page refresh
        setIsSubmitting(true); // Start loading state
        
        // Send data to API
        const newReview = await api.addReview({
            name: formState.name,
            text: formState.text,
            rating: formState.rating,
            // Generate a colorful avatar image based on their name using ui-avatars.com
            // encodeURIComponent ensures special characters don't break the URL
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(formState.name)}&background=E91E63&color=fff`
        });

        // Add the new review to the top of the list
        setReviews([newReview, ...reviews]);
        
        // Reset states
        setIsSubmitting(false);
        setSuccess(true);
        setForm({ name: '', text: '', rating: 5 }); // Clear form
        
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    // Show loading spinner if data is fetching
    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader className="animate-spin text-pink" size={40} /></div>;

    return (
        <section className="py-16 md:py-24 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl font-bold text-pink mb-4">Community Love</h1>
                    <p className="text-dark-brown text-lg font-medium">Join our growing family of candle lovers</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Review Form Container - Slides in from left */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3 order-2 lg:order-1"
                    >
                        {/* Sticky keeps the form visible while scrolling reviews */}
                        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-pink/20 sticky top-24">
                            <h2 className="font-serif text-2xl font-bold text-pink mb-6">Write a Review</h2>
                            
                            {/* Conditional Rendering: Success Message OR Form */}
                            {success ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center">
                                    <p className="font-bold text-lg">Thank You!</p>
                                    <p>Your review has been posted.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name Input */}
                                    <div>
                                        <label className="block text-dark-brown font-bold mb-2 text-sm uppercase tracking-wide">Name</label>
                                        <input 
                                            type="text" required 
                                            value={formState.name}
                                            // Update specific field in state object
                                            onChange={e => setForm({...formState, name: e.target.value})}
                                            className="w-full px-4 py-3 bg-cream border-2 border-pink/10 rounded-xl focus:outline-none focus:border-pink/50 focus:bg-white transition-colors"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    
                                    {/* Rating Star Selection */}
                                    <div>
                                        <label className="block text-dark-brown font-bold mb-2 text-sm uppercase tracking-wide">Rating</label>
                                        <div className="flex gap-2 text-3xl">
                                            {/* Map 1 to 5 to create interactive stars */}
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star} type="button"
                                                    // Set rating on click
                                                    onClick={() => setForm({...formState, rating: star})}
                                                    // Dynamic styling: Pink if selected, Gray if not
                                                    className={`${star <= formState.rating ? 'text-pink scale-110' : 'text-gray-300'} transition-all duration-200 hover:scale-125`}
                                                >
                                                    <Star fill={star <= formState.rating ? "currentColor" : "none"} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Text Area */}
                                    <div>
                                        <label className="block text-dark-brown font-bold mb-2 text-sm uppercase tracking-wide">Review</label>
                                        <textarea 
                                            rows={4} required 
                                            value={formState.text}
                                            onChange={e => setForm({...formState, text: e.target.value})}
                                            className="w-full px-4 py-3 bg-cream border-2 border-pink/10 rounded-xl focus:outline-none focus:border-pink/50 focus:bg-white transition-colors resize-none"
                                            placeholder="Tell us what you think..."
                                        />
                                    </div>
                                    
                                    {/* Submit Button */}
                                    <button 
                                        type="submit" disabled={isSubmitting}
                                        className="w-full bg-pink text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition shadow-lg disabled:opacity-50 flex justify-center"
                                    >
                                        {isSubmitting ? <Loader className="animate-spin" /> : "Post Review"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    {/* Reviews List Column */}
                    <div className="lg:w-2/3 order-1 lg:order-2 space-y-6">
                        {/* Map through reviews array to create cards */}
                        {reviews.map((review) => (
                            <motion.div 
                                key={review.id}
                                layout // Animates layout changes when new items are added
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/80 backdrop-blur rounded-2xl p-8 shadow-sm border border-pink/10 flex gap-6"
                            >
                                {/* User Avatar */}
                                <div className="flex-shrink-0 hidden sm:block">
                                    <img src={review.avatarUrl} alt={review.name} className="w-14 h-14 rounded-full border-2 border-pink/20" />
                                </div>
                                {/* Review Content */}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-dark-brown text-lg">{review.name}</h3>
                                        {/* Read-only Star Display */}
                                        <div className="flex text-pink">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-4">{review.date}</p>
                                    <p className="text-dark-brown leading-relaxed italic">"{review.text}"</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;