import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const ScrollToTop = () => {
    const { pathname } = useLocation();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Layout />}>
                    <Route index element={
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                            <Home />
                        </motion.div>
                    } />
                    <Route path="collections" element={
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                            <Collections />
                        </motion.div>
                    } />
                    <Route path="reviews" element={
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                            <Reviews />
                        </motion.div>
                    } />
                    <Route path="about" element={
                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
                            <About />
                        </motion.div>
                    } />
                    <Route path="contact" element={
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Contact />
                        </motion.div>
                    } />
                    <Route path="secret" element={<Admin />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <AnimatedRoutes />
        </HashRouter>
    );
};

export default App;