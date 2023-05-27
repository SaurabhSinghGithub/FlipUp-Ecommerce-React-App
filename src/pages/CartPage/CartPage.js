import React, { useEffect } from 'react'
import "./CartPage.scss"
import { useSelector, useDispatch } from 'react-redux'
import { getAllCarts, toggleCartQty, removeSingleCart, clearCart, getCartTotal, getItemsCount, getTotalAmount } from '../../store/slices/cartSlice'
import { FormatPrice } from '../../utils/helpers'
import { shopping_cart } from '../../utils/images'
import { Link } from 'react-router-dom'

const CartPage = () => {

  const cartItems = useSelector(getAllCarts)
  const dispatch = useDispatch()
  const TotalItemsCount = useSelector(getItemsCount)
  const totalAmount = useSelector(getTotalAmount)

  if (cartItems.length === 0) {
    return (
      <div className="no-cart-products">
        <img src={shopping_cart} alt="" />
        <h1>Your shopping cart is empty.</h1>
        <Link to="/">
          <button>  Continue Shopping</button>
        </Link>
      </div>
    )
  }

  return (

    <div className="container">
      <div className="cart">
        <div className="cart-row">

          <div className="cart-col hide">
            <h1>S.N.</h1>
          </div>
          <div className="cart-col">
            <h1>Product</h1>
          </div>
          <div className="cart-col hide">
            <h1>Unit Price</h1>
          </div>
          <div className="cart-col">
            <h1>Quantity</h1>
          </div>
          <div className="cart-col">
            <h1>Total Price</h1>
          </div>
          <div className="cart-col">
            <h1>Actions</h1>
          </div>
        </div>

        {
          cartItems.map((item, index) => {

            return (
              <div key={index} className="cart-row">
                <div className="cart-col hide">
                  <h1>{index + 1}</h1>
                </div>
                <div className="cart-col">
                  <h1>{item.title}</h1>
                </div>
                <div className="cart-col hide">
                  <h1> <FormatPrice price={item.discountedPrice} /></h1>
                </div>
                <div className="cart-col quantity">

                  <button onClick={() => dispatch(toggleCartQty({ id: item.id, type: "DEC" }))} className='minus'><i className='fas fa-minus'></i></button>
                  <hr />
                  <h3>{item.quantity}</h3>
                  <hr />
                  <button onClick={() => dispatch(toggleCartQty({ id: item.id, type: "INC" }))} className='plus'><i className='fas fa-plus'></i></button>
                </div>
                <div className="cart-col">
                  <h1> <FormatPrice price={item.totalPrice} /></h1>
                </div>
                <div className="cart-col delete">
                  <button className='buttonSecondary' onClick={() => dispatch(removeSingleCart(item.id))}>
                    Delete
                  </button>
                </div>
              </div>
            )

          })
        }

        <div className="cart-row-2">
          <div className="clear">
            <button className='buttonPrimary' onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>
          <div className="checkout">
            <h1>Total ({TotalItemsCount}) items: <FormatPrice price={totalAmount} /></h1>
            <button className='buttonPrimary'>Check Out</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartPage