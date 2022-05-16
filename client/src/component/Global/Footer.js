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
                <a href="https://github.com/BlockChainProject4/BlockExplorer4">
                    <GoMarkGithub className='icon' size={50} color="white" /> 
                </a>
                <a href=''>
                    <AiTwotoneMail className='icon' size={50} color="white"/>
                </a>
                <a href='https://docs.google.com/spreadsheets/d/1QRMdZx5hmdrHyuGeQrMnQL9oViOkSFjzAdwR6ssaXW8/edit?usp=sharing'>
                    <SiGoogledrive className='icon' size={50} color="white"/>
                </a>
                <a href='https://aluminum-alder-da8.notion.site/bd6f99e4052e4677848d335fdadd28ea?v=6965b00a228d42afabc63bf4999bd8e4'>
                    <SiNotion className='icon' size={50} color="white"/>
                </a>
            </div>
            <div className='footertext'>
                <b>@ 2022 BlockChain. Explore. Good</b>
            </div>
        </div>
    )
}

export default Footer