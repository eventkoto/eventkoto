import { Link } from "react-router-dom";
import { useState } from "react"
import { FireAuth } from "../../libs/firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [logging, setLogging] = useState(false)
  const [error, setError] = useState(false)

  function reset(){
    setLogging(true)
    setError(false)

    FireAuth.resetPassword(email, (e) => {
      if(e){
        setError("Succesfully Sent Reset Password Email to Your Account. Please check it to proceed")
      }
      else{
        setError("Error. Please Make Sure that the Email provided is correct")
      }
      
      setLogging(false)
    })

  }

  function _handleKeyDown(e) {
    if (e.key === 'Enter') {
      reset()
    }
  }

  return (
    <>
      <p className="font-bold p-5 mx-10 break-words">
        Please Enter the Email of the Account you'd want to recover
      </p>
      <div className="">
        <input
          className="inputText"
          placeholder="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        {
          error && <p className="p-1 break-words">{error}</p>
        }
        {
          logging
          ?
          <div className="w-3 h-3 bg-red-600 animate-pulse mx-auto m-5"></div>
          :
          <button className="btnPrimary" onClick={reset}>Reset Password</button>
        }
      </div>
      
      <div className="">
        <Link to="/" className="paraga">
          <b>Sign In</b>
        </Link>
      </div>
    </>
  );
};

export default ForgotPassword;
