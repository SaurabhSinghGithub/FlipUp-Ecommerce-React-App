import React from 'react'
import "./Header.scss"
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Header = () => {
  return (

    <header>
      <div className='container'>
        <div className="header-top">
          <div className="header-top-left">
            <li>
              <Link to="/sellerinfo">
                <span>Seller Info</span>
              </Link>
            </li>
            <div className="line"></div>
            <li>
              <Link to="/download">
                <span>Download</span>
              </Link>
            </li>
            <div className="line"></div>
            <li>
              <div className="follow">
                <span>Follow Us</span>
                <div className="icons">
                  <Link to="/facebook">
                    <i className='fab fa-facebook'></i>
                  </Link>
                  <Link to="/instagram">
                    <i className='fab fa-instagram'></i>
                  </Link>
                </div>
              </div>
            </li>
          </div>
          <div className="header-top-right">
            <li>
              <Link to="/Support">
                <div className="support">
                  <i className='fa-solid fa-circle-question'></i>
                  <span>Support</span>
                </div>
              </Link>
            </li>
            <div className="line"></div>
            <li>
              <Link to="/Register">
                <span>Register</span>
              </Link>
            </li>      <div className="line"></div>
            <li>
              <Link to="/login">
                <span>Log in</span>
              </Link>
            </li>
          </div>
        </div>
        <hr />
        <Navbar />
      </div>
    </header>

  )
}

export default Header;