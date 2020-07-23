import { IProduct } from './IProduct'
import { Product } from './Product';
import { logger } from '../../logger';
import { iCategory } from '../common/services';

export class ProductService implements IProduct {

    async getDrink(): Promise<Product[]> {
        const category = await iCategory.getCategoryByName('Nước');
        return await Product.findAll({ where: { categoryId: category.id } });
    }

    getBreakfast(): Promise<Product[]> {
        return Product.findAll({ where: { isBreakfast: true } });
    }

    getTodayFood(): Promise<Product[]> {
        return Product.findAll({ where: { isTodayFood: true } });
    }

    async createProduct(productInput: any): Promise<any> {
        const category = await iCategory.getCategoryById(productInput.categoryId);
        if (!category) {
            logger.error(`Cannot find category by Id: ${productInput.categoryId}`, '------createProduct-----')
            return false;
        }
        return Product.create(productInput);
    }

    getProductById(Id: string): Promise<Product> {
        return Product.findOne({ where: { id: Id } });
    }

    getAllProducts(): Promise<Product[]> {
        return Product.findAll();
    }
}
