
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin"
}

export interface CreateUserInput {
    username: string;
    role: UserRole;
}

export interface UpdateUserInput {
    id: number;
}

export interface IQuery {
    hello(): string | Promise<string>;
}

export interface User {
    id: number;
    username: string;
    role: UserRole;
}

export interface IMutation {
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
