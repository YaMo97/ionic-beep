import { Profile } from "../profile/profile.interface";
import { StringLike } from "@firebase/util";

export interface Message {
    
    userFromId: string;
    userFromProfile: {
        firstName: string;
        lastName: string;
    }

    userToId: string;
    userToProfile: {
        firstName: string;
        lastName: string;
    }

    content: string;
}