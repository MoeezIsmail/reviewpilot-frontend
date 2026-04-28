const calculateStats = (reviews) => {
    const total = reviews.length;
    if (!total) return {
        totalReviews: 0,
        averageRating: 0,
        positiveReviews: 0,
        negativeReviews: 0,
        averageReviews: 0,
    };

    const ratingMap = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

    let positive = 0, negative = 0, average = 0, ratingSum = 0;

    reviews.forEach((r) => {
        const numericRating = ratingMap[r.starRating] || r.rating || 0;
        ratingSum += numericRating;
        if (numericRating >= 4) positive++;
        else if (numericRating === 3) average++;
        else negative++;
    });

    return {
        totalReviews: total,
        averageRating: (ratingSum / total).toFixed(1),
        positiveReviews: positive,
        negativeReviews: negative,
        averageReviews: average,
    };
};

export default calculateStats;