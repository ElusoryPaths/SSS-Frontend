import Address from "./Address";
import User from "./User";

export default class Buyer extends User {
    orderHistory: [] | undefined;
    address!: Address;
}
