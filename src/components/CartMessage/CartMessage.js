import React from 'react'
import "./CartMessage.scss"
import { correct } from '../../utils/images'

const CartMessage = () => {
  return (
    <div className="container">
      <div className='cart-message'>
        <img src={correct} alt="" />
        <h1>Items having added to your shopping cart</h1>
      </div>
    </div>
  )
}

export default CartMessage;