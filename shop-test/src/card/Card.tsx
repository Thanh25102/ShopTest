import "./Card.css"
import {ProductItem} from "./item/ProductItem";
import {FC} from "react";
import {CartItem} from "./item/CartItem";
import {CartItem as Cart, Product} from "../type";

type Props = {
    type: 'PRODUCT' | 'CART';
    products?: Product[];
    cart?: Cart[];
    onAddProduct?: (p: Product) => void;
    onRemoveProduct?: (productId: number) => void;
    onUpdateQuantity?: (productId: number, quantity: number) => void;
    isAdded?: (productId: number) => boolean;
    isUpdating?: boolean;
}

export const Card: FC<Props> = ({
                                    type,
                                    isAdded,
                                    products = [],
                                    cart = [],
                                    onUpdateQuantity,
                                    onAddProduct,
                                    onRemoveProduct,
                                    isUpdating
                                }) => {
    const calTotalPrice = (cart: Cart[]) => {
        return cart.reduce((acc, val) => acc + val.product.price * val.quantity, 0)
    };


    return <div className={"layout"}>
        <div className={"card-top"}>
            <img className={"logo"} src={"./assets/nike.png"} alt={"Logo"}/>
        </div>
        <div className={"card-title"}>
            {type === "PRODUCT" ? "Our Products" : <>Your cart<span
                className="card-title-money">${calTotalPrice(cart).toFixed(2)}</span></>}

        </div>
        <div className="card-body">
            <div>
                {
                    type === "PRODUCT" ?
                        products.map(product => <ProductItem key={product.id} product={product}
                                                             onAddProduct={onAddProduct}
                                                             isAdded={isAdded && isAdded(product.id)}/>) :
                        cart.length > 0 ? cart.map(cartItem => <CartItem key={cartItem.product.id} cart={cartItem}
                                                                         isUpdating={isUpdating}
                                                                         onRemoveProduct={onRemoveProduct}
                                                                         onUpdateQuantity={onUpdateQuantity}/>) :
                            <div style={{position: "absolute"}}><p style={{fontSize: "14px"}}>Your cart is
                                empty.</p></div>
                }
            </div>
        </div>
    </div>
}