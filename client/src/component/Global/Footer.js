import React from 'react'
import './Footer.css'
import { GoMarkGithub } from "react-icons/go";
import { AiTwotoneMail } from "react-icons/ai";
import { SiGoogledrive } from "react-icons/si";
import { SiNotion } from "react-icons/si";

const Footer = () => {
    return (
        <div className='FooterContainer'>
            <div className='footericons'>
                <GoMarkGithub className='icon' size={50} color="white" href="https://github.com/BlockChainProject4/BlockExplorer4.git"/> 
                <AiTwotoneMail className='icon' size={50} color="white"/>
                <SiGoogledrive className='icon' size={50} color="white"/>
                <SiNotion className='icon' size={50} color="white"/>
            </div>
            <div className='footertext'>
                <b>@ 2022 BlockChain. Explore. Good</b>
            </div>
        </div>
    )
}

export default Footer