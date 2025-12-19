import { getPrng } from '../seed';
import { DateTime } from 'luxon';

// ------------------------------------------------------------------
// SOPHISTICATED MESSAGE GENERATION ENGINE
// Designed to mimic "LLM-like" thoughtfulness via complex grammar
// and context-aware sentence construction.
// ------------------------------------------------------------------

const OPENERS = [
    "My dearest Venooo,",
    "To my beautiful girl,",
    "My darling,",
    "To the love of my life,",
    "Hey beautiful,",
    "My sweet love,",
    "To my everything,",
    "My precious Venooo,",
    "To my favorite person,",
    "Hello my love,",
];

const INTROS = [
    "I was just sitting here thinking about you and I had to send this.",
    "I wanted to take a moment to tell you how much you mean to me.",
    "There isn't a moment that goes by where you aren't on my mind.",
    "I woke up with you on my heart today.",
    "I just wanted to send you a little reminder of how loved you are.",
    "The world feels a little brighter knowing you're in it.",
    "I found myself smiling just now, simply because I thought of you.",
    "I hope you know how incredibly special you are to me.",
    "Every day with you feels like a beautiful adventure.",
    "I just wanted to pause and appreciate you for a second.",
];

// Context: Morning (5AM - 11AM)
const MORNING_THOUGHTS = [
    "I hope your day starts as beautifully as you make my life.",
    "Good morning, my sunshine. I hope you slept well.",
    "Starting my day thinking of you is the best part of my morning.",
    "I hope you have a wonderful day ahead, full of smiles.",
    "May your coffee be strong and your day be sweet.",
];

// Context: Evening (5PM - 4AM)
const EVENING_THOUGHTS = [
    "I hope you had a lovely day today.",
    "As the day winds down, my thoughts always drift to you.",
    "I hope you can relax and rest well tonight.",
    "Sending you a massive hug to end your day.",
    "Sleep well tonight knowing you are deeply loved.",
];

// Deep Emotional Cores (The "Thoughtful" Part)
const DEEP_THOUGHTS = [
    "You bring so much light into my life, in ways I can't even explain. It's in your laugh, your kindness, and the way you just exist.",
    "I honestly don't know what I did to deserve someone as wonderful as you. You make everything better just by being you.",
    "I love the way you look at the world. You have this beautiful heart that radiates warmth to everyone around you.",
    "Loving you is the easiest thing I've ever done. It feels like coming home.",
    "You inspire me every simple day to be a better person. Your strength and grace amaze me.",
    "I cherish every little moment we share. Even the quiet ones are my favorite because I'm with you.",
    "You are my peace in the chaos, my calm in the storm. Thank you for being my rock.",
    "I fall purely in love with you more every single day. Just when I think I couldn't possibly love you more, you prove me wrong.",
    "You are a masterpiece. Inside and out, you are the most beautiful person I know.",
    "My life is infinitely better with you in it. You are my dream come true.",
    "There is a gentleness to your soul that captures me every time. I am so lucky to be yours.",
    "You are my best friend and my greatest love all wrapped into one perfect human.",
];

const CLOSINGS = [
    "I love you more than words can say.",
    "Forever yours,",
    "With all my love,",
    "Yours always,",
    "Loving you endlessly,",
    "You are my world.",
    "Can't wait to see you.",
    "Thinking of you always,",
    "All my heart,",
    "Love you to the moon and back,",
];

const SIGNATURES = [
    "Your Aleem",
    "Aleem",
    "Your Guy",
    "Love, Aleem",
];

const SUBJECT_LINES = [
    "Thinking of you ✨",
    "For my beautiful Venooo 💐",
    "A little note for you ❤️",
    "Just because I love you",
    "You are on my mind 💭",
    "My daily reminder",
    "To brighten your day ☀️",
    "Something beautiful for you 🌹",
    "Hey beautiful",
    "My heart sent this",
    "A flower for my flower 🌺",
    "You mean everything to me",
];

export const generateMessage = (seed: string) => {
    // 1. Setup PRNG
    const prng = getPrng(seed + 'v3_engine'); // V3 engine salt
    const pick = (arr: string[]) => arr[Math.floor(prng() * arr.length)];
    const chance = (prob: number) => prng() < prob;

    // 2. Determine Time Context (Client-side usage)
    const now = DateTime.now();
    const hour = now.hour;
    const isMorning = hour >= 5 && hour < 12;
    const isEvening = hour >= 17 || hour < 4;

    // 3. Assemble Components
    const opener = pick(OPENERS);

    // Intro Layer
    let intro = pick(INTROS);

    // Context Layer (Injection)
    // If it's a generated seed (e.g. from email script), this usually matches the Send Time (morning)
    // If it's live viewing, it matches user time.
    if (isMorning && chance(0.6)) {
        intro = `${intro} ${pick(MORNING_THOUGHTS)}`;
    } else if (isEvening && chance(0.6)) {
        intro = `${intro} ${pick(EVENING_THOUGHTS)}`;
    }

    // Deep Core Layer (The "Meat")
    // We can chain 1 or 2 deep thoughts for richer text
    let body = pick(DEEP_THOUGHTS);

    if (chance(0.3)) {
        // Add a second deep thought for longer letters
        let secondBody = pick(DEEP_THOUGHTS);
        while (secondBody === body) secondBody = pick(DEEP_THOUGHTS); // Avoid dupes
        body = `${body} ${secondBody}`;
    }

    // Closing
    const closing = pick(CLOSINGS);
    const signature = pick(SIGNATURES);
    const subject = pick(SUBJECT_LINES);

    // 4. Construct Final Text
    // Structure: Opener \n\n Intro \n\n Body \n\n Closing
    const text = `${opener}\n\n${intro}\n\n${body}\n\n${closing}`;

    return {
        subject,
        text,
        signature
    };
};

