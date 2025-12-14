import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Hand, Leaf, Lightbulb, Users, Star } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="bg-white">
            <section className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-pink mb-4">Our Story</h1>
                        <p className="text-dark-brown text-lg font-medium">Crafting moments of warmth and elegance since 2014</p>
                    </motion.div>
                    
                    <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <img src="https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&h=700&fit=crop" alt="Candle Making" className="rounded-2xl shadow-2xl w-full h-96 lg:h-full object-cover border-4 border-pink transform hover:rotate-2 transition duration-500" />
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex-1"
                        >
                            <div className="inline-block bg-pink px-4 py-2 rounded-full mb-6 shadow-md">
                                <span className="text-white font-medium text-sm">10+ Years of Excellence</span>
                            </div>
                            
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-pink mb-6">Crafted with Passion, Approved by You</h2>
                            
                            <p className="text-dark-brown text-lg mb-6 font-medium">
                                Every candle we create is a testament to our commitment to quality and craftsmanship. Using only the finest natural waxes, premium fragrance oils, and hand-poured techniques passed down through generations, we ensure each candle meets our exacting standards.
                            </p>
                            
                            <p className="text-dark-brown text-lg font-medium">
                                Our journey began in a small studio with a simple mission: to bring warmth and elegance into every home. Today, we're proud to serve thousands of customers who trust us to illuminate their most precious moments.
                            </p>
                        </motion.div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {[
                            { icon: Award, title: "Premium Quality", desc: "We use only the finest natural soy wax, premium fragrance oils, and cotton wicks." },
                            { icon: Heart, title: "Customer Approved", desc: "Loved by thousands of customers worldwide, our candles have earned a reputation for excellence." },
                            { icon: Hand, title: "Handcrafted Love", desc: "Each candle is carefully hand-poured with attention to detail, ensuring every piece is a work of art." }
                        ].map((item, i) => (
                            <motion.div 
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                whileHover={{ y: -10 }}
                                className="text-center p-8 bg-soft-pink rounded-2xl border border-pink/20 shadow-sm hover:shadow-lg transition-all"
                            >
                                <item.icon className="text-pink mx-auto mb-4 w-12 h-12" strokeWidth={1.5} />
                                <h3 className="font-serif text-2xl font-bold text-dark-brown mb-3">{item.title}</h3>
                                <p className="text-dark-brown font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="bg-cream rounded-2xl p-12 text-center border border-pink/30 shadow-inner">
                        <h2 className="font-serif text-3xl font-bold text-pink mb-8">Our Values</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: Leaf, title: "Sustainability", sub: "Eco-friendly materials" },
                                { icon: Star, title: "Excellence", sub: "Uncompromising quality" },
                                { icon: Users, title: "Community", sub: "Supporting local artisans" },
                                { icon: Lightbulb, title: "Innovation", sub: "Creating new scents" }
                            ].map((val) => (
                                <motion.div 
                                    key={val.title}
                                    whileHover={{ scale: 1.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-3 shadow-md border border-pink/20">
                                        <val.icon className="text-pink w-8 h-8" />
                                    </div>
                                    <h4 className="font-bold text-dark-brown mb-1">{val.title}</h4>
                                    <p className="text-dark-brown text-sm font-medium">{val.sub}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;