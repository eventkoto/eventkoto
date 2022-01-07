import { Link } from "react-router-dom";
import { useState } from "react"
import { FireAuth } from "../../libs/firebase/auth";

const Rightside = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  function login(){
    FireAuth.loginUser(email, pass)
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
        <br />
        <button className="btnPrimary" onClick={login}>Sign-in</button>
      </div>
      
      <div className="">
        <p className="parag"> Don't have an account yet? </p>
        <Link to="/create" className="paraga">
          <b> Sign up now</b>
        </Link>
      </div>
      <div className="">
        <p className="parag"> Forget password?</p>
        <a href="/" className="paraga">
          <b> Click here</b>
        </a>
      </div>
    </>
  );
};

export default Rightside;
