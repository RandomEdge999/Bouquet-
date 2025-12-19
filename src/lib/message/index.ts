import { getPrng } from '../seed';

const SENTIMENT_BANKS = {
    opener: [
        "My dearest,",
        "To my love,",
        "Beautiful soul,",
        "My sunshine,",
        "Hey gorgeous,",
        "My everything,",
        "My sweet love,",
        "To my favorite person,",
        "Hello my love,",
        "My darling,",
        "To the one who holds my heart,",
        "My beautiful girl,",
        "Hey love of my life,",
        "My rock, my heart,",
        "To my forever,",
        "Dearest love,",
        "My joy,",
        "Hey beautiful,",
        "To my one and only,",
        "My heart,",
    ],
    admiration: [
        "you make every moment magical.",
        "your smile brightens my entire world.",
        "I fall for you more every single day.",
        "you are the most beautiful person I know.",
        "being with you feels like a dream.",
        "you inspire me to be better.",
        "your kindness radiates in everything you do.",
        "I am constantly in awe of your strength.",
        "you have such a beautiful heart.",
        "your laugh is my favorite sound.",
        "simple moments with you are my favorite memories.",
        "you make life feel so vibrant and full.",
        "your beauty takes my breath away, inside and out.",
        "I admire everything about you.",
        "you are a masterpiece of a person.",
        "your presence makes everything better.",
        "just seeing you makes my day.",
        "you are pure magic.",
        "no one compares to you.",
        "you are my dream come true.",
    ],
    gratitude: [
        "Thank you for being my person.",
        "I'm so grateful you're in my life.",
        "Every day with you is a gift.",
        "You make my heart so full.",
        "Life is beautiful because of you.",
        "I appreciate you more than words can say.",
        "Thank you for loving me the way you do.",
        "I'm the luckiest person to have you.",
        "You've given me so much clarity and joy.",
        "Thank you for being my adventure partner.",
        "I cherish every second we spend together.",
        "You are the best thing that ever happened to me.",
        "Thank you for just being you.",
        "I'm so thankful for your love.",
        "You enrich my life in every way.",
        "Grateful for your love and your patience.",
        "Thank you for being my home.",
        "My life is infinitely better with you in it.",
    ],
    love: [
        "I love you endlessly.",
        "You have my whole heart.",
        "Forever isn't long enough with you.",
        "You're my favorite hello and hardest goodbye.",
        "My heart beats for you.",
        "I love you more than yesterday.",
        "You are my forever and always.",
        "Loving you is the best part of my life.",
        "My love for you grows stronger every day.",
        "You are the love of my life.",
        "I am so deeply in love with you.",
        "You mean the world to me.",
        "I adore you, completely.",
        "You are my soulmate.",
        "I love you to the moon and back.",
        "My heart belongs to you, always.",
        "You are my greatest love.",
        "I love you with everything I have.",
        "Only you, forever.",
    ],
    closing: [
        "Can't wait to see you.",
        "Thinking of you always.",
        "Sending you all my love.",
        "You are my world.",
        "Counting down the moments until I see you.",
        "Yours effectively,",
        "With all my heart,",
    ]
};

const SUBJECT_LINES = [
    "Fresh flowers for my love 💐",
    "A little beauty for a beautiful person",
    "Thinking of you today ✨",
    "Something to make you smile",
    "Just because I love you 🌸",
    "A bouquet just for you 🌹",
    "My daily reminder of my love",
    "To brighten your day ☀️",
    "For my favorite person ❤️",
    "Sending you a little magic ✨",
    "You are on my mind 💭",
    "Flowers for my flower 🌺",
    "Because you deserve beautiful things",
    "Hey beautiful, this is for you",
    "My heart sent this to you",
    "A little surprise for you 🎁",
    "Thinking of you right now",
    "Just a little love note 💌",
    "For the most beautiful girl",
    "Your daily dose of love",
];

export const generateMessage = (seed: string) => {
    const prng = getPrng(seed + 'msg2'); // Updated seed salt for freshness

    const pick = (arr: string[]) => arr[Math.floor(prng() * arr.length)];
    const coinFlip = () => prng() > 0.5;

    // Pick components
    const opener = pick(SENTIMENT_BANKS.opener);
    const admiration = pick(SENTIMENT_BANKS.admiration);
    const gratitude = pick(SENTIMENT_BANKS.gratitude);
    const love = pick(SENTIMENT_BANKS.love);

    // Randomize Structure
    // 0: Opener + Admiration + Love
    // 1: Opener + Gratitude + Love
    // 2: Opener + Admiration + Gratitude + Love
    // 3: Opener + Love + Gratitude

    const structureType = Math.floor(prng() * 4);
    let body = "";

    if (structureType === 0) {
        body = `${capitalize(admiration)} ${love}`;
    } else if (structureType === 1) {
        body = `${gratitude} ${love}`;
    } else if (structureType === 2) {
        body = `${capitalize(admiration)} ${gratitude} ${love}`;
    } else {
        body = `${love} ${gratitude}`;
    }

    // Sometimes add a closing thought if it's short
    if (body.length < 100 && coinFlip()) {
        // Maybe add another sentence logic later, for now keeping it simple but varied
    }

    const text = `${opener}\n\n${body}`;

    const subject = pick(SUBJECT_LINES);

    return {
        subject,
        text,
        signature: "Your Aleem"
    };
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
