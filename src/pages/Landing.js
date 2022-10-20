import React from 'react'

import main from "../assets/images/main.svg"
import Wrapper from "../assets/wrappers/LandingPage"
import {Logo} from '../components'
import { Link } from "react-router-dom"


function Landing() {
  return (
    <Wrapper>
        <nav>
           <Logo/>
        </nav>

        <div className="container page">

            <div className="info">
            <h1> job <span>tracking</span> app</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, porro. Quos pariatur nobis modi dolore libero rem unde delectus ab!</p>
            <Link to="/register" className="btn btn-hero"> Login/Register</Link>
            </div>
            <img src={main} alt="Job hunt" className="img main-img"/>
        </div>

        
    </Wrapper>
  )
}



export default Landing