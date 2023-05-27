import React from 'react'
import { useState } from 'react'
import "./Images.scss"

const Images = ({ imgs = [] }) => {

    const [Img, setImg] = useState(imgs[0])

    return (
        <div className="ProductSingleImages">
            <div className="mainImage">
                <img src={Img ? Img : imgs[0]} alt="" />
            </div>
            <div className="multiImage">
                {imgs.map((curElem, index) => {

                    return <img key={index} src={curElem} alt="" onClick={() => setImg(curElem)} />

                })}
            </div>
        </div>
    )
}

export default Images