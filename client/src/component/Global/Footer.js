import React from 'react'
import './Footer.css'
import { GoMarkGithub } from "react-icons/go";
import { AiTwotoneMail } from "react-icons/ai";

const Footer = () => {
    return (
        <div className='FooterContainer'>
            <div>
                <p>4조</p>
                <p>이혜인 변정현 박태현</p>
            </div>
            <div>
            </div>
            <div className='footericons'>
                <GoMarkGithub className='giticon' size={30} color="black" href="https://github.com/BlockChainProject4/BlockExplorer4.git"/> <br></br>
                <AiTwotoneMail className='emailicon' size={30} color="black"/>
            </div>
        </div>
    )
}

export default Footer