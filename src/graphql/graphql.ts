
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    admin = "admin",
    manager = "manager",
    waiter = "waiter",
    chef = "chef",
    bartender = "bartender"
}

export enum MenuItemPreparationArea {
    Bar = "Bar",
    Kitchen = "Kitchen"
}

export enum OrderItemStatus {
    Queued = "Queued",
    Preparing = "Preparing",
    Ready = "Ready",
    Delivered = "Delivered",
    Cancelled = "Cancelled"
}

export enum OrderStatus {
    Pending = "Pending",
    Confirmed = "Confirmed",
    InProgress = "InProgress",
    Completed = "Completed",
    Cancelled = "Cancelled"
}

export enum RestaurantTableStatus {
    Available = "Available",
    Occupied = "Occupied",
    Reserved = "Reserved"
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface CreateMenuCategoryInput {
    name: string;
    restaurantId: number;
}

export interface UpdateMenuCategoryInput {
    id: number;
    name?: Nullable<string>;
    restaurantId?: Nullable<number>;
}

export interface CreateMenuItemInput {
    name: string;
    description?: Nullable<string>;
    price: number;
    categoryId: number;
    isAvailable: boolean;
    preparationArea: MenuItemPreparationArea;
}

export interface UpdateMenuItemInput {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    categoryId?: Nullable<number>;
    isAvailable?: Nullable<boolean>;
    preparationArea?: Nullable<string>;
}

export interface CreateOrderItemInput {
    orderId: number;
    menuItemId: number;
    quantity: number;
    notes?: Nullable<string>;
    status?: Nullable<OrderItemStatus>;
}

export interface UpdateOrderItemInput {
    id: number;
    orderId?: Nullable<number>;
    menuItem?: Nullable<number>;
    quantity?: Nullable<number>;
    notes?: Nullable<string>;
    status?: Nullable<OrderItemStatus>;
}

export interface CreateOrderInput {
    tableId: number;
    userId: number;
    status: OrderStatus;
    createdAt: Date;
    itemIds?: Nullable<Nullable<number>[]>;
}

export interface UpdateOrderInput {
    id: number;
    tableId?: Nullable<number>;
    userId?: Nullable<number>;
    status?: Nullable<OrderStatus>;
    createdAt?: Nullable<Date>;
    itemIds?: Nullable<Nullable<number>[]>;
}

export interface CreateOrganizationInput {
    name: string;
    restaurantIds?: Nullable<Nullable<number>[]>;
}

export interface UpdateOrganizationInput {
    name?: Nullable<string>;
    restaurantIds?: Nullable<Nullable<number>[]>;
}

export interface CreateRestaurantTableInput {
    tableName?: Nullable<string>;
    seats?: Nullable<number>;
    status?: Nullable<RestaurantTableStatus>;
    restaurantId?: Nullable<number>;
}

export interface UpdateRestaurantTableInput {
    id: number;
    tableName?: Nullable<string>;
    seats?: Nullable<number>;
    status?: Nullable<RestaurantTableStatus>;
    restaurantId?: Nullable<number>;
}

export interface CreateRestaurantInput {
    organizationId: number;
    name: string;
    location?: Nullable<string>;
    tableIds?: Nullable<Nullable<number>[]>;
    userIds?: Nullable<Nullable<number>[]>;
}

export interface UpdateRestaurantInput {
    id: number;
    organizationId?: Nullable<number>;
    name?: Nullable<string>;
    location?: Nullable<string>;
    tableIds?: Nullable<Nullable<number>[]>;
    userIds?: Nullable<Nullable<number>[]>;
}

export interface CreateUserInput {
    email?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<UserRole>;
    restaurantId?: Nullable<number>;
}

export interface UpdateUserInput {
    id: number;
    email?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
    role?: Nullable<UserRole>;
    restaurantId?: Nullable<number>;
}

export interface UserAuth {
    access_token: string;
}

export interface IQuery {
    login(): UserAuth | Promise<UserAuth>;
    menuCategory(id: number): Nullable<MenuCategory> | Promise<Nullable<MenuCategory>>;
    menuItem(id: number): Nullable<MenuItem> | Promise<Nullable<MenuItem>>;
    orderItem(id: number): Nullable<OrderItem> | Promise<Nullable<OrderItem>>;
    order(id: number): Nullable<Order> | Promise<Nullable<Order>>;
    organization(id: number): Nullable<Organization> | Promise<Nullable<Organization>>;
    restaurantTable(id: number): Nullable<RestaurantTable> | Promise<Nullable<RestaurantTable>>;
    restaurant(id: number): Nullable<Restaurant> | Promise<Nullable<Restaurant>>;
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface IMutation {
    login(input: LoginInput): UserAuth | Promise<UserAuth>;
    createMenuCategory(createMenuCategoryInput: CreateMenuCategoryInput): MenuCategory | Promise<MenuCategory>;
    updateMenuCategory(updateMenuCategoryInput: UpdateMenuCategoryInput): MenuCategory | Promise<MenuCategory>;
    deleteMenuCategory(id: number): Nullable<boolean> | Promise<Nullable<boolean>>;
    createMenuItem(createMenuItemInput: CreateMenuItemInput): MenuItem | Promise<MenuItem>;
    updateMenuItem(updateMenuItemInput: UpdateMenuItemInput): MenuItem | Promise<MenuItem>;
    deleteMenuItem(id: number): Nullable<MenuItem> | Promise<Nullable<MenuItem>>;
    createOrderItem(createOrderItemInput: CreateOrderItemInput): OrderItem | Promise<OrderItem>;
    updateOrderItem(updateOrderItemInput: UpdateOrderItemInput): OrderItem | Promise<OrderItem>;
    deleteOrderItem(id: number): Nullable<OrderItem> | Promise<Nullable<OrderItem>>;
    createOrder(createOrderInput: CreateOrderInput): Order | Promise<Order>;
    updateOrder(updateOrderInput: UpdateOrderInput): Order | Promise<Order>;
    deleteOrder(id: number): Nullable<Order> | Promise<Nullable<Order>>;
    createOrganization(createOrganizationInput: CreateOrganizationInput): Organization | Promise<Organization>;
    updateOrganization(updateOrganizationInput: UpdateOrganizationInput): Organization | Promise<Organization>;
    deleteOrganization(id: number): Nullable<Organization> | Promise<Nullable<Organization>>;
    createRestaurantTable(createRestaurantTableInput: CreateRestaurantTableInput): RestaurantTable | Promise<RestaurantTable>;
    updateRestaurantTable(updateRestaurantTableInput: UpdateRestaurantTableInput): RestaurantTable | Promise<RestaurantTable>;
    removeRestaurantTable(id: number): Nullable<RestaurantTable> | Promise<Nullable<RestaurantTable>>;
    createRestaurant(createRestaurantInput: CreateRestaurantInput): Restaurant | Promise<Restaurant>;
    updateRestaurant(updateRestaurantInput: UpdateRestaurantInput): Restaurant | Promise<Restaurant>;
    deleteRestaurant(id: number): Nullable<Restaurant> | Promise<Nullable<Restaurant>>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    deleteUser(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export interface MenuCategory {
    id: number;
    name: string;
    items?: Nullable<Nullable<MenuItem>[]>;
    restaurant?: Nullable<Restaurant>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface MenuItem {
    id?: Nullable<number>;
    name?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    categoryId?: Nullable<number>;
    isAvailable?: Nullable<boolean>;
    preparationArea?: Nullable<MenuItemPreparationArea>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface OrderItem {
    id?: Nullable<number>;
    order?: Nullable<Order>;
    menuItem?: Nullable<MenuItem>;
    quantity?: Nullable<number>;
    notes?: Nullable<string>;
    status?: Nullable<OrderItemStatus>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface Order {
    id?: Nullable<number>;
    table?: Nullable<RestaurantTable>;
    waiter?: Nullable<User>;
    items?: Nullable<Nullable<OrderItem>[]>;
    status?: Nullable<OrderStatus>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface Organization {
    id?: Nullable<number>;
    name?: Nullable<string>;
    restaurants?: Nullable<Nullable<Restaurant>[]>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface RestaurantTable {
    id?: Nullable<number>;
    tableName?: Nullable<string>;
    seats?: Nullable<number>;
    status?: Nullable<RestaurantTableStatus>;
    restaurant?: Nullable<Restaurant>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface Restaurant {
    id?: Nullable<number>;
    name?: Nullable<string>;
    location?: Nullable<string>;
    organization?: Nullable<Organization>;
    users?: Nullable<Nullable<User>[]>;
    tables?: Nullable<Nullable<RestaurantTable>[]>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

export interface User {
    id?: Nullable<number>;
    email?: Nullable<string>;
    username?: Nullable<string>;
    role?: Nullable<UserRole>;
    restaurant?: Nullable<Restaurant>;
    archived?: Nullable<boolean>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    createdBy?: Nullable<User>;
    updatedBy?: Nullable<User>;
}

type Nullable<T> = T | null;
