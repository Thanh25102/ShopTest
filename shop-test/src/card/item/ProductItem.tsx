import "./CartItem.css"
import {FC} from "react";
import {Product} from "../../type";

type Props = {
    isAdded?: boolean;
    product: Product;
    onAddProduct?: (p: Product) => void;
}
export const ProductItem: FC<Props> = ({isAdded = false, product, onAddProduct}) => {

    return <div className="card-item">
        <div className="card-image" style={{backgroundColor: product.color}}>
            <img alt={"ProductImage"}
                 src={product.image}/>
        </div>
        <div className="card-name">{product.name}</div>
        <div className="card-des">
            {product.description}
        </div>
        <div className="card-action">
            <div className="card-price">${product.price}</div>
            {
                isAdded ?
                    <div className="card-inactive card-btn">
                        <div className="card-btn-cover">
                            <div className="card-btn-check-icon"></div>
                        </div>
                    </div> :
                    <div className="card-btn" onClick={() => onAddProduct && onAddProduct(product)}><p>ADD TO CART</p>
                    </div>
            }
        </div>
    </div>
}