import Review from "./Review";

export default interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
    reviews: Array<Review>
}