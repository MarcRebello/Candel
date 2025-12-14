// Import React hooks
import React, { useState, useEffect } from 'react';
// Import hook for programmatic navigation (redirecting)
import { useNavigate } from 'react-router-dom';
// Import motion for animations
import { motion } from 'framer-motion';
// Import API helper
import { api } from '../lib/api';
// Import icon
import { Loader } from 'lucide-react';

const Admin: React.FC = () => {
    // Initialize navigation hook
    const navigate = useNavigate();
    // Auth state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Password input state
    const [password, setPassword] = useState('');
    // Loading state for submission
    const [loading, setLoading] = useState(false);
    
    // State for the "Add Product" form
    const [formData, setFormData] = useState({
        name: '',
        collection: '',
        description: '',
        image: ''
    });
    // Success feedback state
    const [success, setSuccess] = useState(false);

    // Check if user was previously logged in when component loads
    useEffect(() => {
        // localStorage stores strings, so we check for the string "true"
        if (localStorage.getItem('admin_session') === 'true') setIsLoggedIn(true);
    }, []);

    // Handle Login Logic
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Hardcoded password for simplicity (In a real app, use a backend!)
        if (password === 'admin') {
            setIsLoggedIn(true);
            // Persist login so refresh doesn't log them out
            localStorage.setItem('admin_session', 'true');
        } else {
            alert('Wrong password');
        }
    };

    // Handle Logout Logic
    const handleLogout = () => {
        setIsLoggedIn(false);
        // Clear session storage
        localStorage.removeItem('admin_session');
        // Redirect to home page
        navigate('/');
    };

    // Handle "Add Candle" Form Submission
    const handleAddCandle = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        // Call API to add candle
        await api.addCandle(formData);
        
        setLoading(false);
        setSuccess(true);
        // Reset form
        setFormData({ name: '', collection: '', description: '', image: '' });
        // Hide success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    // If not logged in, show the Login Form
    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl border border-pink w-96">
                    <h2 className="text-2xl font-serif font-bold text-pink mb-4 text-center">Admin Access</h2>
                    <input 
                        type="password" placeholder="Enter password (admin)" 
                        className="w-full px-4 py-3 border border-pink/30 rounded-lg mb-4 focus:outline-none focus:border-pink"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-pink text-white py-3 rounded-lg font-bold">Login</button>
                </form>
            </div>
        );
    }

    // If logged in, show the Dashboard
    return (
        <section className="py-16 min-h-screen">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with Logout */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-serif text-4xl font-bold text-pink">Dashboard</h1>
                    <button onClick={handleLogout} className="bg-dark-brown text-white px-4 py-2 rounded-lg hover:bg-black transition">Logout</button>
                </div>

                {/* Dashboard Card */}
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-2xl shadow-xl p-8 border border-pink/20">
                    <h2 className="text-2xl font-serif font-bold text-dark-brown mb-6">Add New Product</h2>
                    <form onSubmit={handleAddCandle}>
                        {/* Two Column Layout for Name and Collection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-dark-brown font-bold mb-2 text-sm">Product Name</label>
                                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-cream border border-pink/20 rounded-lg focus:outline-none focus:border-pink" />
                            </div>
                            <div>
                                <label className="block text-dark-brown font-bold mb-2 text-sm">Collection</label>
                                <select required value={formData.collection} onChange={(e) => setFormData({...formData, collection: e.target.value})} className="w-full px-4 py-3 bg-cream border border-pink/20 rounded-lg focus:outline-none focus:border-pink">
                                    <option value="">Select Collection</option>
                                    <option>Signature Collection</option>
                                    <option>Relaxation Collection</option>
                                    <option>Energizing Collection</option>
                                    <option>Seasonal Collection</option>
                                    <option>Floral Collection</option>
                                </select>
                            </div>
                        </div>
                        {/* Description Field */}
                        <div className="mb-6">
                            <label className="block text-dark-brown font-bold mb-2 text-sm">Description</label>
                            <textarea rows={3} required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-3 bg-cream border border-pink/20 rounded-lg focus:outline-none focus:border-pink"></textarea>
                        </div>
                        {/* Image URL Field */}
                        <div className="mb-6">
                            <label className="block text-dark-brown font-bold mb-2 text-sm">Image URL</label>
                            <input type="text" placeholder="https://..." value={formData.image} onChange={(e) => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-3 bg-cream border border-pink/20 rounded-lg focus:outline-none focus:border-pink" />
                        </div>
                        
                        {/* Submit Button */}
                        <button type="submit" disabled={loading} className="w-full bg-pink text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition shadow-lg flex justify-center items-center gap-2">
                            {loading && <Loader className="animate-spin" size={20} />}
                            {loading ? 'Processing...' : 'Add Product to Database'}
                        </button>

                        {/* Success Message */}
                        {success && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-medium">✨ Product added successfully! It is now live on the site.</div>}
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Admin;