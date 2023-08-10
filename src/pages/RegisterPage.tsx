import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Form from "../components/Form";
import { setUser } from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";

const RegisterPage = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  //const handlerRegister = (email: string, password: string, name: string) => {
  //  const auth = getAuth();
  //  createUserWithEmailAndPassword(auth, email, password)
  //    .then(({ user }) => {
  //      dispatch(
  //        setUser({
  //          email: user.email,
  //          token: user.refreshToken,
  //          id: user.uid,
  //          name: user.displayName,
  //        })
  //      );
  //      navigate("/");
  //    })
  //    .catch(console.error);
  //};
  const handlerRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    const auth = getAuth();
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Form title="sign up" handleClick={handlerRegister} />
      <p>
        already have an account? <Link to={"/login"}>log in</Link>
      </p>
    </>
  );
};

export default RegisterPage;
