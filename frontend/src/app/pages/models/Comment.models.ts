import { User } from './User.models';

export class Comment {
    id :number;
    contenu: string;
    UserId: number;
    User :User;
    createdAt :Date;
}