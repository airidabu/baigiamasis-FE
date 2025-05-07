import Review from "../types/Review.ts";

export type ReviewState = {
    reviews: Review[];
    error: string | null;
}

export type ReviewAction =
    | { type: "GET_REVIEWS", payload: Review[] }
    | { type: "ADD_REVIEW", payload: Review }
    | { type: "REMOVE_REVIEW", payload: string }

export const initialState: ReviewState = {
    reviews: [],
    error: null,
}

export const reviewReducer = (state: ReviewState, action: ReviewAction) => {
    switch (action.type) {
        case "GET_REVIEWS":
            return { ...state, reviews: action.payload };
        case "ADD_REVIEW":
            return { ...state, reviews: [...state.reviews, action.payload] };
        case "REMOVE_REVIEW":
            return { ...state, reviews: state.reviews.filter(review => review._id !== action.payload) };
        default:
            return state;
    }
}