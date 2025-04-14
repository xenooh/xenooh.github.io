import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RiMenuFill, RiCloseFill, RiInstagramFill, RiTwitterXLine, RiKakaoTalkFill, RiFacebookBoxFill } from "react-icons/ri";
import classNames from 'classnames';

const Header = ({ navItems, socialLinks }) => {
    const [isMobileNav, setIsMobileNav] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNav(!isMobileNav);
    }

    useEffect(() => {
        const body = document.body;
        if (isMobileNav) {
            body.classList.add("mobile-nav-active");
        } else {
            body.classList.remove("mobile-nav-active");
        }
    }, [isMobileNav]);

    return (
        <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="header-container 
                            container-fluid 
                            container-xl 
                            position-relative 
                            d-flex
                            align-items-center
                            justify-content-between">

                <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                    <h1 className="sitename">xeno Blog</h1>
                </Link>
                <nav id="navmenu" className={classNames("navmenu", { "navmenu-acitve": isMobileNav })}>
                    <ul>
                        {
                            navItems.map((item, idx) => (
                                <li key={idx}>
                                    <Link to={item.link}>{item.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                    {
                        isMobileNav ? <RiCloseFill className="mobile-nav-toggle d-xl-none bi" onClick={toggleMobileNav}
                            style={{ cursor: "pointer" }} />
                            : <RiMenuFill className="mobile-nav-toggle d-xl-none bi" onClick={toggleMobileNav}
                                style={{ cursor: "pointer" }} />
                    }
                </nav>
                <div className="header-social-links">
                    <a href={socialLinks.kakao}><RiKakaoTalkFill /></a>
                    <a href={socialLinks.twitter}><RiTwitterXLine /></a>
                    <a href={socialLinks.instagram}><RiInstagramFill /></a>
                    <a href={socialLinks.facebook}><RiFacebookBoxFill /></a>
                </div>

            </div>

        </header>
    )
}

export default Header