import { useTypedSelector } from "./useTypedSelector";

export const useAuth = () => {
  const { email, id, token } = useTypedSelector((state) => state.user);

  return {
	isAuth: !!email,
	email,
	id,
	token
  }
};
