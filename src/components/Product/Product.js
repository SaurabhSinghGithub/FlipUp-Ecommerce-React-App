import React from 'react'
import "./Product.scss"
import { Link } from 'react-router-dom'
import { FormatPrice } from '../../utils/helpers'

const Product = ({ product }) => {
    return (
        <Link to={`/product/${product?.id}`} key={product?.id}>

            <div className="card">
                <div className="card-category">
                    <span>{product?.category}</span>
                </div>
                <div className="card-image">
                    <img src={product?.images[0]} alt="" />
                </div>
                <div className="card-text">
                    <h2 className='brand'>Brand: {product?.brand}</h2>
                    <h3 className='card-title'>{product?.title}</h3>
                    <div className="price">
                        <span className='discount-price'>
                            <del> <FormatPrice price={product?.price} /></del>
                        </span>
                        <span className='final-price'>
                            <FormatPrice price={product?.discountedPrice} />
                        </span>
                        <span>({product?.discountPercentage}% off)</span>
                    </div>
                </div>
            </div>

        </Link>
    )
}

export default Product