import React, { useEffect, useRef} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
      if(localStorage.getItem("token")){
      // onValidateToken();
      }
    },[]);
  
    let onValidateToken= async()=>{
    let dataToSend = new FormData();
     
     dataToSend.append("token",localStorage.getItem("token"));
    
     let reqOptions = {
      method:"POST",
      body:dataToSend,
     
     }
     
     let JSONData = await fetch("http://localhost:2222/validateToken",reqOptions);
     let JSOData = await JSONData.json();
     alert(JSOData.msg)
     console.log(JSOData);
     if(JSOData.status === "Success"){
     
      navigate("/dashboard")
      dispatch({type:"login",data:JSOData.data})
     }
    }

    let onLogin = async()=>{
    let dataToSend = new FormData();
     
     dataToSend.append("email",emailInputRef.current.value);
     dataToSend.append("password",passwordInputRef.current.value);


     let reqOptions = {
      method:"POST",
      body:dataToSend,
     
     }
     
     let JSONData = await fetch("http://localhost:2222/login",reqOptions);
     let JSOData = await JSONData.json();
     alert(JSOData.msg)
     console.log(JSOData);
     if(JSOData.status === "Success"){
     localStorage.setItem("token",JSOData.data.token);
     
      navigate("/dashboard")
      dispatch({type:"login",data:JSOData.data})
     }
    }
  return (
    <div>
      <form>
        <h2>Login Form</h2>
    
         <div>
            <label>Email</label>
            <input ref={emailInputRef}></input>
        </div>
         <div>
            <label>Password</label>
            <input ref={passwordInputRef}></input>
        </div>
        
         <div>
            <button type='button' onClick={()=>{
           onLogin();
            }}>Click here</button>
        </div>
      </form>
      <br></br>
      <br></br>
      <br></br>
      <Link to={"/signup"}>signup</Link>
      

    </div>
  )
}

export default Login
