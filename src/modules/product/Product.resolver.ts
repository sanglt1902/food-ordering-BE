import {
    Arg,
    Resolver,
    Mutation,
    Args,
    Query,
    FieldResolver,
    Root,
} from 'type-graphql';

import { ProductInput } from './graphql/ProductInput';
import { GraphQLUpload } from 'apollo-server-express';
import { Upload } from '../common/services/IUpload';
import { Product, Category } from '../common/graphql';
import { iProduct } from '../common/services';
import { uploadImage } from '../../utils/FileUtil';


@Resolver(Product)
export default class ProductResolver {

    @FieldResolver(() => Category)
    async category(@Root() product: Product) {
        return await Category.findOne({ where: { id: product.categoryId } });
    }

    @Mutation(() => Boolean)
    async addProduct(
        // @ts-ignore
        @Arg('image', () => GraphQLUpload) image: Upload,
        @Args() product: ProductInput,
    ): Promise<boolean> {
        const imagePath = await uploadImage(image);
        return !! await iProduct.createProduct({ ...product, imageURL: imagePath });
    }


    @Query(() => [Product])
    async getAllProducts(): Promise<Product[]> {
        return await iProduct.getAllProducts();
    }
    @Query(() => [Product])
    async getBreakFast(): Promise<Product[]> {
        return await iProduct.getBreakfast();
    }
    @Query(() => [Product])
    async getTodayFood(): Promise<Product[]> {
        return await iProduct.getTodayFood();
    }

    @Query(() => [Product])
    async getDrink(): Promise<Product[]> {
        return await iProduct.getTodayFood();
    }
}

