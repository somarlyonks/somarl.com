
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface NewRecipeInput {
    title: string;
    description?: string;
    ingredients: string[];
}

export interface IMutation {
    addRecipe(newRecipeData: NewRecipeInput): Recipe | Promise<Recipe>;
    removeRecipe(id: string): boolean | Promise<boolean>;
}

export interface IQuery {
    recipe(id: string): Recipe | Promise<Recipe>;
    recipes(skip?: number, take?: number): Recipe[] | Promise<Recipe[]>;
}

export interface Recipe {
    id: string;
    title: string;
    description?: string;
    created: Date;
    ingredients: string[];
}

export interface ISubscription {
    recipeAdded(): Recipe | Promise<Recipe>;
}
