import { Product } from '../models/entities/Product';

export interface IProduct {
    getAllProducts(): Promise<Product[]>
    getBreakfast(): Promise<Product[]>;
    getTodayFood(): Promise<Product[]>;
    getDrink(): Promise<Product[]>;
    getProductById(Id: string): Promise<Product>;
    createProduct(product: any & { imagePaths: string[] }): Promise<Product>;
};
