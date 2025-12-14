import { Candle, Review } from "./types";

export const NAVIGATION_LINKS = [
    { label: "Home", path: "/" },
    { label: "Collections", path: "/collections" },
    { label: "Reviews", path: "/reviews" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
];

export const MOCK_CANDLES: Candle[] = [
    {
        id: "1",
        name: "Vanilla Dreams",
        collection: "Signature Collection",
        description: "Warm vanilla bean blended with hints of caramel and cream for a comforting embrace.",
        image: "https://images.unsplash.com/photo-1602874801006-e24946a9a1c2?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 248
    },
    {
        id: "2",
        name: "Lavender Fields",
        collection: "Relaxation Collection",
        description: "Pure lavender essence with subtle chamomile notes to create a peaceful sanctuary.",
        image: "https://images.unsplash.com/photo-1587556930116-0c6e4d6e34c5?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 192
    },
    {
        id: "3",
        name: "Citrus Burst",
        collection: "Energizing Collection",
        description: "Bright blend of orange, lemon, and grapefruit to invigorate your senses.",
        image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 156
    },
    {
        id: "4",
        name: "Autumn Spice",
        collection: "Seasonal Collection",
        description: "Cinnamon, nutmeg, and clove create the perfect cozy autumn atmosphere.",
        image: "https://images.unsplash.com/photo-1570823336316-016f6b2169b1?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 203
    },
    {
        id: "5",
        name: "Rose Garden",
        collection: "Floral Collection",
        description: "Delicate rose petals with jasmine undertones for a romantic ambiance.",
        image: "https://images.unsplash.com/photo-1572295629910-4829373eb431?w=800&h=600&fit=crop",
        rating: 4,
        reviewCount: 178
    },
    {
        id: "6",
        name: "Cedar & Sage",
        collection: "Woodsy Collection",
        description: "Earthy cedar wood and fresh sage bring the outdoors inside.",
        image: "https://images.unsplash.com/photo-1608181114410-db2bb24d346d?w=800&h=600&fit=crop",
        rating: 5,
        reviewCount: 165
    }
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        name: "Sarah Mitchell",
        date: "March 15, 2024",
        rating: 5,
        text: "The Vanilla Dreams candle has transformed my living room into the coziest space. The scent is absolutely divine and lasts for hours!",
        avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        productImageUrl: "https://images.unsplash.com/photo-1602874801006-e24946a9a1c2?w=400&h=200&fit=crop"
    },
    {
        id: "2",
        name: "James Rodriguez",
        date: "March 10, 2024",
        rating: 5,
        text: "I've tried many candles, but nothing compares to the quality and craftsmanship of Trinkets and Beyond. The Lavender Fields is my bedtime essential!",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        id: "3",
        name: "Emily Chen",
        date: "March 8, 2024",
        rating: 5,
        text: "The attention to detail is incredible. Each candle feels like a work of art. The Citrus Burst gives me energy every morning!",
        avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
        productImageUrl: "https://images.unsplash.com/photo-1587556930116-0c6e4d6e34c5?w=400&h=200&fit=crop"
    }
];