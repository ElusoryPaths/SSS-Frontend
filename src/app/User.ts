import Address from "./Address";

export default class User{
    _id!: string | undefined;
    accountType!: string | undefined;
    username!: string | undefined;
    password!: string | undefined;
    firstName!: string | undefined;
    lastName!: string | undefined;
    email!: string | undefined;
    name!: string | undefined;
    phoneNumber!: string | undefined;
    address!: Address;
    wishlist: Array<any> = [];
}