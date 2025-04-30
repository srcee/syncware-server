
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

export interface IQuery {
    hello(): string | Promise<string>;
}

export interface User {
    role: UserRole;
    username: string;
}

type Nullable<T> = T | null;
