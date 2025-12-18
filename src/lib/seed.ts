import seedrandom from 'seedrandom';

/**
 * Generates a PRNG function from a seed string.
 */
export const getPrng = (seed: string) => {
    return seedrandom(seed);
};

/**
 * Generates a purely numeric seed from a string (hash), if needed.
 * But seedrandom handles strings directly.
 */

/**
 * Returns a seed based on the current date in YYYY-MM-DD format.
 * Useful for "Today's Bouquet".
 */
export const getTodaySeed = (): string => {
    const now = new Date();
    // We want local time for the user, but for the global "daily" bouquet we might want a standard.
    // The requirement says "derived from local date".
    // Let's us ISO string date part.
    return now.toISOString().split('T')[0];
};

/**
 * Generates a random seed string.
 */
export const getRandomSeed = (): string => {
    return Math.random().toString(36).substring(2, 15);
};
