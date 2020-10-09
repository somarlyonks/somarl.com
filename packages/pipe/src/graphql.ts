
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface NewDocumentInput {
    key: string;
    name: string;
    image: string;
    schema: JSON;
}

export interface NewImageInput {
    key: string;
    name: string;
    url: string;
    imageInfo?: string;
}

export interface NewRecipeInput {
    title: string;
    description?: string;
    meta?: JSON;
    ingredients: string[];
}

export interface NewUserInput {
    nickname?: string;
    email: string;
    password: string;
}

export interface IModel {
    id: string;
    created: DateString;
}

export interface Doctype extends IModel {
    id: string;
    created: DateString;
    name: string;
    description?: string;
    image: string;
    schema: JSON;
}

export interface Document extends IModel {
    id: string;
    created: DateString;
    name: string;
    description?: string;
    image: string;
    content?: string;
    meta: JSON;
}

export interface Image extends IModel {
    id: string;
    created: DateString;
    key: string;
    name: string;
    url: string;
    imageInfo?: JSON;
}

export interface IMutation {
    addImage(newImageData: NewImageInput): Image | Promise<Image>;
    removeImage(id: string): boolean | Promise<boolean>;
    addDoctype(newDoctypeData: NewDocumentInput): Document | Promise<Document>;
    removeDoctype(id: string): boolean | Promise<boolean>;
    addRecipe(newRecipeData: NewRecipeInput): Recipe | Promise<Recipe>;
    removeRecipe(id: string): boolean | Promise<boolean>;
    createUser(newUserData: NewUserInput): User | Promise<User>;
}

export interface IQuery {
    image(id: string): Image | Promise<Image>;
    images(skip?: number, take?: number): Image[] | Promise<Image[]>;
    doctype(id: string): Document | Promise<Document>;
    doctypes(skip?: number, take?: number): Document[] | Promise<Document[]>;
    recipe(id: string): Recipe | Promise<Recipe>;
    recipes(skip?: number, take?: number): Recipe[] | Promise<Recipe[]>;
    user(id: string): User | Promise<User>;
    me(): User | Promise<User>;
}

export interface Recipe extends IModel {
    id: string;
    created: DateString;
    title: string;
    description?: string;
    meta?: JSON;
    ingredients: string[];
}

export interface ISubscription {
    recipeAdded(): Recipe | Promise<Recipe>;
}

export interface User extends IModel {
    id: string;
    created: DateString;
    nickname: string;
    email: string;
    lastseen: DateString;
    password: string;
    accessLevel: number;
    avatar: string;
}

type DateString = S;
export type JSON = any;
