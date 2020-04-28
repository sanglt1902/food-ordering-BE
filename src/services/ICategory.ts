import { Category } from '../models';

export interface ICategory {
    getAll(): Promise<Category[]>;
    getCategoryById(Id: string): Promise<Category>;
    getCategoryByName(name: string): Promise<Category>;
    createCategory(category: Category): Promise<boolean>;
};
