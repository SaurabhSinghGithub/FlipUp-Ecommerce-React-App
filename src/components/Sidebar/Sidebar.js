import React from 'react'
import "./Sidebar.scss"
import { setnavbarClose } from '../../store/slices/sidebarSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getSidebarStatus } from '../../store/slices/sidebarSlice'
import { getAllCategories } from '../../store/slices/categorySlice'
import { fetchAsyncCategories } from '../../store/slices/categorySlice'
import { useEffect } from "react"
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const navValue = useSelector(getSidebarStatus)
  const categories = useSelector(getAllCategories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAsyncCategories())
  }, [])


  return (
    // <div className="sidebar active">
    <div className={navValue ? "sidebar active" : "sidebar"}>
      <div className="side">
        <h1>ALL CATEGORIES</h1>
        <button onClick={() => dispatch(setnavbarClose())}> <i className='fas fa-times'></i></button>
      </div>
      <div className="categories">

        {categories.map((category, index) => {
          return <div key={index} className='category'>
            <li onClick={() => dispatch(setnavbarClose())}>
              <Link className='categoryItem' to={`category/${category}`}>{category.replace("-", " ")}</Link>
            </li>
            <hr />
          </div>
        })}


      </div>
    </div>
  )
}

export default Sidebar