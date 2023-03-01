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
import { useEffect, useState } from "react";

//Fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false)
  console.log("test");

  const navigate = useNavigate();
  const loginValue = useSelector((state: RootState) => state.login.value);
  const loginedUser = useSelector((state: RootState) => state.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("resize");
    const getWidth = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
    };

    window.addEventListener("resize", getWidth);

    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, []);

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

  const yourAccount = () => {
    navigate(`/user/${loginedUser.id}`);
  };

  const showMenuHandler=()=>{
    setShowMenu(!showMenu)
  }

  return (
    <FullMenu>
    <NavStyle>
      {loginValue ? (
        <LinkStyle to={"/main"}>
          <LogoImage src={logo} alt="Logo" />
        </LinkStyle>
      ) : (
        <LogoImage src={logo} alt="Logo" />
      )}
      <Menu>
        {loginValue ? (
          <>
            {windowWidth > 850 ? (
              <>
                <NavButton action={yourAccount} name="Your account" />
                <NavButton action={addPostHandler} name="Add post" />
                <NavButton action={addFriendsHandler} name="Add friends" />
                <NavButton action={logOutFonction} name="Log out" />
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faBars} onClick={showMenuHandler} />
              </>
            )}
          </>
        ) : (
          ""
        )}
      </Menu>
    </NavStyle>
          {windowWidth>850 && loginValue}
    </FullMenu>
  );
};

const FullMenu = styled.div`
  height: 8vh;
`

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
