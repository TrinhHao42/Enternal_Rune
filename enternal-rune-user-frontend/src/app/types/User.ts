import Address from "../../types/Address";

enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}

type User = {
    userName: string
    userEmail: string
    userAddress: Address
    userRole: Role
}

export default User;