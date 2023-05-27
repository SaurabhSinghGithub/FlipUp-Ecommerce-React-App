import React, { useEffect } from 'react'
import "./SearchPage.scss"
import ProductList from '../../components/ProductList/ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAsyncSearchProduct, getSearchProducts, setSearchTerm, getSearchProductsStatus, clearSearch } from '../../store/slices/searchSlice'
import { useParams } from 'react-router-dom'
import { STATUS } from '../../utils/status'
import Loader from '../../components/Loader/Loader'

const SearchPage = () => {

    const dispatch = useDispatch();
    const { searchTerm } = useParams()
    const searchProducts = useSelector(getSearchProducts);
    const searchProductsStatus = useSelector(getSearchProductsStatus);

    useEffect(() => {

        dispatch(clearSearch());
        dispatch(fetchAsyncSearchProduct(searchTerm))

    }, [searchTerm])

    if (searchProducts.length === 0) {
        return (
            <div className='container'>
                <div className='title'>
                    <h3>No Products found.</h3>
                </div>
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='title'>
                <h3>Search results:</h3>
            </div>
            {
                searchProductsStatus === STATUS.LOADING ? <Loader /> :
                    <ProductList products={searchProducts} />
            }
        </div>
    )
}

export default SearchPage;