import React from 'react'
import "./Footer.scss"

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className="footer-content">
          <div className="footer-top">
            <span>PRIVACY POLICY</span>
            <div className="line"></div>
            <span>TERM OF SERVICE</span>
            <div className="line"></div>
            <span>ABOUT FLIPUP.</span>
          </div>
          <div className="footer-bottom">
            <span>© 2022 FlipUp. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;