import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ArrowRight, Sparkles, Wind, Droplets, Sun, Flame } from 'lucide-react';
import { api } from '../lib/api';
import { Candle, Review } from '../types';
import CandleCard from '../components/CandleCard';

const Home: React.FC = () => {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    
    const heroImgY = useTransform(scrollYProgress, [0, 0.4], [0, 150]);
    const heroImgRotate = useTransform(scrollYProgress, [0, 0.4], [0, 8]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.15]);
    const textFilter = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(12px)"]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [c, r] = await Promise.all([api.getCandles(), api.getReviews()]);
                setCandles(c.slice(0, 3));
                setReviews(r.slice(0, 3));
            } catch (error) {
                console.error("Failed to load home data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-10"
                >
                    <div className="relative w-24 h-24">
                        <div className="absolute inset-0 rounded-full border-2 border-rose/10 animate-pulse" />
                        <div className="absolute inset-0 rounded-full border-t-2 border-rose animate-spin" style={{ animationDuration: '2.5s' }} />
                        <Flame size={40} className="absolute inset-0 m-auto text-rose animate-flicker" fill="currentColor" />
                    </div>
                    <span className="font-serif italic text-rose text-3xl tracking-[0.3em] font-light">Pouring...</span>
                </motion.div>
            </div>
        );
    }

    const titleLetters = "Sanctuary.".split("");

    return (
        <div className="w-full">
            <section className="relative min-h-[105vh] flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full pt-32">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                        <motion.div 
                            style={{ opacity: textOpacity, filter: textFilter }}
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:col-span-7 relative"
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8 }}
                                className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-charcoal text-white mb-10 shadow-2xl border border-white/5"
                            >
                                <Sparkles size={16} className="text-gold animate-pulse" />
                                <span className="text-[10px] font-black tracking-[0.4em] uppercase">Autumn Release 2024</span>
                            </motion.div>
                            
                            <h1 className="font-serif text-[clamp(4rem,10vw,8rem)] font-black text-charcoal mb-8 leading-[0.8] tracking-tighter">
                                Crafted <br/>
                                <span className="italic font-normal text-rose relative inline-flex items-center">
                                    {titleLetters.map((l, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 30, rotateX: -90 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            transition={{ delay: 0.8 + (i * 0.05), duration: 0.8, ease: "easeOut" }}
                                        >
                                            {l}
                                        </motion.span>
                                    ))}
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 1.5, duration: 1.2, ease: "circOut" }}
                                        className="absolute -bottom-2 left-0 right-0 h-2 bg-gold/10 origin-left blur-[0.5px]"
                                    />
                                </span>
                            </h1>
                            
                            <p className="text-lg md:text-2xl text-muted-brown mb-16 max-w-xl leading-relaxed font-light opacity-90">
                                Boutique artisan candles hand-poured in the mountains. We blend botanical purity with modern design for a sensory experience that anchors your soul.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-8 items-center">
                                <Link to="/collections">
                                    <motion.button 
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative group bg-charcoal text-white px-12 py-7 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] overflow-hidden shadow-2xl border border-white/10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                        <span className="relative flex items-center gap-4">
                                            Shop Collection 
                                            <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                                        </span>
                                    </motion.button>
                                </Link>
                                <Link to="/about" className="group">
                                    <span className="text-charcoal font-black text-[11px] uppercase tracking-[0.3em] pb-2 border-b border-charcoal/10 group-hover:border-rose group-hover:text-rose transition-all duration-400">
                                        The Process
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                            className="lg:col-span-5 relative hidden lg:block"
                        >
                            <motion.div 
                                style={{ y: heroImgY, rotate: heroImgRotate, scale: heroScale }}
                                className="relative z-10"
                            >
                                <div className="absolute -inset-10 bg-rose/10 rounded-[6rem] blur-[120px] -z-10 animate-pulse" />
                                <img 
                                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1000&h=1400&fit=crop" 
                                    alt="Luxury Hand Poured Candle" 
                                    className="rounded-[4.5rem] shadow-[0_80px_160px_-40px_rgba(26,26,26,0.5)] w-full object-cover aspect-[3/4] border border-white/40"
                                />
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 1, type: "spring" }}
                                className="absolute -right-16 top-1/4 bg-white/95 backdrop-blur-2xl p-10 rounded-[3.5rem] shadow-2xl border border-rose/10 z-20 max-w-[240px]"
                            >
                                <Flame size={32} className="text-rose mb-5 animate-flicker" fill="currentColor" />
                                <h4 className="font-serif text-2xl italic font-black text-charcoal leading-tight mb-3">"Mesmerizing scent throw."</h4>
                                <div className="flex gap-1 mb-4 text-gold">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <p className="text-[9px] text-stone-400 font-black uppercase tracking-[0.4em]">Aesthetica Mag</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-rose/5 to-transparent pointer-events-none" />
            </section>

            <section className="py-40 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid md:grid-cols-3 gap-20 lg:gap-32">
                        {[
                            { icon: Wind, title: "Pure Diffusion", text: "Proprietary coconut-soy blend engineered for 100% clean, long-lasting scent throw." },
                            { icon: Droplets, title: "Botanical Oils", text: "Globally sourced, phthalate-free fragrance oils selected for holistic wellness." },
                            { icon: Sun, title: "Small Batch", text: "Hand-numbered vessels poured in micro-batches of only twelve for peak quality." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group"
                            >
                                <div className="w-24 h-24 bg-cream rounded-[2.5rem] flex items-center justify-center mb-10 group-hover:bg-charcoal group-hover:text-white transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-3">
                                    <item.icon size={36} strokeWidth={1} />
                                </div>
                                <h3 className="font-serif text-3xl font-black mb-6 tracking-tight">{item.title}</h3>
                                <p className="text-muted-brown text-lg leading-relaxed font-light opacity-70 group-hover:opacity-100 transition-opacity duration-500">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-40 relative overflow-hidden bg-[#F9F7F5]">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12"
                    >
                        <div className="max-w-2xl">
                            <span className="text-gold font-black tracking-[0.5em] text-[10px] uppercase mb-8 block">Collection Highlight</span>
                            <h2 className="font-serif text-[clamp(3rem,7vw,6.5rem)] font-black text-charcoal leading-[0.9] tracking-tighter">
                                The Signature <br/>
                                <span className="italic font-normal text-rose">Drop.</span>
                            </h2>
                        </div>
                        <Link to="/collections">
                            <motion.button 
                                whileHover={{ scale: 1.05, x: 8 }}
                                className="group flex items-center gap-6 text-charcoal font-black text-[11px] uppercase tracking-[0.4em] pb-4 border-b-2 border-charcoal/5 hover:border-rose transition-all duration-500"
                            >
                                Discover All 
                                <ArrowRight className="group-hover:translate-x-3 transition-transform duration-500" />
                            </motion.button>
                        </Link>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24">
                        {candles.map((candle, i) => (
                            <motion.div 
                                key={candle.id}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <CandleCard candle={candle} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-60 bg-charcoal relative overflow-hidden group">
                <motion.div 
                    style={{ scale: useTransform(scrollYProgress, [0.6, 0.9], [1, 1.25]) }}
                    className="absolute inset-0 opacity-20 pointer-events-none"
                >
                    <img src="https://images.unsplash.com/photo-1572295629910-4829373eb431?w=1600&fit=crop" className="w-full h-full object-cover grayscale" alt="" />
                </motion.div>
                <div className="max-w-6xl mx-auto px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                    >
                        <Flame size={60} className="text-rose mx-auto mb-16 opacity-40 animate-flicker" fill="currentColor" />
                        <h2 className="font-serif text-4xl md:text-7xl text-white italic font-light leading-[1.15] mb-16 tracking-tight">
                            "Lighting a candle is the <br/>
                            simplest form of <span className="text-rose font-bold not-italic">rebellion</span> <br/>
                            against the darkness."
                        </h2>
                        <div className="w-32 h-[1px] bg-gold/30 mx-auto mb-10" />
                        <p className="text-gold font-black uppercase tracking-[0.6em] text-[9px]">The Alchemy Manual</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-40 bg-cream">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-rose font-black tracking-[0.4em] text-[10px] uppercase mb-10 block">Community</span>
                            <h2 className="font-serif text-[clamp(3.5rem,8vw,7.5rem)] font-black text-charcoal mb-12 tracking-tighter leading-[0.85]">
                                Hand-poured <br/><span className="italic font-normal text-rose">Connections.</span>
                            </h2>
                            <p className="text-xl text-muted-brown font-light leading-relaxed max-w-lg opacity-80 mb-16">
                                Join over 50,000 mindful homeowners who have anchored their spaces with our artisan scents.
                            </p>
                            <Link to="/reviews">
                                <motion.button 
                                    whileHover={{ backgroundColor: '#1A1A1A', color: '#FFF', scale: 1.02 }}
                                    className="border border-charcoal/20 text-charcoal px-12 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all duration-500 shadow-lg"
                                >
                                    View Our Reviews
                                </motion.button>
                            </Link>
                        </motion.div>
                        
                        <div className="space-y-12">
                            {reviews.map((review, i) => (
                                <motion.div 
                                    key={review.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-12 rounded-[3.5rem] shadow-xl shadow-charcoal/5 border border-rose/5 group hover:-translate-y-3 transition-transform duration-700"
                                >
                                    <div className="flex gap-1 text-gold mb-8">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                    </div>
                                    <p className="text-charcoal text-2xl font-serif italic mb-10 leading-[1.4] font-medium tracking-tight">"{review.text}"</p>
                                    <div className="flex items-center gap-6 pt-6 border-t border-stone-50">
                                        <div className="w-14 h-14 rounded-full overflow-hidden shadow-lg ring-4 ring-rose/5">
                                            <img src={review.avatarUrl} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="block text-sm font-black uppercase tracking-[0.15em] text-charcoal">{review.name}</span>
                                            <span className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.3em]">Verified Customer</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;