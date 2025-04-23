import React from 'react'
import { RiInstagramFill, RiTwitterXLine, RiKakaoTalkFill, RiFacebookBoxFill } from "react-icons/ri";

const Footer = ({ socialLinks }) => {
    return (
        <footer id="footer" className="footer">

            <div className="container">
                <div className="copyright text-center ">
                    <p>&copy; <span>Copyright</span>
                        <strong className="px-1 sitename">xeno</strong> <span>All Rights Reserved</span>
                    </p>
                </div>
                <div className="social-links d-flex justify-content-center">
                    <a href={socialLinks.kakao} target="_blank" rel="noopener noreferrer" ><RiKakaoTalkFill /></a>
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" ><RiTwitterXLine /></a>
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" ><RiInstagramFill /></a>
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" ><RiFacebookBoxFill /></a>
                </div>
            </div>

        </footer>
    )
}

export default Footer