const calculateStats = (reviews) => {
    const total = reviews.length;
    let positive = 0;
    let negative = 0;
    let average = 0;
    let ratingSum = 0;

    const ratingMap = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        FOUR: 4,
        FIVE: 5,
    };

    reviews.forEach((r) => {
        const numericRating = ratingMap[r.starRating];

        ratingSum += numericRating;

        if (numericRating >= 4) positive++;
        else if (numericRating === 3) average++;
        else negative++
    });

    return {
        totalReviews: total,
        averageRating: total ? (ratingSum / total).toFixed(1) : 0,
        positiveReviews: positive,
        negativeReviews: negative,
        averageReviews: average,
    };
};

export default calculateStats;