import { useState } from 'react';
import { login, useAuth, logout } from "../auth";

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (e)=>{
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(token => {
        if (token.access_token){
	  login(token)
          console.log(token)
        }
        else {
          alert("Please type in correct username/password!")
        }
      })
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }

const [logged] = useAuth();

  return (
    <div>
      <h2>Login</h2>
      {!logged?
      <form action="#">
        <div>
          <input type="text"
            placeholder="Username"
            onChange={onChangeUsername}
            value={username}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={onChangePassword}
            value={password}
          />
        </div>
        <button onClick={onLogin} type="submit">
          Login
        </button>
      </form>
      :
      <div>
        <h2>Welcome to {username}!</h2>
        <button onClick={() => logout()}>Logout</button>
      </div>
     }
    </div>
  )
}

export default Login;
