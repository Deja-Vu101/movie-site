import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Form from "../components/Form";
import { setUser} from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";
import { options } from "../apiConfigs/tmdb";
import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";

const LoginPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  //const { request_token } = useTypedSelector((state) => state.user);

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

  //useEffect(() => {
  //  if (request_token == null) {
  //    fetch("https://api.themoviedb.org/3/authentication/token/new", options)
  //      .then((response) => response.json())
  //      .then((response) => {
  //        dispatch(setUserRequestTokenTMDB(response));
  //      })
  //      .catch((err) => console.error(err));
  //  }
  //}, []);

  //useEffect(() => {
  //  fetch("https://api.themoviedb.org/3/authentication/session/new", options)
  //    .then((response) => response.json())
  //    .then((response) => console.log(response))
  //    .catch((err) => console.error(err));
  //}, []);

  return (
    <>
      <h1>Login</h1>
      <Form title="sign in" handleClick={handlerLogin} />

      {/*<div>{request_token}</div>*/}

      <p>
        or <Link to={"/register"}>register</Link>
      </p>
    </>
  );
};

export default LoginPage;
