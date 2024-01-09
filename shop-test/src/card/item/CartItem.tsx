import {CartItem as Cart} from "../../type";
import {FC, useEffect, useState} from "react";

type Props = {
    cart: Cart;
    onRemoveProduct?: (productId: number) => void;
    onUpdateQuantity?: (productId: number, quantity: number) => void;
    isUpdating?: boolean;
}
export const CartItem: FC<Props> = ({cart, onRemoveProduct, onUpdateQuantity, isUpdating = false}) => {
    const [scale, setScale] = useState(0);
    const [isRemoving, setIsRemoving] = useState(false);
    useEffect(() => {
        const scaleTimeout = setInterval(() => {
            setScale(1);
        }, 20);
        return () => clearTimeout(scaleTimeout);
    }, []);

    const handleRemove = (productId: number) => {
        setIsRemoving(true);
        const scaleTimeout = setTimeout(() => onRemoveProduct && onRemoveProduct(productId), 800);
        return () => clearTimeout(scaleTimeout);
    }

    const handleUpdate = (productId: number, quantity: number) => {
        if (quantity === 0) {
            setIsRemoving(true);
            const scaleTimeout = setTimeout(() => onUpdateQuantity && onUpdateQuantity(productId, quantity), 800);
            return () => clearTimeout(scaleTimeout);
        } else {
            onUpdateQuantity && onUpdateQuantity(productId, quantity)
        }
    }

    return <div className={`cart-item  ${isRemoving && 'scale-effect'}`}>
        <div className="cart-left">
            <div className="cart-item-image" style={{
                backgroundColor: cart.product.color,
                transform: `scale(${scale})`,
                transition: 'transform 1s',
            }}>
                <div className="image-block">
                    <img alt="ProductImage"
                         src={cart.product.image}/>
                </div>
            </div>
        </div>
        <div className="cart-right ">
            <div className="cart-item-name animated-text">{cart.product.name}</div>
            <div className="cart-item-price animated-text-delay">${cart.product.price}</div>
            <div className="cart-item-action opacity-effect">
                <div className="cart-item-count">
                    <div className={`cart-item-count-btn ${isUpdating && "disabled"}`}

                         onClick={() => handleUpdate(cart.product.id, --cart.quantity)}>-
                    </div>
                    <div className="cart-item-count-num">{cart.quantity}</div>
                    <div className={`cart-item-count-btn ${isUpdating && "disabled"}`}
                         onClick={() => onUpdateQuantity && onUpdateQuantity(cart.product.id, ++cart.quantity)}>+
                    </div>
                </div>
                <div className={`cart-item-remove`}
                     onClick={() => handleRemove(cart.product.id)}>
                    <img alt={"ProductImage"}
                         src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC"/>
                </div>
            </div>
        </div>
    </div>
}