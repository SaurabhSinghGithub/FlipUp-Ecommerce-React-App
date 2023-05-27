import React, { useEffect } from 'react'
import "./CategoryProductPage.scss"
import { fetchAsyncProductsOfCategory, getAllProductsByCategory, getCategoryProductsStatus } from '../../store/slices/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { STATUS } from '../../utils/status'
import ProductList from '../../components/ProductList/ProductList'

const CategoryProductPage = () => {

  const dispatch = useDispatch()
  const { category } = useParams();
  const productsByCategory = useSelector(getAllProductsByCategory);
  const productsByCategoryStatus = useSelector(getCategoryProductsStatus);


  useEffect(() => {

    dispatch(fetchAsyncProductsOfCategory(category))

  }, [category])

  if (productsByCategoryStatus === STATUS.LOADING) {

    return <Loader />

  }

  return (
    <div className='container'>

      <div className="title">
        <h3>See Our {category.replace("-", " ")}</h3>
      </div>
      <ProductList products={productsByCategory} />

    </div>
  )
}

export default CategoryProductPage;