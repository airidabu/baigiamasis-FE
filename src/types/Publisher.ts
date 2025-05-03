interface Publisher {
    _id: string;
    name: string;
    location?: string;
    establishedYear?: number;
    website?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export default Publisher;