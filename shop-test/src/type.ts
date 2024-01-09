export type CartItem = {
    product: Product;
    quantity: number;
}

export type Product = {
    id: number;
    image: string;
    name: string;
    description: string;
    price: number;
    color: string;
}