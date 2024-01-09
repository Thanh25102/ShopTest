import React, {useEffect, useState} from 'react';
import './App.css';
import {Card} from "./card/Card";
import {CartItem, Product} from "./type";
import mock from "./mock.json"
import instance from "./api_instance";

function App() {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    const [isUpdating, setIsUpdating] = useState(false);

    const handleAddProduct = (product: Product) => {
        instance.post("/cart", {"product_id": product.id, "quantity": 1})
            .then(() => setCart(prev => [...prev, {product, quantity: 1}]))
    }

    const handleRemoveProduct = (productId: number) => setCart(prev => {
        instance.delete(`/cart/${productId}`).then(result => console.log("result", result))
        return prev.filter(cart => cart.product.id !== productId)
    })

    const handleUpdateQuantity = (productId: number, quantity: number) => {
        setIsUpdating(true);
        instance.patch(`/cart/${productId}`, {quantity}).then(res => {
            quantity === 0 ? handleRemoveProduct(productId) : setCart(prev =>
                prev.map(cart => cart.product.id === productId ? {
                    ...cart,
                    quantity: quantity
                } : cart))
        }).finally(() => setIsUpdating(false));

    }

    const isAdded = (productId: number) => cart.find(cart => cart.product.id === productId) !== undefined;
    useEffect(() => {
        instance.get("/products")
            .then((res) => {
                const products: Product[] = res.data.data || []
                instance.get("/cart")
                    .then(res => {
                        const cart = res.data.data as { product_id: number, quantity: number }[];
                        setProducts(products);

                        setCart(
                            cart.map(c => (
                                {
                                    product: products.find(p => p.id === c.product_id) || {} as any,
                                    quantity: c.quantity
                                }
                            )))
                    })
                    .catch(() => setCart([]))
            })
            .catch(() => setProducts(mock.shoes))


    }, [])

    return (
        <div className="App">
            <Card type={"PRODUCT"} products={products} onAddProduct={handleAddProduct} isAdded={isAdded}/>
            <Card type={"CART"} onRemoveProduct={handleRemoveProduct} cart={cart} isUpdating={isUpdating}
                  onUpdateQuantity={handleUpdateQuantity}/>
        </div>
    );
}

export default App;
