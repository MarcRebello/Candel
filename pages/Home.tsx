import React, { useEffect, useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
const { Link } = ReactRouterDOM as any;
import * as FramerMotion from 'framer-motion';
const { motion, useScroll, useTransform } = FramerMotion as any;
import { Star, ArrowRight, Sparkles, Wind, Droplets, Sun, Flame } from 'lucide-react';
import { api } from '../lib/api';
import { Candle, Review } from '../types';
import CandleCard from '../components/CandleCard';

const Home: React.FC = () => {
    const [candles, setCandles] = useState<Candle[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    
    // Advanced Parallax Values
    const heroImgY = useTransform(scrollYProgress, [0, 0.4], [0, 200]);
    const heroImgRotate = useTransform(scrollYProgress, [0, 0.4], [0, 5]);
    const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
    // Fix: Map directly to string values for filter property
    const textFilter = useTransform(scrollYProgress, [0, 0.2], ["blur(0px)", "blur(10px)"]);
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
                        <div className="absolute inset-0 rounded-full border-t-2 border-rose animate-spin" style={{ animationDuration: '3s' }} />
                        <Flame size={40} className="absolute inset-0 m-auto text-rose animate-flicker" fill="currentColor" />
                    </div>
                    <span className="font-serif italic text-rose text-3xl tracking-[0.3em] font-light">Poured...</span>
                </motion.div>
            </div>
        );
    }

    const titleLetters = "Sanctuary.".split("");

    return (
        <div className="w-full">
            {/* Cinematic Hero Section */}
            <section className="relative min-h-[110vh] flex items-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full pt-32">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                        <motion.div 
                            style={{ opacity: textOpacity, filter: textFilter }}
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1] }}
                            className="lg:col-span-7 relative"
                        >
                            <motion.div 
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="inline-flex items-center gap-4 px-8 py-3 rounded-full bg-charcoal text-white mb-14 shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/5"
                            >
                                <Sparkles size={18} className="text-gold animate-pulse" />
                                <span className="text-[11px] font-black tracking-[0.5em] uppercase">Autumn Release 2024</span>
                            </motion.div>
                            
                            <h1 className="font-serif text-[clamp(4.5rem,11vw,9rem)] font-black text-charcoal mb-12 leading-[0.8] tracking-tighter">
                                Crafted <br/>
                                <span className="italic font-normal text-rose relative inline-flex items-center">
                                    {titleLetters.map((l, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, y: 40, rotateX: -90 }}
                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                            transition={{ delay: 1 + (i * 0.08), duration: 0.8 }}
                                        >
                                            {l}
                                        </motion.span>
                                    ))}
                                    <motion.div 
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 2, duration: 1.2, ease: "circOut" }}
                                        className="absolute -bottom-4 left-0 right-0 h-3 bg-gold/20 origin-left blur-[1px]"
                                    />
                                </span>
                            </h1>
                            
                            <p className="text-xl md:text-3xl text-muted-brown mb-20 max-w-2xl leading-relaxed font-light opacity-80">
                                Boutique artisan candles hand-poured in the mountains. We blend botanical purity with modern design for a sensory experience that lingers.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-10 items-center">
                                <Link to="/collections">
                                    <motion.button 
                                        whileHover={{ scale: 1.08, y: -8 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="relative group bg-charcoal text-white px-16 py-8 rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer" />
                                        <span className="relative flex items-center gap-5">
                                            Shop Collection 
                                            <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform duration-700" />
                                        </span>
                                    </motion.button>
                                </Link>
                                <Link to="/about" className="group">
                                    <span className="text-charcoal font-black text-xs uppercase tracking-[0.4em] pb-3 border-b-2 border-charcoal/10 group-hover:border-rose group-hover:text-rose transition-all duration-500">
                                        The Process
                                    </span>
                                </Link>
                            </div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.85, rotateY: 20 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            transition={{ duration: 2.2, ease: [0.19, 1, 0.22, 1] }}
                            className="lg:col-span-5 relative hidden lg:block perspective-1000"
                        >
                            <motion.div 
                                style={{ y: heroImgY, rotate: heroImgRotate, scale: heroScale }}
                                className="relative z-10"
                            >
                                <div className="absolute -inset-10 bg-rose/10 rounded-[6rem] blur-[100px] -z-10 animate-pulse" />
                                <img 
                                    src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1000&h=1400&fit=crop" 
                                    alt="Luxury Hand Poured Candle" 
                                    className="rounded-[5rem] shadow-[0_100px_200px_-50px_rgba(26,26,26,0.6)] w-full object-cover aspect-[3/4] grayscale-[5%] brightness-90 border-[1.5px] border-white/30"
                                />
                            </motion.div>

                            {/* Award Floating Badge */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5, x: 100 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
                                className="absolute -right-20 top-1/3 bg-white/95 backdrop-blur-3xl p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-rose/10 z-20 max-w-[280px]"
                            >
                                <Flame size={40} className="text-rose mb-6 animate-flicker" fill="currentColor" />
                                <h4 className="font-serif text-3xl italic font-black text-charcoal leading-tight mb-4">"Absolutely mesmerizing."</h4>
                                <div className="flex gap-1 mb-4 text-gold">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-[10px] text-muted-brown font-black uppercase tracking-[0.5em]">Aesthetica Mag</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* Atmospheric Backgrounds */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-rose/5 to-transparent pointer-events-none" />
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-gold/10 rounded-full blur-[150px] pointer-events-none" />
            </section>

            {/* Sensorial Experience Grid */}
            <section className="py-52 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="grid md:grid-cols-3 gap-32">
                        {[
                            { icon: Wind, title: "Pure Diffusion", text: "Proprietary coconut-soy blend engineered for 100% clean scent throw." },
                            { icon: Droplets, title: "Botanical Oils", text: "Globally sourced, phthalate-free fragrance oils for holistic wellness." },
                            { icon: Sun, title: "Small Batch", text: "Hand-numbered vessels poured in micro-batches of only twelve." }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2, duration: 1.2 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group"
                            >
                                <div className="w-28 h-28 bg-cream rounded-[3rem] flex items-center justify-center mb-12 group-hover:bg-charcoal group-hover:text-white transition-all duration-700 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] group-hover:-translate-y-4">
                                    <item.icon size={44} strokeWidth={1} />
                                </div>
                                <h3 className="font-serif text-4xl font-black mb-8 tracking-tighter">{item.title}</h3>
                                <p className="text-muted-brown text-xl leading-relaxed font-light opacity-60 group-hover:opacity-100 transition-opacity duration-500">{item.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* The Signature Drop */}
            <section className="py-52 relative overflow-hidden bg-[#F9F7F5]">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row justify-between items-end mb-40 gap-16"
                    >
                        <div className="max-w-3xl">
                            <span className="text-gold font-black tracking-[0.6em] text-[11px] uppercase mb-10 block">Autumn Edit</span>
                            <h2 className="font-serif text-[clamp(3.5rem,8vw,7.5rem)] font-black text-charcoal leading-[0.85] tracking-tighter">
                                Elevated <br/>
                                <span className="italic font-normal text-rose">Olfactory.</span>
                            </h2>
                        </div>
                        <Link to="/collections">
                            <motion.button 
                                whileHover={{ scale: 1.05, x: 10 }}
                                className="group flex items-center gap-8 text-charcoal font-black text-xs uppercase tracking-[0.5em] pb-6 border-b-4 border-charcoal/5 hover:border-rose transition-all duration-700"
                            >
                                Full Discovery 
                                <ArrowRight className="group-hover:translate-x-5 transition-transform duration-700" />
                            </motion.button>
                        </Link>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 lg:gap-32">
                        {candles.map((candle, i) => (
                            <motion.div 
                                key={candle.id}
                                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.15, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                <CandleCard candle={candle} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cinematic Parallax Quote */}
            <section className="py-80 bg-charcoal relative overflow-hidden group">
                <motion.div 
                    style={{ scale: useTransform(scrollYProgress, [0.6, 0.9], [1, 1.2]) }}
                    className="absolute inset-0 opacity-20 transition-transform duration-1000"
                >
                    <img src="https://images.unsplash.com/photo-1572295629910-4829373eb431?w=1600&fit=crop" className="w-full h-full object-cover grayscale" alt="" />
                </motion.div>
                <div className="max-w-6xl mx-auto px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.8 }}
                        viewport={{ once: true }}
                    >
                        <Flame size={80} className="text-rose mx-auto mb-20 opacity-30 animate-flicker" fill="currentColor" />
                        <h2 className="font-serif text-5xl md:text-8xl text-white italic font-light leading-[1.1] mb-20 tracking-tight">
                            "Lighting a candle is the <br/>
                            simplest form of <span className="text-rose font-bold not-italic">rebellion</span> <br/>
                            against the darkness."
                        </h2>
                        <div className="w-40 h-[2px] bg-gold/30 mx-auto mb-12" />
                        <p className="text-gold font-black uppercase tracking-[0.8em] text-[10px]">The Alchemy Manual</p>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials with High Depth */}
            <section className="py-60 bg-cream">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid lg:grid-cols-2 gap-40 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -80 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.4, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            <span className="text-rose font-black tracking-[0.5em] text-[11px] uppercase mb-12 block">The Experience</span>
                            <h2 className="font-serif text-[clamp(4rem,9vw,8.5rem)] font-black text-charcoal mb-16 tracking-tighter leading-[0.85]">
                                Trusted by <br/><span className="italic font-normal text-rose">50k+ Souls.</span>
                            </h2>
                            <p className="text-2xl text-muted-brown font-light leading-relaxed max-w-lg opacity-70 mb-20">
                                Discover why top interior designers and mindful homeowners choose our scents to anchor their spaces.
                            </p>
                            <Link to="/reviews">
                                <motion.button 
                                    whileHover={{ backgroundColor: '#1A1A1A', color: '#FFF', scale: 1.05 }}
                                    className="border-2 border-charcoal/20 text-charcoal px-20 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] transition-all duration-700 shadow-xl"
                                >
                                    Read Global Reviews
                                </motion.button>
                            </Link>
                        </motion.div>
                        
                        <div className="space-y-16 relative">
                            {reviews.map((review, i) => (
                                <motion.div 
                                    key={review.id}
                                    initial={{ opacity: 0, scale: 0.9, x: 80 }}
                                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                                    transition={{ delay: i * 0.15, duration: 1.2 }}
                                    viewport={{ once: true }}
                                    className="bg-white p-16 rounded-[4.5rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.08)] border border-rose/10 group hover:-translate-y-5 transition-transform duration-1000 relative"
                                >
                                    <div className="flex gap-1.5 text-gold mb-10">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                                    </div>
                                    <p className="text-charcoal text-3xl font-serif italic mb-12 leading-[1.4] font-medium opacity-90 tracking-tight">"{review.text}"</p>
                                    <div className="flex items-center gap-8 pt-8 border-t border-rose/10">
                                        <div className="w-16 h-16 rounded-full overflow-hidden ring-8 ring-rose/5 shadow-2xl">
                                            <img src={review.avatarUrl} alt="" className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-[2s]" />
                                        </div>
                                        <div>
                                            <span className="block text-base font-black uppercase tracking-[0.2em] text-charcoal">{review.name}</span>
                                            <span className="text-xs text-stone-400 font-bold uppercase tracking-[0.4em]">Verified Collector</span>
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