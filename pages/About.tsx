import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Hand, Leaf, Lightbulb, Users, Star } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="bg-cream">
            <section className="py-32 md:py-48">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center mb-24"
                    >
                        <span className="text-rose font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Our Heritage</span>
                        <h1 className="font-serif text-5xl md:text-8xl font-black text-charcoal tracking-tighter leading-tight">The Alchemist's <br/><span className="italic font-normal text-rose">Journey.</span></h1>
                    </motion.div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-24 mb-40">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="flex-1 relative"
                        >
                            <div className="absolute -inset-10 bg-rose/10 rounded-[4rem] blur-[100px] -z-10 animate-pulse" />
                            <img 
                                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=1000&fit=crop" 
                                alt="Artisan at work" 
                                className="rounded-[4rem] shadow-2xl w-full h-[600px] object-cover border border-white/40 transform -rotate-2 hover:rotate-0 transition-transform duration-1000" 
                            />
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            viewport={{ once: true }}
                            className="flex-1 space-y-10"
                        >
                            <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-charcoal text-white shadow-xl">
                                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Established 2014</span>
                            </div>
                            
                            <h2 className="font-serif text-4xl md:text-5xl font-black text-charcoal leading-tight tracking-tight">Crafted with intentionality, <br/>poured for <span className="text-rose italic font-medium">stillness.</span></h2>
                            
                            <p className="text-lg text-muted-brown leading-relaxed font-light opacity-80">
                                Every candle we create is a testament to our commitment to quality and craftsmanship. Using only the finest natural waxes, premium fragrance oils, and hand-poured techniques passed down through generations, we ensure each candle meets our exacting standards.
                            </p>
                            
                            <p className="text-lg text-muted-brown leading-relaxed font-light opacity-80">
                                Our journey began in a small studio with a simple mission: to bring warmth and elegance into every home. Today, we're proud to serve thousands of customers who trust us to illuminate their most precious moments.
                            </p>
                        </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40">
                        {[
                            { icon: Award, title: "Premium Sourcing", desc: "We use only the finest natural soy wax, global botanical oils, and organic cotton wicks." },
                            { icon: Heart, title: "Mindful Community", desc: "Loved by thousands of seekers who value the intersection of scent and soul." },
                            { icon: Hand, title: "Artisan Standard", desc: "Each vessel is hand-poured in micro-batches to ensure an uncompromised scent throw." }
                        ].map((item, i) => (
                            <motion.div 
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 1 }}
                                viewport={{ once: true }}
                                className="p-12 bg-white rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-700 group border border-rose/5"
                            >
                                <item.icon className="text-rose mb-8 w-12 h-12 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                <h3 className="font-serif text-2xl font-black text-charcoal mb-6 tracking-tight">{item.title}</h3>
                                <p className="text-stone-500 font-light leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-[4rem] p-20 text-center shadow-xl shadow-charcoal/5 border border-rose/5"
                    >
                        <h2 className="font-serif text-4xl font-black text-charcoal mb-16 tracking-tight">Our Core Values</h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                            {[
                                { icon: Leaf, title: "Sustainability", sub: "Eco-conscious vessels" },
                                { icon: Star, title: "Excellence", sub: "Uncompromised purity" },
                                { icon: Users, title: "Community", sub: "Artisan empowerment" },
                                { icon: Lightbulb, title: "Discovery", sub: "Constant olfactive study" }
                            ].map((val) => (
                                <div key={val.title} className="flex flex-col items-center group">
                                    <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mb-6 shadow-sm border border-rose/5 group-hover:bg-charcoal group-hover:text-white transition-all duration-700">
                                        <val.icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>
                                    <h4 className="font-black text-charcoal text-[10px] uppercase tracking-[0.2em] mb-2">{val.title}</h4>
                                    <p className="text-stone-400 text-[9px] uppercase tracking-[0.1em] font-bold">{val.sub}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;