import { getPrng } from '../seed';

const SENTIMENT_BANKS = {
    opener: [
        "My dearest,",
        "To my love,",
        "Beautiful soul,",
        "My sunshine,",
        "Hey gorgeous,",
        "My everything,",
    ],
    admiration: [
        "you make every moment magical.",
        "your smile brightens my entire world.",
        "I fall for you more every single day.",
        "you are the most beautiful person I know.",
        "being with you feels like a dream.",
        "you inspire me to be better.",
    ],
    gratitude: [
        "Thank you for being my person.",
        "I'm so grateful you're in my life.",
        "Every day with you is a gift.",
        "You make my heart so full.",
        "Life is beautiful because of you.",
    ],
    love: [
        "I love you endlessly.",
        "You have my whole heart.",
        "Forever isn't long enough with you.",
        "You're my favorite hello and hardest goodbye.",
        "My heart beats for you.",
    ],
};

const SUBJECT_LINES = [
    "Fresh flowers for my love 💐",
    "A little beauty for a beautiful person",
    "Thinking of you today ✨",
    "Something to make you smile",
    "Just because I love you 🌸",
];

export const generateMessage = (seed: string) => {
    const prng = getPrng(seed + 'msg');

    const pick = (arr: string[]) => arr[Math.floor(prng() * arr.length)];

    // Build a romantic message
    const opener = pick(SENTIMENT_BANKS.opener);
    const admiration = pick(SENTIMENT_BANKS.admiration);
    const love = pick(SENTIMENT_BANKS.love);

    // Format: "opener\n\nadmiration love"
    const text = `${opener}\n\n${capitalize(admiration)} ${love}`;

    const subject = pick(SUBJECT_LINES);

    return {
        subject,
        text,
        signature: "Your Aleem" // Always personalized
    };
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
