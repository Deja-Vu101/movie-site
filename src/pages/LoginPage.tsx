import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { setUser } from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";

const LoginPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { email } = useTypedSelector((state) => state.user);

  const handlerLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user, "user");
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };

  return (
    <>
      <h1>Login</h1>
      <Form title="sign in" handleClick={handlerLogin} />

      <p>
        or <Link to={"/register"}>register</Link>
      </p>
    </>
  );
};

export default LoginPage;
