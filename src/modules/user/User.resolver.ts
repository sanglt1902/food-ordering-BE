import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import {
    Arg,
    Args,
    Authorized,
    Ctx,
    Mutation,
    Query,
    Resolver,
} from 'type-graphql';
import { User } from './User';
import AuthInputArgs from '../../auth/AuthInputArgs';
import Token from '../../auth/Token';
import { IContext, IUserPayLoad, Role } from '../../auth/ContextInterface';

const expiresIn = '1y';

@Resolver(User)
export default class UserResolver {
    @Authorized([Role.USER])
    @Query((returns) => User)
    public async user(@Ctx() ctx: IContext) {
        if (ctx.user && ctx.user.role === Role.USER) {
            const user = await User.findOne({
                where: { id: ctx.user.id },
            });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        }
        throw new Error('User not found');
    }

    @Query((returns) => User)
    public async userFind(@Arg('email') email: string) {
        const user = await User.findOne({
            where: { email },
        });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    @Mutation(() => Token)
    public async userSignIn(@Args()
    {
        email,
        password,
    }: AuthInputArgs) {
        // Check if the user is valid
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('No user with that email');
        }

        // Check if the password is valid
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            throw new Error('Incorrect password');
        }
        const payload: IUserPayLoad = {
            id: user.id,
            role: Role.USER,
        };
        // Generate a new token a save it
        const token = jsonwebtoken.sign(payload, process.env.app_CRYPTO_KEY!, {
            expiresIn,
        });

        return { token };
    }

    @Mutation(() => Token)
    public async userSignUp(
        @Args()
        { email, password }: AuthInputArgs,
    ) {
        // Find if there is an existing account
        const user = await User.findOne({ where: { email } });

        if (user) {
            throw new Error('Email exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
        });
        const payload: IUserPayLoad = {
            id: newUser.id,
            role: Role.USER,
        };
        const token = jsonwebtoken.sign(payload, process.env.app_CRYPTO_KEY!, {
            expiresIn,
        });
        return { token };
    }
}
