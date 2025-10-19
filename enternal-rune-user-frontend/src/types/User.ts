import { Address } from "@/types/Address";
import { Role } from "@/types/enums/UserRole";

export type User = {
    userName: string
    userEmail: string
    userAddress: Address
    userRole: Role
}