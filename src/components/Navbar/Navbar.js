import React from 'react'
import { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { setnavbarOpen } from '../../store/slices/sidebarSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from '../../store/slices/categorySlice'
import { getCartTotal, getAllCarts, getItemsCount } from '../../store/slices/cartSlice'
import CartModal from '../CartModal/CartModal'

const Navbar = () => {

    const [text, settext] = useState("")

    const dispatch = useDispatch();
    const categories = useSelector(getAllCategories)
    const cartTotalItems = useSelector(getItemsCount)
    const carts = useSelector(getAllCarts)

    const handleSearchTerm = (e) => {
        e.preventDefault();
        settext(e.target.value);
    }


    useEffect(() => {

        dispatch(getCartTotal())
    }, [carts])



    return (
        <nav>
            <div className="left-nav">
                <button className='bar' onClick={() => dispatch(setnavbarOpen())}>
                    <i className='fas fa-bars'></i>
                </button>

                <Link to="/" className="logo">
                    <button className='shop'>
                        <i className='fa-solid fa-bag-shopping'></i>
                    </button>

                    <div className="webname">
                        <span>Flip</span>Up.
                    </div>

                </Link>

            </div>
            <div className="search">
                <div className="input">

                    <input type="text" name="" id="" placeholder='Search your required items here' value={text} onChange={(e) => handleSearchTerm(e)} />

                    <Link to={`/search/${text}`}>
                        <div className="search-icon">
                            <i className='fa-solid fa-magnifying-glass'></i>
                        </div>
                    </Link>
                </div>
                <div className="categories">

                    {categories.slice(0, 8).map((category, index) => {
                        return <Link key={index} to={`category/${category}`}><span>{category.replace("-", " ")}</span></Link>
                    })}

                </div>

            </div>
            <div className="right-nav">
                <Link to="/cart" className='cart-btn'>
                    <div className=' cart-btn-icon'>
                        <i className='fa-solid fa-cart-shopping cart-icon'>
                        </i>
                        <div className='cartTotalItems'>{cartTotalItems}</div>
                    </div>
                    <CartModal carts={carts} />
                </Link>
            </div>

        </nav>
    )
}

export default Navbar