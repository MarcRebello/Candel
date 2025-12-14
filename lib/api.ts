// Import the function to connect to Supabase (our cloud database)
import { createClient } from '@supabase/supabase-js';
// Import types to ensure our data matches our application structure
import { Candle, Review } from '../types';
// Import mock data to use if the cloud database isn't set up
import { MOCK_CANDLES, MOCK_REVIEWS } from '../constants';

// --- CONFIGURATION ---
// PASTE YOUR SUPABASE KEYS HERE
const SUPABASE_CONFIG = {
    // 1. Go to https://supabase.com/dashboard/project/_/settings/api
    // 2. Copy "Project URL" and paste it between the quotes below
    url: 'https://yxyigyphikqaxkwpcrpe.supabase.co', 
    // 3. Go to Settings (Gear Icon) -> API -> Project API Keys -> "anon" "public"
    // 4. Copy that long key and paste it here:
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4eWlneXBoaWtxYXhrd3BjcnBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2OTM2NTAsImV4cCI6MjA4MTI2OTY1MH0.AAy5UtrpvRGS-asd5RQPzbKGWmgixdjCLmk6g9_o1hY'  
};

// --- INITIALIZATION ---
// Create a variable to hold the database connection
let supabase: any = null;

// Check if the user has actually provided keys.
// If both URL and KEY are present strings, we enable cloud mode.
const isCloudEnabled = SUPABASE_CONFIG.url.length > 0 && SUPABASE_CONFIG.key.length > 0;

// If cloud is enabled, initialize the connection
if (isCloudEnabled) {
    try {
        supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
        console.log("🔌 Connected to Supabase Cloud Database");
    } catch (e) {
        console.error("Failed to initialize Supabase:", e);
    }
} else {
    console.log("📦 Using Local Storage (Offline Mode)");
}

// Define keys for LocalStorage. This is where data is saved on your computer if cloud is off.
const DB_KEYS = { CANDLES: 'db_candles_v1', REVIEWS: 'db_reviews_v1' };

// A helper function to pause execution for a set time (ms).
// We use this to simulate network loading times so the user sees spinners.
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// --- API OBJECT ---
// This object contains all the functions the app uses to get/save data.
export const api = {
    // Function to fetch the list of candles
    async getCandles(): Promise<Candle[]> {
        // 1. Try to get data from the Cloud (Supabase)
        if (isCloudEnabled && supabase) {
            const { data, error } = await supabase.from('candles').select('*');
            
            // FIX: Ensure we actually got data back. If table is empty or missing, fallback to mocks.
            if (!error && data && data.length > 0) {
                return data;
            }
            console.warn("Supabase returned empty data or error, falling back to mocks.", error);
        }
        
        // 2. Fallback to LocalStorage (Offline Mode) or Mocks
        await delay(300);
        
        // Check browser storage for saved candles
        const stored = localStorage.getItem(DB_KEYS.CANDLES);
        
        // If nothing is found in storage...
        if (!stored) {
            // Save the default list (MOCK_CANDLES) to storage so it exists next time
            localStorage.setItem(DB_KEYS.CANDLES, JSON.stringify(MOCK_CANDLES));
            // Return the default list
            return MOCK_CANDLES;
        }
        
        // If data was found, parse the JSON string back into an array
        return JSON.parse(stored);
    },

    // Function to add a new candle (Used in Admin page)
    // Omit 'id', 'rating', 'reviewCount' because we generate those automatically
    async addCandle(data: Omit<Candle, 'id' | 'rating' | 'reviewCount'>): Promise<Candle> {
        // Create the new candle object
        const newCandle = {
            ...data, // Copy the form data (name, image, etc.)
            id: Math.random().toString(36).substr(2, 9), // Generate a random ID
            rating: 5, // Default start rating
            reviewCount: 0 // Start with 0 reviews
        };

        // 1. Try to save to Cloud
        if (isCloudEnabled && supabase) {
            // Insert the new row and return the created record
            const { data: cloudData, error } = await supabase.from('candles').insert([newCandle]).select();
            if (!error && cloudData) return cloudData[0];
            console.error("Supabase Error adding candle:", error);
        }

        // 2. Fallback to LocalStorage
        await delay(500); // Simulate network wait
        
        // Fetch current list so we can append to it
        const candles = await this.getCandles();
        
        // Only update local storage if cloud is NOT enabled (to avoid desync)
        if (!isCloudEnabled) {
             const updated = [newCandle, ...candles]; // Add new candle to start of list
             localStorage.setItem(DB_KEYS.CANDLES, JSON.stringify(updated)); // Save back to storage
        }
        return newCandle;
    },

    // Function to fetch reviews
    async getReviews(): Promise<Review[]> {
        if (isCloudEnabled && supabase) {
            // Get reviews and sort them by date (newest first)
            const { data, error } = await supabase.from('reviews').select('*').order('date', { ascending: false });
            
            // FIX: Fallback if empty
            if (!error && data && data.length > 0) return data;
            console.warn("Supabase empty/error for reviews, using mocks.");
        }

        // Fallback Logic
        await delay(300);
        const stored = localStorage.getItem(DB_KEYS.REVIEWS);
        if (!stored) {
            localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(MOCK_REVIEWS));
            return MOCK_REVIEWS;
        }
        return JSON.parse(stored);
    },

    // Function to add a review (Used in Reviews page)
    async addReview(data: Omit<Review, 'id' | 'date'>): Promise<Review> {
        // Create new review object
        const newReview = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            // Format today's date nicely (e.g. "October 5, 2024")
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        };

        if (isCloudEnabled && supabase) {
            const { data: cloudData, error } = await supabase.from('reviews').insert([newReview]).select();
             if (!error && cloudData) return cloudData[0];
             console.error("Supabase Error adding review:", error);
        }

        // Fallback Logic
        await delay(500);
        const reviews = await this.getReviews();
        if (!isCloudEnabled) {
            const updated = [newReview, ...reviews];
            localStorage.setItem(DB_KEYS.REVIEWS, JSON.stringify(updated));
        }
        return newReview;
    }
};