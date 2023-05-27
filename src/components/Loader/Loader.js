import React from 'react'
import "./Loader.scss"
import { loader2 } from '../../utils/images'

const Loader = () => {
  return (
    <div className="container">
      <div className="loader">
        <img src={loader2} alt="" />
      </div>
    </div>
  )
}

export default Loader