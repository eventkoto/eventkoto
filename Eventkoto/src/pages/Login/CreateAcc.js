import Leftside from "./Leftside";
import RegisterForm from "./registerform";

const CreateAcc = () => {
  return (
    <div className="login-page">
      <div className="left-side">
        <Leftside />
      </div>
      <div className="overflow-y-hidden right-side">
        <div className="animate__animated animate__fadeInUp">
          <RegisterForm />
        </div>
      </div>
      
    </div>
  );
};

export default CreateAcc;
