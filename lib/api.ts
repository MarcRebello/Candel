// Import the function to connect to Supabase (our cloud database)
import { createClient } from '@supabase/supabase-js';
// Import types to ensure our data matches our application structure
import { Candle, Review } from '../types';
// Import mock data to use if the cloud database isn't set up
import { MOCK_CANDLES, MOCK_REVIEWS } from '../constants';

// --- CONFIGURATION ---
// This object holds the keys needed to talk to the database.
const SUPABASE_CONFIG = {
    url: '', // The unique URL for your Supabase project
    key: ''  // The public API key (safe to use in browsers for public data)
};

// --- INITIALIZATION ---
// Create a variable to hold the database connection
let supabase: any = null;

// Check if the user has actually provided keys.
// If both URL and KEY are present strings, we enable cloud mode.
const isCloudEnabled = SUPABASE_CONFIG.url && SUPABASE_CONFIG.key;

// If cloud is enabled, initialize the connection
if (isCloudEnabled) {
    supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.key);
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
        if (isCloudEnabled) {
            // 'select(*)' means "get all columns" from the "candles" table
            const { data, error } = await supabase.from('candles').select('*');
            // If successful, return the data immediately
            if (!error && data) return data;
            // If there's an error, log it (and fall through to local storage)
            console.error("Supabase Error:", error);
        }
        
        // 2. Fallback to LocalStorage (Offline Mode)
        // Simulate a small network delay for realism
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
        if (isCloudEnabled) {
            // Insert the new row and return the created record
            const { data: cloudData, error } = await supabase.from('candles').insert([newCandle]).select();
            if (!error && cloudData) return cloudData[0];
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
        if (isCloudEnabled) {
            // Get reviews and sort them by date (newest first)
            const { data, error } = await supabase.from('reviews').select('*').order('date', { ascending: false });
            if (!error && data) return data;
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

        if (isCloudEnabled) {
            const { data: cloudData, error } = await supabase.from('reviews').insert([newReview]).select();
             if (!error && cloudData) return cloudData[0];
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