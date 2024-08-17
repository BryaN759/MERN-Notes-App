export type UserType = {
    _id: string;
    fullName: string;
    email: string;
    password: string;
};

export type NotesType = {
    _id: string;
    userId: string;
    title: string;
    text: string;
    createdAt: string;
    updatedAt: string;
};
