import { Link } from "react-router-dom";
import { useState } from "react"
import { FireAuth } from "../../libs/firebase/auth";

const Rightside = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [logging, setLogging] = useState(false)
  const [error, setError] = useState(false)

  function login(){
    setLogging(true)
    setError(false)
    FireAuth.loginUser(email, pass, (res) => {
      //console.log(res.code)
      //console.log(res.message)
      
      setLogging(false)
      setError(res.message)
    })
  }

  function _handleKeyDown(e) {
    if (e.key === 'Enter') {
      login()
    }
  }

  return (
    <>
      <p> Welcome to </p>
      <h2> EVENTKOTO </h2>
      <span>
        {" "}
        Log in to get in the moment updates on the <br />
        events around you.{" "}
      </span>
      <div className="">
        <input
          className="inputText"
          placeholder="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className="inputText"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={_handleKeyDown}
          required
        />
        {
          error && <p className="text-red-600 p-1">Wrong Email or Password</p>
        }
        {
          logging
          ?
          <div className="w-3 h-3 bg-red-600 animate-pulse mx-auto m-5"></div>
          :
          <button className="btnPrimary" onClick={login}>Sign-in</button>
        }
      </div>
      
      <div className="">
        <p className="parag"> Don't have an account yet? </p>
        <Link to="/create" className="paraga">
          <b> Sign up now</b>
        </Link>
      </div>
      <div className="">
        <p className="parag"> Forget password?</p>
        <Link to="/forgot" className="paraga">
          <b> Click here</b>
        </Link>
      </div>
    </>
  );
};

export default Rightside;
