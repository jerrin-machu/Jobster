import React from 'react'
import { useState, useEffect } from 'react';
import { FormRow, Logo } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import {toast} from "react-toastify"
import { useSelector, useDispatch} from 'react-redux'
import { loginUser, registerUser} from "../features/user/userSlice"
import { useNavigate } from "react-router-dom"
// import styled from 'styled-components';

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
}

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading,user} = useSelector((store)=> store.user)
  const [ values, setValues] = useState(initialState)


  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate("/")
      }, 3000);
    }
  
   
  }, [user])
  

  const handleChange = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`)
    setValues({ ...values, [name] : value })
  }

  const toggleMember = () => {
    setValues({...values, isMember: !values.isMember})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values;
    if(!email || !password || (!isMember && !name)){
      toast.error('Please Fill out All fields');
      return;
    }

    if(isMember){
      dispatch(loginUser({ email:email, password: password }))
      return;
    }

    dispatch(registerUser({name,email,password}))
  }
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
          <Logo/>
          

         <h3> { values.isMember ? 'Login' : 'Register'} </h3>
         
        { !values.isMember && <FormRow type="text" name="name" value={values.name} handleChange={handleChange}/> }
          
          <FormRow type="email"name="email" value={values.email} handleChange={handleChange}/>
          <FormRow type="password" name="password" value={values.password} handleChange={handleChange}/>
          <p> { values.isMember ? 'Not a member yet ?' :'Already a member'}

          <button type='button' onClick={toggleMember} className="member-btn"> { values.isMember ? 'Register':'Login'}</button></p>
          <button type='submit' className='btn btn-block' disabled = {isLoading}> { isLoading ? 'Loading...' : 'Submit'}</button> 
          <button
  type="button"
  className="btn btn-block btn-hipster"
  disabled={isLoading}
  onClick={() => {
    dispatch(loginUser({ email: "testUser@test.com", password: "secret" }));
  }}
>
  {isLoading ? "loading..." : "demo"}
</button>
      </form>
    </Wrapper>
  )
}


// const Wrapper = styled.section `
//   display: grid;
//   align-items: center;
//   .logo {
//     display: block;
//     margin: 0 auto;
//     margin-bottom: 1.38rem;
//   }

//   .form {
//     max-width: 400px;
//     border-top: 5px solid var(--primary-500)
//   }

//   h3 {
//     text-align: center;
//   }

//   p {
//     margin : 0;
//     margin-top: 1rem;
//     text-align: center;
//   }

//   .btn {
//     margin-top: 1rem;
//   }
// `
export default Register