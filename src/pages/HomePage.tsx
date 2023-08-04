import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { logout } from "../store/slices/userSlice";
import { useTypedDispatch } from "../hooks/useTypedDispatch";

const HomePage = () => {
	const dispatch = useTypedDispatch()
  const { isAuth, email } = useAuth();
  return (
    <>
      HomePage
      {isAuth ? <h1>Welcome, {email}! </h1> : <Navigate to={"/login"} />}
		<button onClick={() => dispatch(logout())}>Logout from {email}</button>
    </>
  );
};

export default HomePage;
