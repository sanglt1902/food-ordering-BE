
import { ArgsType, Field, Int } from 'type-graphql';
import { OrderDetailInput } from './OrderDetailInput';

@ArgsType()
export class OrderInput {

    @Field({ description: 'Ship note' })
    public shipNote?: string;

    @Field({ description: 'Ship address' })
    public shipAddress!: string;

    @Field({ description: 'Ship name' })
    public shipName!: string;

    @Field({ description: 'Ship phone' })
    public shipPhone!: string;

    @Field(() => [OrderDetailInput], { description: 'Ship phone' })
    public orderDetails!: OrderDetailInput[];
}
