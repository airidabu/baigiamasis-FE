import User from "../types/User";

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export type UserAction =
    | { type: "GET_USERS"; payload: User[] }
    | { type: "GET_USERS_LOADING" }
    | { type: "GET_USERS_ERROR"; payload: string };

export const userReducer = (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case "GET_USERS_LOADING":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "GET_USERS_ERROR":
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};