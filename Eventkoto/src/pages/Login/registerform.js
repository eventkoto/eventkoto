import { Link } from "react-router-dom";
import useStyles from "./styles";
import Input from "./input-register";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FireAuth } from "../../libs/firebase/auth";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [program, setProgram] = useState("");
  const [org, setOrg] = useState("");
  const [sid, setSid] = useState(""); // Student Id
  
  const [logging, setLogging] = useState(false)
  const [error, setError] = useState(false)


  function signup() {
    

    let data = FireAuth.data.accountData.viewer(
      name,
      email,
      program,
      org,
      sid,
    )

    if ([name, email, program, org, sid].some((e) => {return(e===undefined || e===false || e.length === 0)}))
      return setError("Incomplete Sign Up Information")

    if (pass.length === 0)
      return setError("No Password Provided")

    setLogging(true)
    setError(false)

    FireAuth.registerUser(email, pass, data, (res) => {
      //console.log(res.code)
      //console.log(res.message)
      
      setLogging(false)
      //console.log(res.code)
      switch(res.code){
        case 'auth/invalid-email':
          setError("Invalid Email")
          break
        default:
          setError(res.message)
          break
      }
    });
  }

  function signupAuthor() {
    let data = FireAuth.data.accountData.orgs(
      name,
      email,
      program,
      org,
      sid,
    )

    if ([name, email, program, org, sid].some((e) => {return(e===undefined || e===false || e.length === 0)}))
      return setError("Incomplete Sign Up Information")

    if (pass.length === 0)
      return setError("No Password Provided")

    setLogging(true)
    setError(false)

    FireAuth.registerUser(email, pass, data, (res) => {
      //console.log(res.code)
      //console.log(res.message)
      
      setLogging(false)
      //console.log(res.code)
      switch(res.code){
        case 'auth/invalid-email':
          setError("Invalid Email")
          break
        default:
          setError(res.message)
          break
      }
    });
  }

  //function _handleKeyDown(e) {
  //  if (e.key === 'Enter') {
  //    signup()
  //  }
  //}

  return (
    <>
      <h2> Register </h2>
      <span> Please Fill up the Form </span>
      <div className="">
        <input
          className="inputText"
          placeholder="Student ID"
          type="text"
          value={sid}
          onChange={(e) => setSid(e.target.value)}
          required
        />
        <input
          className="inputText"
          placeholder="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="inputText"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="inputText"
          placeholder="Program"
          type="text"
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          required
        />
        <input
          className="inputText"
          placeholder="Organization"
          type="text"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          required
        />
        <input
          className="inputText"
          placeholder="Password"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
        />
        {
          error && <p className="text-red-600 p-1">{error}</p>
        }
        {
          logging
          ?
          <div className="w-3 h-3 bg-red-600 animate-pulse mx-auto m-5"></div>
          :
          <>
            <button className="btnPrimary" onClick={signup}>
              Sign-up
            </button>
            <button className="btnPrimary" onClick={signupAuthor}>
              Sign-up As An Organization
            </button>
          </>
        }
        
      </div>

      <span id="parag"> Already Have an Account? </span>
      <Link to="/" className="paraga">
        <b> Sign In</b>
      </Link>
      <br />
    </>
  );
};

export default RegisterForm;
