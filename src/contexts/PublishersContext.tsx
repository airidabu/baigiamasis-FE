import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { PublisherAction, publisherReducer, PublisherState, initialState } from "../reducers/publisherReducer.ts";
import { getPublishers, addPublisher, updatePublisher, deletePublisher } from "../api/publishers.ts";
import Publisher from "../types/Publisher.ts";

type PublishersContextType = {
    state: PublisherState;
    dispatch: Dispatch<PublisherAction>;
    fetchPublishers: () => Promise<void>;
    createPublisher: (publisher: Omit<Publisher, "_id" | "createdAt" | "updatedAt" | "__v">) => Promise<void>;
    updatePublisherData: (id: string, publisher: Partial<Publisher>) => Promise<void>;
    removePublisher: (id: string) => Promise<void>;
}

const PublishersContext = createContext<PublishersContextType | undefined>(undefined);

export const PublishersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(publisherReducer, initialState);

    const fetchPublishers = async () => {
        try {
            const publishers = await getPublishers();
            dispatch({ type: "GET_PUBLISHERS", payload: publishers });
        } catch (error) {
            console.error(error);
        }
    }

    const createPublisher = async (publisher: Omit<Publisher, "_id" | "createdAt" | "updatedAt" | "__v">) => {
        try {
            const newPublisher = await addPublisher(publisher);
            if (newPublisher) {
                dispatch({ type: "ADD_PUBLISHER", payload: newPublisher });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const updatePublisherData = async (id: string, publisher: Partial<Publisher>) => {
        try {
            const updatedPublisher = await updatePublisher(id, publisher);
            if (updatedPublisher) {
                dispatch({ type: "UPDATE_PUBLISHER", payload: updatedPublisher });
            }
        } catch (error) {
            console.error(error);
        }
    }

    const removePublisher = async (id: string) => {
        try {
            await deletePublisher(id);
            dispatch({ type: "DELETE_PUBLISHER", payload: id });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <PublishersContext.Provider value={{ state, dispatch, fetchPublishers, createPublisher, updatePublisherData, removePublisher }}>
            {children}
        </PublishersContext.Provider>
    )
}

export const usePublishers = () => {
    const ctx = useContext(PublishersContext);
    if (!ctx) {
        throw new Error("usePublishers must be used within a PublishersProvider");
    }
    return ctx;
}
