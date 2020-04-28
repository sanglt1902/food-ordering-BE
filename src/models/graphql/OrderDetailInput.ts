
import { ArgsType, Field, Int, InputType } from 'type-graphql';

@InputType()
export class OrderDetailInput {
    @Field({ description: 'product id' })
    public productId!: string;

    @Field(() => Int, { description: 'product quantity' })
    public productQuantity!: number;
}

