import { ReviewAction, reviewReducer, ReviewState, initialState } from "../reducers/reviewReducer.ts";
import { addReview, deleteReview, getBookReviews } from "../api/reviews.ts";
import Review from "../types/Review.ts";
import { createContext, Dispatch, ReactNode, useContext, useReducer, useCallback } from "react";
import { useAuth } from "./AuthContext.tsx";

type ReviewsContextType = {
    state: ReviewState;
    dispatch: Dispatch<ReviewAction>
    fetchReviews: (id: string) => Promise<void>;
    createReview: (review: Omit<Review, "_id">) => Promise<void>;
    removeReview: (id: string) => Promise<void>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reviewReducer, initialState);
    const { user } = useAuth();

    const fetchReviews = useCallback(async (id: string) => {
        try {
            const reviews = await getBookReviews(id);
            dispatch({ type: "GET_REVIEWS", payload: reviews });
        } catch (error) {
            console.error(error);
        }
    }, []);

    const removeReview = async (id: string) => {
        try {
            await deleteReview(id);
            dispatch({ type: "REMOVE_REVIEW", payload: id });
        } catch (error) {
            console.error(error);
        }
    }

    const createReview = async (review: Omit<Review, "_id">) => {
        try {
            const newReview = await addReview(review as Review);

            if (typeof newReview.user === 'string' && user) {
                newReview.user = {
                    _id: user.id,
                    name: user.name,
                    surname: user.surname,
                    email: user.email,
                    role: user.role || 'user'
                };
            }

            dispatch({ type: "ADD_REVIEW", payload: newReview })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ReviewsContext.Provider value={{ state, dispatch, fetchReviews, createReview, removeReview }}>
            {children}
        </ReviewsContext.Provider>
    )
}

export const useReviews = () => {
    const ctx = useContext(ReviewsContext);
    if (!ctx) {
        throw new Error("useReviews must be used within the context");
    }
    return ctx;
}