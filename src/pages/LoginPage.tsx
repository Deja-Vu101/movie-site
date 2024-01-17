import Form from "../components/LoginRegister/Form";
import TitleSite from "../components/Header/TitleSite";
import "../components/MainSection/mainSection.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { loginAuthenticationSession } from "../services/AuthServices/authService";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { fetchAvatarDataStorage } from "../services/updateUser";
import { setUser } from "../store/slices/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const auth = getAuth();
  const { request_token } = useTypedSelector((state) => state.user);

  const loginUser = async (email: string, password: string) => {
    try {
      request_token &&
        loginAuthenticationSession(request_token, dispatch, navigate);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      auth.onAuthStateChanged((userAuth) => {
        if (userAuth) {
          const userPayload = {
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
            name: user.displayName,
            createDate: userAuth.metadata.creationTime,
            avatarURL: userAuth.photoURL,
          };
          fetchAvatarDataStorage(user.uid, dispatch);
          dispatch(setUser(userPayload));
          navigate("/");
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="LoginRegister_Container">
      <div className="LoginRegister_BackGround">
        <div className="LoginRegister">
          <TitleSite />
          <h1 className="LoginTitle">Login</h1>

          <Form title="Sign In" enterMethod={loginUser} />
          <p className="register-link">
            or{" "}
            <Link to="/register" style={{ color: "white" }}>
              register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
