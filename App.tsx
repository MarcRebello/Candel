import React from 'react';

// Fix: Cast react-router-dom to any to bypass type errors
import * as ReactRouterDOM from 'react-router-dom';
const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

import Layout from './components/Layout';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Wrapper for scrolling to top on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return null;
}

const App: React.FC = () => {
    return (
        <HashRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="collections" element={<Collections />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="secret" element={<Admin />} />
                </Route>
            </Routes>
        </HashRouter>
    );
};

export default App;