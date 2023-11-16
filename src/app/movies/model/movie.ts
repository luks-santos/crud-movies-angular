import { Comment } from "./comment";

export interface Movie {
    _id: string;
    name: string;
    releaseDate: number;
	duration: string;
    classification: string;
    comments?: Comment[];
}