import { User } from './User.models';

export class Like {
    id: number;
    like: number | boolean;
    isLike: boolean;
    User: User;
    userId: number;
}