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
import { useEffect, useState, useRef } from "react";

//Fontawsome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import AnimateHeight from "react-animate-height";

const Nav = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showMenu, setShowMenu] = useState(false);
  const [navHeight, setNavHeight] = useState((window.innerHeight / 100) * 8);

  const navigate = useNavigate();
  const loginValue = useSelector((state: RootState) => state.login.value);
  const loginedUser = useSelector((state: RootState) => state.userData);

  const dispatch = useDispatch();

  useEffect(() => {
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

  const showMenuHandler = () => {
    setShowMenu(!showMenu);
    const div = ref.current as HTMLDivElement;

    //setNavHeight(div.offsetHeight);
    if (Math.floor(div.offsetHeight) !== (window.innerHeight / 100) * 8) {
      setNavHeight(div.offsetHeight);
    } else {
      setNavHeight((window.innerHeight / 100) * 8);
    }
  };

  return (
    <AnimateHeight duration={500} height={navHeight}>
      <FullMenu ref={ref}>
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
                    <NavButton
                      windowWidth={windowWidth}
                      action={yourAccount}
                      name="Your account"
                    />
                    <NavButton
                      windowWidth={windowWidth}
                      action={addPostHandler}
                      name="Add post"
                    />
                    <NavButton
                      windowWidth={windowWidth}
                      action={addFriendsHandler}
                      name="Add friends"
                    />
                    <NavButton
                      windowWidth={windowWidth}
                      action={logOutFonction}
                      name="Log out"
                    />
                  </>
                ) : (
                  <>
                    <Icon icon={faBars} onClick={showMenuHandler} />
                  </>
                )}
              </>
            ) : (
              ""
            )}
          </Menu>
        </NavStyle>

         {windowWidth <= 850 && loginValue && showMenu ? ( 
        <>
          <NavButton
            windowWidth={windowWidth}
            action={yourAccount}
            name="Your account"
          />
          <NavButton
            windowWidth={windowWidth}
            action={addPostHandler}
            name="Add post"
          />
          <NavButton
            windowWidth={windowWidth}
            action={addFriendsHandler}
            name="Add friends"
          />
          <NavButton
            windowWidth={windowWidth}
            action={logOutFonction}
            name="Log out"
          />
        </>
         ) : (
          ""
        )} 
      </FullMenu>
    </AnimateHeight>
  );
};

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;

const FullMenu = styled.div`
  //height: 8vh;
  position: sticky;
  top: 0;
  left: 0;
  transition: height 2s;
`;

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
`;

const Menu = styled.div`
  display: flex;
  padding-right: 1rem;
`;

export default Nav;
