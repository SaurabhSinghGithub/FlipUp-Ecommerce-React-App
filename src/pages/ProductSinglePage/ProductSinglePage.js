import React, { useEffect, useState } from 'react'
import "./ProductSinglePage.scss"
import { useParams } from 'react-router-dom'
import { fetchAsyncProductSingle, getProductSingle, getSingleProductStatus } from '../../store/slices/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'
import Images from '../../components/Images/Images'
import { FormatPrice } from '../../utils/helpers'
import { STATUS } from '../../utils/status'
import Loader from '../../components/Loader/Loader'
import { addToCart, getCartMessageStatus, setCartMessageOff, setCartMessageOn } from '../../store/slices/cartSlice'
import CartMessage from '../../components/CartMessage/CartMessage'

const ProductSinglePage = () => {

    const [quantity, setQuantity] = useState(1)

    const { id } = useParams();
    const dispatch = useDispatch();
    const ProductSingle = useSelector(getProductSingle)
    const productSingleStatus = useSelector(getSingleProductStatus)
    const cartMessageStatus = useSelector(getCartMessageStatus);

    useEffect(() => {
        dispatch(fetchAsyncProductSingle(id))

        if (cartMessageStatus) {
            setTimeout(() => {
                dispatch(setCartMessageOff())
            }, 2000);
        }
    }, [cartMessageStatus])

    let discountedPrice = (ProductSingle?.price) - (ProductSingle?.price * (ProductSingle?.discountPercentage / 100));

    if (productSingleStatus === STATUS.LOADING) {
        return <Loader />
    }

    const increaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty + 1;
            if (tempQty > ProductSingle?.stock) tempQty = ProductSingle?.stock;
            return tempQty;
        })
    }

    const decreaseQty = () => {
        setQuantity((prevQty) => {
            let tempQty = prevQty - 1;
            if (tempQty < 1) tempQty = 1;
            return tempQty;
        })
    }

    const cartHandler = (ProductSingle) => {

        let discountedPrice = (ProductSingle?.price) - (ProductSingle?.price * (ProductSingle?.discountPercentage / 100));
        let totalPrice = quantity * discountedPrice;

        dispatch(addToCart({ ...ProductSingle, discountedPrice, totalPrice, quantity: quantity }))

        dispatch(setCartMessageOn());

    }


    return (
        <div className='container'>
            <div className='ProductSingle'>
                <Images imgs={ProductSingle.images} />

                <div className="ProductSingleContent">

                    <div className="ProductSingleTitle">
                        <h1>{ProductSingle.title}</h1>
                    </div>
                    <div className="ProductSingleDescription">
                        <p>{ProductSingle.description}</p>
                    </div>
                    <div className="ProductSingleInfo">
                        <p>Rating: <span>{ProductSingle.rating}</span></p>
                        <hr className='line' />
                        <p>Brand: <span>{ProductSingle.brand}</span></p>
                        <hr className='line' />
                        <p>Category: <span>{ProductSingle.category ? ProductSingle.category.replace("-", " ") : ""}</span></p>
                    </div>
                    <div className="ProductSinglePrice">
                        <div className="ProductSingleDiscountPrice">
                            <del> <FormatPrice price={ProductSingle.price} /></del>
                            <span>Inclusive of all taxes</span>
                        </div>
                        <div className="ProductSinglefinalPrice">
                            <FormatPrice price={discountedPrice} />
                            <span>{ProductSingle.discountPercentage}% OFF</span>
                        </div>
                    </div>
                    <div className="ProductSingleQuantity">
                        <h3 className='Quantity'>Quantity:</h3>

                        <button onClick={() => decreaseQty()}>
                            <i className='fas fa-minus'></i>
                        </button>

                        <p>{quantity}</p>

                        <button onClick={() => increaseQty()}>
                            <i className='fas fa-plus'></i>
                        </button>

                        {
                            ProductSingle?.stock === 0 ? <div className='stock'> out of stock </div> : ""
                        }
                    </div>
                    <div className="ProductSingleCartButton">
                        <button onClick={() => cartHandler(ProductSingle)}>
                            <i className='fas fa-shopping-cart'></i>
                            <span>Add to Cart</span>
                        </button>
                    </div>
                </div>

            </div>

            {cartMessageStatus && <CartMessage />}
        </div>
    )
}

export default ProductSinglePage;