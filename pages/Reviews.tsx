import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Loader } from 'lucide-react';
import { api } from '../lib/api';
import { Review } from '../types';

const Reviews: React.FC = () => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [formState, setForm] = useState({ name: '', text: '', rating: 5 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        api.getReviews().then(data => {
            setReviews(data);
            setLoading(false);
        });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const newReview = await api.addReview({
            name: formState.name,
            text: formState.text,
            rating: formState.rating,
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(formState.name)}&background=D4A3A3&color=fff`
        });

        setReviews([newReview, ...reviews]);
        setIsSubmitting(false);
        setSuccess(true);
        setForm({ name: '', text: '', rating: 5 });
        
        setTimeout(() => setSuccess(false), 3000);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-cream"><Loader className="animate-spin text-rose" size={40} /></div>;

    return (
        <section className="py-32 md:py-40 min-h-screen bg-cream">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
                <div className="text-center mb-24">
                    <span className="text-rose font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Appreciation</span>
                    <h1 className="font-serif text-5xl md:text-7xl font-black text-charcoal tracking-tighter leading-tight mb-6">Community Stories</h1>
                    <p className="text-muted-brown text-lg font-light max-w-xl mx-auto opacity-70">The warmth of our candles, shared through your experiences.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3 order-2 lg:order-1"
                    >
                        <div className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.04)] p-12 border border-rose/10 sticky top-32">
                            <h2 className="font-serif text-3xl font-black text-charcoal mb-10 tracking-tight">Write a Review</h2>
                            
                            {success ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-rose/5 text-rose p-8 rounded-2xl border border-rose/10 text-center">
                                    <p className="font-black text-sm uppercase tracking-widest mb-2">Thank You</p>
                                    <p className="text-sm opacity-80">Your story has been added to our collection.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div>
                                        <label className="block text-charcoal font-black mb-3 text-[10px] uppercase tracking-widest opacity-40">Your Name</label>
                                        <input 
                                            type="text" required 
                                            value={formState.name}
                                            onChange={e => setForm({...formState, name: e.target.value})}
                                            className="w-full px-0 py-4 bg-transparent border-b border-charcoal/10 focus:outline-none focus:border-rose transition-colors placeholder:text-stone-300 font-medium"
                                            placeholder="Jane Doe"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-charcoal font-black mb-3 text-[10px] uppercase tracking-widest opacity-40">Rating</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star} type="button"
                                                    onClick={() => setForm({...formState, rating: star})}
                                                    className={`${star <= formState.rating ? 'text-rose scale-110' : 'text-stone-200'} transition-all duration-300 hover:scale-125`}
                                                >
                                                    <Star size={24} fill={star <= formState.rating ? "currentColor" : "none"} strokeWidth={1.5} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-charcoal font-black mb-3 text-[10px] uppercase tracking-widest opacity-40">Message</label>
                                        <textarea 
                                            rows={4} required 
                                            value={formState.text}
                                            onChange={e => setForm({...formState, text: e.target.value})}
                                            className="w-full px-0 py-4 bg-transparent border-b border-charcoal/10 focus:outline-none focus:border-rose transition-colors resize-none placeholder:text-stone-300 font-medium"
                                            placeholder="How did our scents make you feel?"
                                        />
                                    </div>
                                    
                                    <motion.button 
                                        type="submit" disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-charcoal text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl flex justify-center border border-white/10"
                                    >
                                        {isSubmitting ? <Loader className="animate-spin" size={16} /> : "Post Review"}
                                    </motion.button>
                                </form>
                            )}
                        </div>
                    </motion.div>

                    <div className="lg:w-2/3 order-1 lg:order-2 space-y-12">
                        <AnimatePresence>
                            {reviews.map((review) => (
                                <motion.div 
                                    key={review.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-[2.5rem] p-12 shadow-sm border border-rose/5 flex flex-col md:flex-row gap-8 group hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-700"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-rose/10 shadow-lg">
                                            <img src={review.avatarUrl} alt={review.name} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-baseline mb-4">
                                            <h3 className="font-serif text-2xl font-black text-charcoal tracking-tight">{review.name}</h3>
                                            <div className="flex text-rose gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} size={12} fill={i < review.rating ? "currentColor" : "none"} strokeWidth={1} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-300 mb-6">{review.date}</p>
                                        <p className="text-muted-brown text-lg font-light leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">"{review.text}"</p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;