import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import { setUser } from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";

const LoginPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handlerLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
            name: user.displayName,
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
