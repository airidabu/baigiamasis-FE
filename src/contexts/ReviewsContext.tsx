import {ReviewAction, reviewReducer, ReviewState, initialState} from "../reducers/reviewReducer.ts";
import {getReviews, addReview, deleteReview} from "../api/reviews.ts";
import Review from "../types/Review.ts";
import {createContext, Dispatch, ReactNode, useContext, useReducer} from "react";

type ReviewsContextType = {
    state: ReviewState;
    dispatch: Dispatch<ReviewAction>
    fetchReviews: () => Promise<void>;
    createReview: (review: Omit<Review, "id">) => Promise<void>;
    removeReview: (id: string) => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);

    const fetchReviews = async () => {
        try {
            const reviews = await getReviews();
            dispatch({type: "GET_REVIEWS", payload: reviews});
        } catch (error) {
            console.error(error);
        }
    }

    const removeReview = async (id: string) => {
        try {
            await deleteReview(id);
            dispatch({type: "REMOVE_REVIEW", payload: id});
        } catch (error) {
            console.error(error);
        }
    }

    const createReview = async (review: Omit<Review, "id">) => {
        try {
            const newReview = await addReview(review);
            dispatch({type: "ADD_REVIEW", payload: newReview})
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ReviewsContext.Provider value={{state, dispatch, fetchReviews, createReview, removeReview}}>
            {children}
        </ReviewsContext.Provider>
    )
}

export const useReviews = () => {
    const ctx = useContext(ReviewsContext);
    if (!ctx) {
        throw new Error("useReviews must be used within the context");
    }
}