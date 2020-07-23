import {
    Arg,
    Resolver,
    Mutation,
    Query,
} from 'type-graphql';
import { GraphQLString } from 'graphql';

import { Category } from '../common/graphql';
import { iCategory } from '../common/services';



@Resolver(Category)
export default class CategoryResolver {

    @Mutation(() => Boolean)
    async createCategory(
        @Arg('categoryName', () => GraphQLString) categoryName: string,
    ): Promise<boolean> {
        return !!await iCategory.createCategory({ categoryName } as Category);
    }

    @Query(() => [Category])
    async getAllCategories(): Promise<Category[]> {

        const lala = await iCategory.getAll();
        return lala;
    }
};
