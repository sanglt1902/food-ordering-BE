import {
    Args,
    Resolver,
    Mutation,
} from 'type-graphql';
import { GraphQLString } from 'graphql';

import { Order } from '../models';
import { OrderInput } from '../models/graphql/OrderInput';
import { iOrder } from '../services';


@Resolver(Order)
export default class OrderResolver {

    @Mutation(() => Boolean)
    async createOrder(
        @Args() order: OrderInput,
    ): Promise<boolean> {
        return !! await iOrder.createOrder(order);
    }

}
