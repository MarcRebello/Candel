// Interface defining the structure of a Candle object
// This ensures we always know what properties a candle has throughout the app
export interface Candle {
    id: string;          // Unique identifier for the candle
    name: string;        // The display name of the candle
    collection: string;  // Which category it belongs to (e.g., "Signature")
    description: string; // A short text describing the scent/mood
    image: string;       // URL to the product image
    rating: number;      // Average star rating (1-5)
    reviewCount: number; // Total number of reviews received
}

// Interface defining the structure of a Review object
export interface Review {
    id: string;             // Unique identifier for the review
    name: string;           // Name of the person who wrote the review
    date: string;           // Formatted date string (e.g., "March 15, 2024")
    rating: number;         // The star rating given (1-5)
    text: string;           // The actual content of the review
    avatarUrl: string;      // URL to the user's profile picture
    productImageUrl?: string; // (Optional) Image of the product they bought, shown in some views
}

// Interface for Navigation Links used in the header/footer
export interface NavItem {
    label: string; // Text to display (e.g., "Home")
    path: string;  // URL path to navigate to (e.g., "/")
}