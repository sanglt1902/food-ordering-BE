import {
    Args,
    Resolver,
    Mutation,
} from 'type-graphql';
import { GraphQLString } from 'graphql';

import { Order } from '../common/graphql';
import { OrderInput } from './graphql/OrderInput';
import { iOrder } from '../common/services';


@Resolver(Order)
export default class OrderResolver {

    @Mutation(() => Boolean)
    async createOrder(
        @Args() order: OrderInput,
    ): Promise<boolean> {
        return !! await iOrder.createOrder(order);
    }

}
