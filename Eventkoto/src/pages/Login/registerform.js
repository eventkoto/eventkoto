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

  function signup() {
    let data = FireAuth.data.accountData.viewer(
      name,
      email,
      program,
      org,
      sid,
    )
    FireAuth.registerUser(email, pass, data);
  }

  function _handleKeyDown(e) {
    if (e.key === 'Enter') {
      signup()
    }
  }

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
          onKeyDown={_handleKeyDown}
          required
        />
        <br />
        <button className="btnPrimary" onClick={signup}>
          Sign-up
        </button>
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
