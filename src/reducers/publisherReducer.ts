import Publisher from "../types/Publisher.ts";

export type PublisherState = {
    publishers: Publisher[];
    error: string | null;
}

export type PublisherAction =
    | { type: "GET_PUBLISHERS", payload: Publisher[] }
    | { type: "ADD_PUBLISHER", payload: Publisher }
    | { type: "UPDATE_PUBLISHER", payload: Publisher }
    | { type: "DELETE_PUBLISHER", payload: string }

export const initialState: PublisherState = {
    publishers: [],
    error: null
};

export const publisherReducer = (state: PublisherState, action: PublisherAction) => {
    switch (action.type) {
        case "GET_PUBLISHERS":
            return { ...state, publishers: action.payload };
        case "ADD_PUBLISHER":
            return { ...state, publishers: [...state.publishers, action.payload] };
        case "UPDATE_PUBLISHER":
            return {
                ...state,
                publishers: state.publishers.map(publisher =>
                    publisher._id === action.payload._id ? action.payload : publisher
                )
            };
        case "DELETE_PUBLISHER":
            return { ...state, publishers: state.publishers.filter(publisher => publisher._id !== action.payload) };
        default:
            return state;
    }
}
