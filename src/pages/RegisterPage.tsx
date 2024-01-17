import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Form from "../components/LoginRegister/Form";
import { setUser } from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { useTypedSelector } from "../hooks/useTypedSelector";
import TitleSite from "../components/Header/TitleSite";
import { fetchSessionID } from "../services/AuthServices/authService";

const RegisterPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const { request_token } = useTypedSelector((state) => state.user);

  const registerUser = async (
    email: string,
    password: string,
    name?: string
  ) => {
    if (request_token) {
      fetchSessionID(request_token, dispatch);
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });

      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
          name: user.displayName,
        })
      );
      navigate("/");
      console.log(user, "USER");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <div className="LoginRegister_Container">
      <div className="LoginRegister_BackGround">
        <div className="LoginRegister">
          <TitleSite />
          <h1 className="LoginTitle">Register</h1>

          <Form title="Sign Up" enterMethod={registerUser} />

          <p>
            already have an account? <Link to={"/login"}>log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
