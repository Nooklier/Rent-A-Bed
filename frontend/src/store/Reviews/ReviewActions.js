import { GET_REVIEWS } from "./ReviewTypes";

export const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
})