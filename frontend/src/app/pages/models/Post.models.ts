import { User } from './User.models';
import { Comment } from './Comment.models';
import { Like } from './Like.models';

export class Post {
    id: number;
    titre: string;
    contenu: string;
    image: string;
    UserId: number;
    Like_posts ?:Like[];
    Comments ?:Comment[];
    User ?:User;
    createdAt :Date;
}