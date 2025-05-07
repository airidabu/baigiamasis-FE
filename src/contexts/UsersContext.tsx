import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";
import { UserState, initialState, UserAction, userReducer } from "../reducers/userReducer";
import { getUsers } from "../api/users";

type UsersContextType = {
    state: UserState;
    dispatch: Dispatch<UserAction>;
    fetchUsers: () => Promise<void>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const fetchUsers = async () => {
        try {
            dispatch({ type: "GET_USERS_LOADING" });
            const users = await getUsers();
            dispatch({ type: "GET_USERS", payload: users });
        } catch (error) {
            console.error("Error fetching users:", error);
            dispatch({
                type: "GET_USERS_ERROR",
                payload: error instanceof Error ? error.message : "Failed to fetch users"
            });
        }
    }

    return (
        <UsersContext.Provider value={{ state, dispatch, fetchUsers }}>
            {children}
        </UsersContext.Provider>
    );
};

export const useUsers = () => {
    const ctx = useContext(UsersContext);
    if (!ctx) {
        throw new Error("useUsers must be used within the UsersProvider");
    }

    return ctx;
};