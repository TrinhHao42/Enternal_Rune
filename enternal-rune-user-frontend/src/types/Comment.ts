import {User} from "@/types/User";
import {CommentStatus} from "@/types/enums/CommentStatus";

export type Comment = {
    cmContent: string
    cmRating: number
    cmUser: User
    cmStatus: CommentStatus
    cmDate: Date
    cmReplyComment?: Comment[]
}