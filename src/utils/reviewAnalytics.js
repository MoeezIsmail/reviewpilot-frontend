const calculateStats = (reviews) => {
    const total = reviews.length;
    let positive = 0;
    let negative = 0;
    let ratingSum = 0;

    reviews.forEach((r) => {
        console.log('rating: ', r.starRating);
        ratingSum += r.starRating;

        if (r.starRating >= 4) positive++;
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