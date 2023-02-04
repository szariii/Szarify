import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { change } from "../../store/slicers/loginSlicer";
import { RootState } from "../../store/store";
import { unsetUserData } from "../../store/slicers/userDataSlicer";

import logo from "../../img/logob.png";

//Components
import NavButton from "./NavButton";

const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  console.log("test");

  const navigate = useNavigate();
  const logginValue = useSelector((state: RootState) => state.login.value);

  const dispatch = useDispatch();

  const logOutFonction = () => {
    console.log("teescik log out");
    removeCookie("user", { path: "/" });
    dispatch(change());
    dispatch(unsetUserData());
    navigate("/");
  };

  const addFriendsHandler = () => {
    navigate("/addFriends");
  };

  const addPostHandler = () => {
    navigate("/addPost");
  };

  return (
    <NavStyle>
      {logginValue ? (
        <LinkStyle to={"/main"}>
          <LogoImage src={logo} alt="Logo" />
        </LinkStyle>
      ) : (
        <LogoImage src={logo} alt="Logo" />
      )}
      <Menu>
        {logginValue ? (
          <>
            <NavButton action={addPostHandler} name="Add post" />
            <NavButton action={addFriendsHandler} name="Add friends" />
            <NavButton action={logOutFonction} name="Log out" />
          </>
        ) : (
          ""
        )}
      </Menu>
    </NavStyle>
  );
};

const LinkStyle = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 80%;
`;

const NavStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5e0ff;
  height: 8vh;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
`;

const Menu = styled.div`
  display: flex;
  padding-right: 1rem;
`;

export default Nav;
