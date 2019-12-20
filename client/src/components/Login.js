import React, { useRef } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const Login = (props)=> {
  // e.preventDefault();
  const usernameRef = useRef('');
  const passwordRef =useRef('');
  const Submit = e =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', {
    username: usernameRef.current.value,
    password: passwordRef.current.value

})
  .then(res=>{
    localStorage.setItem('token', res.data.payload)
    props.history.push('/bubble');
  })
  .catch(er=>{
    alert(er.message);
  })

  }
  

  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
    return(
      <div>
          <div className='marginRight'>
          <Link to= '/friends'>Friends</Link>
          </div>
        <form > 
          <label>Username:
              <span>
              <input type='text' ref ={usernameRef} />
              </span>
          </label>
          <br/>
          <label>Password:
              <span>
              <input type='text' ref={passwordRef}/>
              </span>
          </label>
          <br/>
          
          <button onClick={Submit}>Login</button>
        </form>
      </div>
  )
};

export default Login;
