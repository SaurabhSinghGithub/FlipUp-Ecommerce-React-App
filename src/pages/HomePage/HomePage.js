import React, { useEffect } from 'react';
import "./HomePage.scss";
import HeaderSlider from '../../components/Slider/HeaderSlider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/slices/ProductSlice';
import { getAllCategories } from '../../store/slices/categorySlice';
import { STATUS } from '../../utils/status';
import ProductList from '../../components/ProductList/ProductList';
import Loader from '../../components/Loader/Loader';


const HomePage = () => {
  const dispatch = useDispatch()

  const categories = useSelector(getAllCategories)
  const products = useSelector(getAllProducts)
  const productStatus = useSelector(getAllProductsStatus)

  useEffect(() => {
    dispatch(fetchAsyncProducts(50))
  }, [])

  const tempProducts = [];

  if (products.length > 0) {

    products.forEach((product, index) => {

      let randomIndex = Math.floor(Math.random() * products.length)

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length)
      }

      tempProducts[index] = products[randomIndex];

    });
  }

  let catProductsOne = products.filter(product => product.category === categories[0]);
  let catProductsTwo = products.filter(product => product.category === categories[1]);
  let catProductsThree = products.filter(product => product.category === categories[2]);
  let catProductsFour = products.filter(product => product.category === categories[3]);



  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      <div className="main-content">
        <div className="container">
          <div className="categories">

            <div className="categories-item">
              <div className="title">
                <h3>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
            </div>

            <div className="categories-item">
              <div className="title">
                <h3>{categories[0]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>

            <div className="categories-item">
              <div className="title">
                <h3>{categories[1]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>

            <div className="categories-item">
              <div className="title">
                <h3>{categories[2]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>

            <div className="categories-item">
              <div className="title">
                <h3>{categories[3]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage;