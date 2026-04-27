import {getInitials, getReviewerName} from "./reviewUtils.jsx";

export const avatarColors = [
    { bg: "#EEF2FF", text: "#4F46E5" },
    { bg: "#FEF3C7", text: "#92400E" },
    { bg: "#E6F1FB", text: "#185FA5" },
    { bg: "#D1FAE5", text: "#065F46" },
    { bg: "#FCE7F3", text: "#9D174D" },
];

export const getAvatarColor = (name) => {
    if (!name) return avatarColors[0];
    const index = name.charCodeAt(0) % avatarColors.length;
    return avatarColors[index];
};

export const getReviewerProfileImage = (review) => {
   return review.reviewer?.profilePhotoUrl || getInitials(getReviewerName(review))
}