const calculateStats = (reviews) => {
    const total = reviews.length;
    let positive = 0;
    let negative = 0;
    let ratingSum = 0;

    const ratingMap = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
    };

    reviews.forEach((r) => {
        const numericRating = ratingMap[r.starRating] || 0;

        ratingSum += numericRating;

        if (numericRating >= 4) positive++;
        else negative++;
    });

    return {
        totalReviews: total,
        averageRating: total ? (ratingSum / total).toFixed(1) : 0,
        positiveReviews: positive,
        negativeReviews: negative,
    };
};

export default calculateStats;