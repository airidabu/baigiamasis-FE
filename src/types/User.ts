interface User {
    _id: string;
    name: string;
    surname: string;
    email: string;
    birthday?: Date;
    role: 'user' | 'author' | 'admin';
    createdAt?: string;
    updatedAt?: string;
}

export default User;