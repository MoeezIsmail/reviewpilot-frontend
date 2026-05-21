const RATING_MAP = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

// ─── NLP Sentiment Word Lists ─────────────────────────────────────────────────

const POSITIVE_WORDS = new Set([
    // Quality
    'amazing', 'awesome', 'excellent', 'exceptional', 'extraordinary', 'fabulous',
    'fantastic', 'flawless', 'gorgeous', 'great', 'impressive', 'incredible',
    'magnificent', 'marvelous', 'outstanding', 'perfect', 'phenomenal', 'remarkable',
    'spectacular', 'stellar', 'stunning', 'superb', 'superior', 'terrific',
    'top', 'wonderful',
    // Attitude / Experience
    'beautiful', 'best', 'brilliant', 'clean', 'comfortable', 'convenient',
    'delicious', 'delightful', 'efficient', 'enjoyable', 'friendly', 'fresh',
    'generous', 'genuine', 'gracious', 'happy', 'helpful', 'honest',
    'kind', 'knowledgeable', 'lovely', 'neat', 'nice', 'pleasant',
    'polite', 'professional', 'prompt', 'quality', 'quick', 'reliable',
    'responsive', 'safe', 'skilled', 'smooth', 'speedy', 'talented',
    'thorough', 'tidy', 'timely', 'trustworthy', 'warm', 'welcoming',
    // Positive verbs / sentiments
    'enjoy', 'enjoyed', 'enjoying', 'love', 'loved', 'loving',
    'recommend', 'recommended', 'exceeded', 'impressed', 'satisfied',
    'pleased', 'appreciated', 'appreciate', 'adore', 'adored',
    'cherish', 'praise', 'praised', 'worth', 'worthwhile',
]);

const NEGATIVE_WORDS = new Set([
    // Strong negatives
    'abysmal', 'appalling', 'atrocious', 'awful', 'deplorable', 'despicable',
    'dreadful', 'ghastly', 'horrible', 'horrific', 'lousy', 'miserable',
    'nasty', 'pathetic', 'repulsive', 'revolting', 'shameful', 'shocking',
    'terrible', 'vile', 'wretched',
    // Common negatives
    'bad', 'boring', 'broken', 'careless', 'cheap', 'cold', 'damaged',
    'defective', 'delayed', 'dirty', 'disgusting', 'disrespectful',
    'disappointing', 'disappointed', 'filthy', 'frustrating', 'horrible',
    'incompetent', 'incorrect', 'inferior', 'lazy', 'mediocre', 'messy',
    'misleading', 'negligent', 'noisy', 'offensive', 'outdated', 'overcharged',
    'overpriced', 'poor', 'rough', 'rude', 'slow', 'smelly', 'stressful',
    'ugly', 'unacceptable', 'uncomfortable', 'unhelpful', 'unprofessional',
    'unreliable', 'useless', 'wrong',
    // Negative verbs / sentiments
    'avoid', 'cheat', 'cheated', 'complain', 'complained', 'dislike',
    'fail', 'failed', 'failure', 'hate', 'hated', 'ignore', 'ignored',
    'lied', 'mislead', 'regret', 'ruined', 'scam', 'steal', 'stole',
    'waste', 'wasted', 'worst',
    // Issue words
    'problem', 'problems', 'issue', 'issues', 'fault', 'mistake', 'error',
    'complaint', 'complaints', 'garbage', 'trash', 'ripoff', 'fraud',
]);

// Negation words that flip the meaning of the next sentiment word
const NEGATION_WORDS = new Set([
    'not', "n't", 'never', 'no', 'without', 'hardly', 'barely',
    'neither', 'nobody', 'nothing', 'nor', 'nowhere', "wasn't",
    "isn't", "doesn't", "didn't", "won't", "wouldn't", "couldn't",
    "shouldn't", "haven't", "hadn't",
]);

