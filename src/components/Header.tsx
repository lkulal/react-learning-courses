import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"
import '../css/Header.css';

//importing images
import logo from '../images/logo.png';
import cart from '../images/Cart.svg';
import profile from '../images/profile.svg';
import headerBackground from '../images/header-mask-bg.png';

const Header = () =>{

    const location = useLocation();
    const path = location.pathname;

    return (
        <header>
            <nav>
                <Link to='courses'>
                    <img className="desktop" id="logo" src={logo} alt="HashedIn Logo"/>
                </Link>
                <ul>
                    <li className={`nav-item ${path=='/courses'?'active':''}`}>
                        <Link to='courses'>Courses</Link>
                    </li>
                    <li className={`nav-item ${path=='/wishlist'?'active':''}`}>
                        <Link to='wishlist'>Wishlist</Link>
                    </li>
                    <li className="nav-item">
                        <Link to='cart'>
                            <img src={cart} alt="Cart Image" />
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='profile'>
                            <img src={profile} alt="Profile Image"/>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="header-img">
                <img src={headerBackground} alt=""/>
                {
                    location.pathname=='/courses'?<span>Discover Latest Courses on<br/>React</span>:
                    location.pathname=='/wishlist'?<span>Wishlist</span>:
                    location.pathname=='/cart'?<span>Shopping Cart</span>:
                    location.pathname=='/profile'?<span>My Profile</span>:<span>Course Details</span>
                }
            </div>

        </header>
    );
}

export default Header;