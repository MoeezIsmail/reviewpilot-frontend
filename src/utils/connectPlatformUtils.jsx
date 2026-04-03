const PLATFORMS = [
    {
        id: "google",
        name: "Google Business Profile",
        description: "Fetch & reply to Google reviews",
        icon: "https://www.google.com/favicon.ico",
        available: true,
    },
    {
        id: "yelp",
        name: "Yelp",
        description: "Fetch & reply to Yelp reviews",
        icon: "https://www.yelp.com/favicon.ico",
        available: false,
    },
    {
        id: "trustpilot",
        name: "Trustpilot",
        description: "Fetch & reply to Trustpilot reviews",
        icon: "https://www.trustpilot.com/favicon.ico",
        available: false,
    },
    {
        id: "bbb",
        name: "Better Business Bureau",
        description: "Manage your BBB reviews",
        icon: null,
        initials: "BBB",
        color: "#003f7f",
        available: false,
    },
    {
        id: "angi",
        name: "Angi",
        description: "Fetch & reply to Angi reviews",
        icon: null,
        initials: "AG",
        color: "#FF6153",
        available: false,
    },
];

export default PLATFORMS