/**
 * Analyzes the actual text of a review to determine sentiment.
 * Returns 'positive', 'negative', 'neutral', or null (if no text or no signal).
 */
function analyzeTextSentiment(text) {
    if (!text || text.trim().length < 3) return null;

    const tokens = text.toLowerCase().match(/\b[\w']+\b/g) || [];
    let score = 0;
    let negationActive = false;
    let negationTtl = 0;          // negation applies to next N words

    for (const token of tokens) {
        if (NEGATION_WORDS.has(token)) {
            negationActive = true;
            negationTtl = 3;      // "not very good" — covers up to 3 words ahead
            continue;
        }

        const isPos = POSITIVE_WORDS.has(token);
        const isNeg = NEGATIVE_WORDS.has(token);

        if (isPos || isNeg) {
            let signal = isPos ? 1 : -1;
            if (negationActive) signal *= -1;  // flip when negated
            score += signal;
            negationActive = false;
            negationTtl = 0;
        } else if (negationActive) {
            // Non-sentiment word — count down the negation TTL
            negationTtl--;
            if (negationTtl <= 0) {
                negationActive = false;
                negationTtl = 0;
            }
        }
    }

    if (score > 0) return 'positive';
    if (score < 0) return 'negative';
    return null;  // neutral — let star rating decide
}

// ─── Analytics Utilities ──────────────────────────────────────────────────────

// Group reviews by month for trend chart
export const groupReviewsByMonth = (reviews) => {
    const groups = {};
    reviews.forEach((r) => {
        if (!r.createTime) return;
        const date = new Date(r.createTime);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        const label = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        if (!groups[key]) groups[key] = { key, label, count: 0, ratingSum: 0 };
        groups[key].count++;
        groups[key].ratingSum += RATING_MAP[r.starRating] || 0;
    });

    return Object.values(groups)
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((g) => ({
            ...g,
            avgRating: g.count ? (g.ratingSum / g.count).toFixed(1) : 0,
        }));
};

// Rating distribution (purely star-based, no change needed)
export const getRatingDistribution = (reviews) => {
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
        const rating = RATING_MAP[r.starRating] || 0;
        if (rating >= 1 && rating <= 5) dist[rating]++;
    });
    const total = reviews.length || 1;
    return Object.entries(dist).map(([star, count]) => ({
        star: Number(star),
        count,
        percentage: Math.round((count / total) * 100),
    }));
};

// Response rate
export const getResponseRate = (reviews, replyStatus) => {
    const total = reviews.length;
    if (!total) return 0;
    const replied = reviews.filter((r) => {
        const id = r.reviewId || r.name;
        return r.reviewReply?.comment || replyStatus[id] === 'posted';
    }).length;
    return Math.round((replied / total) * 100);
};

/**
 * Sentiment breakdown using actual review TEXT analysis (NLP).
 * Falls back to star rating only when a review has no text.
 *
 * Classification:
 *   - Text analysis provides the primary signal
 *   - If text score is 0 (no clear signal) or text is empty → use star rating
 *   - Star rating fallback: ≥4 = positive, 3 = neutral, ≤2 = negative
 */
export const getSentimentBreakdown = (reviews) => {
    let positive = 0, neutral = 0, negative = 0;
    let textAnalyzed = 0, ratingFallback = 0;

    reviews.forEach((r) => {
        const text = r.comment || r.snippet || '';
        const ratingNum = RATING_MAP[r.starRating] || 0;

        const textResult = analyzeTextSentiment(text);

        if (textResult === 'positive') { positive++; textAnalyzed++; }
        else if (textResult === 'negative') { negative++; textAnalyzed++; }
        else {
            // No clear text signal — use star rating
            ratingFallback++;
            if (ratingNum >= 4) positive++;
            else if (ratingNum === 3) neutral++;
            else if (ratingNum >= 1) negative++;
            else neutral++;   // no rating either → neutral
        }
    });

    return { positive, neutral, negative, textAnalyzed, ratingFallback };
};
