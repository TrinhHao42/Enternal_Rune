import User from "./User";

enum CommentStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    DELETED = "DELETED",
    EDITED = "EDITED"
}

type Comment = {
    cmContent: string
    cmRating: number
    cmUser: User
    cmStatus: CommentStatus
    cmDate: Date
    cmReplyComment?: Comment[]
}

export default Comment;