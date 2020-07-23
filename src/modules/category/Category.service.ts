import { ICategory } from './ICategory';
import { Category } from '../common/graphql';

export class CategoryService implements ICategory {
    getCategoryByName(name: string): Promise<Category> {
        return Category.findOne({ where: { name } })
    }

    getCategoryById(Id: string): Promise<Category> {
        return Category.findOne({ where: { id: Id } });
    }
    getAll(): Promise<Category[]> {
        return Category.findAll();
    }
    createCategory(category: Category): Promise<any> {
        return Category.create(category);
    }
}
