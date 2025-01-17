import React from 'react';
import '../../../styles/components/layouts/staticFooter.css';
import logo from '../../../assets/images/Logo3.png';
import { Link, NavLink } from 'react-router-dom';

const currentYear = new Date().getFullYear();

function StaticFooter() {
    return (
        <div className='static-footer'>
            <footer>
                <div className='footer-install-banner'>
                    <h2>Try SportTrackr for free!</h2>
                    <div>
                        <a className='btn b-gray'>Install Our App</a>
                        <Link to="" className='btn b-gray'>Create an account</Link>
                    </div>
                </div>
                <div className="static-footer-wrapper">
                    <div className="static-footer-image">
                        <img src={logo} alt="SportTrackr Logo"/>
                        <h1>SportTrackr</h1>
                    </div>

                    <div className="static-footer-link">
                        <NavLink activeClassName="is-active" to={"/"}>Home</NavLink>
                        <NavLink activeClassName="is-active" to={"/about-us"}>About Us</NavLink>
                        <NavLink activeClassName="is-active" to={"/login"}>Login</NavLink>
                        <NavLink activeClassName="is-active" to={"/register"}>Register</NavLink>
                        <NavLink activeClassName="is-active" to={"/privacy-policy"}>Privacy Policy</NavLink>
                        <NavLink activeClassName="is-active" to={"/terms-and-conditions"}>Terms & Conditions</NavLink>
                    </div>
                </div>

                <div className="footer-right">
                    <div className="follow-us">
                        <h2>Follow Us:</h2>
                    </div>

                    <div className="social-media-links">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Facebook">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Instagram">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"
                           aria-label="Twitter">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer"
                           aria-label="YouTube">
                            <i className="fa-brands fa-youtube"></i>
                        </a>
                    </div>
                </div>
            </footer>
            <div className='copyright-footer'>
                <h4>© SportTrackr {currentYear}</h4>
            </div>
        </div>
    )
        ;
}

export default StaticFooter;
