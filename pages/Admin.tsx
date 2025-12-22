
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Fix: Added AnimatePresence to imports
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../lib/api';
import { Loader, Lock, LayoutDashboard, PlusCircle, LogOut } from 'lucide-react';

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        collection: '',
        description: '',
        image: ''
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('admin_session') === 'true') setIsLoggedIn(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin') {
            setIsLoggedIn(true);
            localStorage.setItem('admin_session', 'true');
        } else {
            alert('Access Denied');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('admin_session');
        navigate('/');
    };

    const handleAddCandle = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await api.addCandle(formData);
        setLoading(false);
        setSuccess(true);
        setFormData({ name: '', collection: '', description: '', image: '' });
        setTimeout(() => setSuccess(false), 3000);
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-cream px-6">
                <motion.form 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onSubmit={handleLogin} 
                    className="bg-white p-16 rounded-[3rem] shadow-2xl border border-rose/10 w-full max-w-md text-center"
                >
                    <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-10 shadow-sm border border-rose/5">
                        <Lock size={32} className="text-rose" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-serif font-black text-charcoal mb-8 tracking-tight">Security Access</h2>
                    <input 
                        type="password" placeholder="Passcode (admin)" 
                        className="w-full px-6 py-4 bg-cream border border-rose/10 rounded-2xl mb-6 focus:outline-none focus:border-rose text-center font-bold tracking-widest placeholder:text-stone-300"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full bg-charcoal text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-black transition-all"
                    >
                        Enter Terminal
                    </motion.button>
                </motion.form>
            </div>
        );
    }

    return (
        <section className="py-32 md:py-48 bg-cream min-h-screen">
            <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div>
                        <span className="text-rose font-black tracking-[0.5em] text-[10px] uppercase mb-4 block">Management</span>
                        <h1 className="font-serif text-5xl md:text-6xl font-black text-charcoal tracking-tighter leading-tight">Workshop <br/>Terminal.</h1>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center gap-3 bg-white text-charcoal px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose/10 hover:bg-rose hover:text-white transition-all duration-500 shadow-sm"
                    >
                        <LogOut size={16} /> Secure Exit
                    </button>
                </div>

                <motion.div 
                    initial={{ y: 30, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-[3.5rem] shadow-2xl p-16 border border-rose/10"
                >
                    <div className="flex items-center gap-4 mb-12">
                        <PlusCircle size={28} className="text-rose" />
                        <h2 className="text-3xl font-serif font-black text-charcoal tracking-tight">Catalog Entry</h2>
                    </div>

                    <form onSubmit={handleAddCandle} className="space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label className="block text-charcoal font-black mb-4 text-[10px] uppercase tracking-[0.2em] opacity-40">Artifact Name</label>
                                <input 
                                    type="text" required 
                                    value={formData.name} 
                                    onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                    className="w-full px-0 py-4 bg-transparent border-b border-stone-100 focus:outline-none focus:border-rose font-medium placeholder:text-stone-200" 
                                    placeholder="Enter scent name..."
                                />
                            </div>
                            <div>
                                <label className="block text-charcoal font-black mb-4 text-[10px] uppercase tracking-[0.2em] opacity-40">Primary Collection</label>
                                <select 
                                    required 
                                    value={formData.collection} 
                                    onChange={(e) => setFormData({...formData, collection: e.target.value})} 
                                    className="w-full px-0 py-4 bg-transparent border-b border-stone-100 focus:outline-none focus:border-rose font-bold text-[10px] uppercase tracking-[0.2em] text-charcoal"
                                >
                                    <option value="">Select Domain</option>
                                    <option>Signature Collection</option>
                                    <option>Relaxation Collection</option>
                                    <option>Energizing Collection</option>
                                    <option>Seasonal Collection</option>
                                    <option>Floral Collection</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-charcoal font-black mb-4 text-[10px] uppercase tracking-[0.2em] opacity-40">Olfactive Description</label>
                            <textarea 
                                rows={3} required 
                                value={formData.description} 
                                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                                className="w-full px-0 py-4 bg-transparent border-b border-stone-100 focus:outline-none focus:border-rose font-medium resize-none placeholder:text-stone-200"
                                placeholder="Describe the aromatic profile..."
                            />
                        </div>

                        <div>
                            <label className="block text-charcoal font-black mb-4 text-[10px] uppercase tracking-[0.2em] opacity-40">Visual URI</label>
                            <input 
                                type="text" placeholder="https://unsplash.com/..." 
                                value={formData.image} 
                                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                                className="w-full px-0 py-4 bg-transparent border-b border-stone-100 focus:outline-none focus:border-rose font-medium placeholder:text-stone-200" 
                            />
                        </div>
                        
                        <div className="pt-8">
                            <motion.button 
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit" 
                                disabled={loading} 
                                className="w-full bg-charcoal text-white py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:bg-black transition-all shadow-2xl flex justify-center items-center gap-4 border border-white/10"
                            >
                                {loading ? <Loader className="animate-spin" size={18} /> : <PlusCircle size={18} />}
                                {loading ? 'Committing...' : 'Commit to Catalog'}
                            </motion.button>
                        </div>

                        <AnimatePresence>
                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-8 p-6 bg-rose/5 text-rose rounded-2xl text-center font-black text-[10px] uppercase tracking-[0.3em] border border-rose/10"
                                >
                                    Artifact successfully committed to database.
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Admin;
