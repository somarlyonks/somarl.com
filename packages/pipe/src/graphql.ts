
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface NewImageInput {
    key: string;
    name: string;
    url: string;
    imageInfo?: string;
}

export interface NewRecipeInput {
    title: string;
    description?: string;
    ingredients: string[];
}

export interface IModel {
    id: string;
    created: DateString;
}

export interface IRelation {
    id: string;
    created: DateString;
    from: string;
    to: string;
}

export interface Image extends IModel {
    id: string;
    created: DateString;
    key: string;
    name: string;
    url: string;
    imageInfo?: string;
}

export interface IMutation {
    addImage(newImageData: NewImageInput): Image | Promise<Image>;
    removeImage(id: string): boolean | Promise<boolean>;
    addRecipe(newRecipeData: NewRecipeInput): Recipe | Promise<Recipe>;
    removeRecipe(id: string): boolean | Promise<boolean>;
}

export interface IQuery {
    image(id: string): Image | Promise<Image>;
    images(skip?: number, take?: number): Image[] | Promise<Image[]>;
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
