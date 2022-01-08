import Dropdown from "../dashboard/dropdown";
import Leftside from "./Leftside";
import Rightside from "./Rightside";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="left-side">
        <Leftside />
      </div>
      <div className="right-side animate__animated animate__fadeInUp">
        <Rightside />
      </div>
    </div>
  );
};

export default LoginPage;
