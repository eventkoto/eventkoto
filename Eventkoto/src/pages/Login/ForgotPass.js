import ForgotPassword from "./ForgotPassword";
import Leftside from "./Leftside";

const ForgotPass = () => {
  return (
    <div className="login-page">
      <div className="left-side">
        <Leftside />
      </div>
      <div className="overflow-y-hidden right-side">
        <div className="animate__animated animate__fadeInUp">
          <ForgotPassword />
        </div>
      </div>
      
    </div>
  );
};

export default ForgotPass;
