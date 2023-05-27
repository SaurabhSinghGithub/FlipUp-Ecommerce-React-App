import React from 'react'
import "./CartModal.scss"
import { FormatPrice } from '../../utils/helpers'
import { shopping_cart } from '../../utils/images'

const CartModal = ({ carts }) => {

    return (
        <div className='container'>
            <div className="display-cart">

                <h1>Recently Added Products</h1>

                {
                    (carts.length > 0) ? (
                        <div className="xxx">
                            {carts.map((cartItem, index) => {
                                const { title, discountedPrice, images } = cartItem;
                                return (
                                    <div key={index} className="cart-display-item">
                                        <div className="left">
                                            <img src={images[0]} alt="" />
                                            <p>{title}</p>
                                        </div>
                                        <div className="right">
                                            <p><FormatPrice price={discountedPrice} /></p>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="display-btn">
                                <button>View Shoppint cart</button>
                            </div>

                        </div>
                    ) : (
                        <div className="no-products">
                            <img src={shopping_cart} alt="" />
                            <h6>No products yet</h6>
                        </div>
                    )
                }



            </div>

        </div>
    )
}

export default CartModal;