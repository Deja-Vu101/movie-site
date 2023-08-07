import { useAuth } from "../../hooks/useAuth";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { logout } from "../../store/slices/userSlice";
import "./style.header.scss";

const Header = () => {
  const dispatch = useTypedDispatch();
  const { email } = useAuth();
  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_content">
          <div className="header_title">
            Movie<span className="header_title_word">React</span>
          </div>

          <nav>
            <ul className="header_list">
              <li className="header_btn">Home</li>
              <li className="header_btn">Movies</li>
              <li className="header_btn">Tv series</li>
              <li className="header_btn">Search</li>
            </ul>
          </nav>
        </div>

        <div>
          <button className="header_btn" onClick={() => dispatch(logout())}>
            Logout from {email}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
