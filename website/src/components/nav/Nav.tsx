import styled from "styled-components";
import { useNavigate } from "react-router-dom";

//Redux
import { useSelector, useDispatch } from "react-redux";
import { change } from "../../store/slicers/loginSlicer";
import { RootState } from "../../store/store";
import { unsetUserData } from "../../store/slicers/userDataSlicer";

import logo from "../../img/logob.png";

//Components
import NavButton from "./NavButton";

const Nav = () => {
  const navigate = useNavigate();
  const logginValue = useSelector((state: RootState) => state.login.value);

  const dispatch = useDispatch();

  const logOutFonction = () => {
    dispatch(change());
    dispatch(unsetUserData());
    navigate("/");
  };

  const addFriendsHandler = () => {
    navigate("/addFriends");
  };

  return (
    <NavStyle>
      <LogoImage src={logo} alt="Logo" />
      <Menu>
        {logginValue ? (
          <>
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

const LogoImage = styled.img`
  height: 80%;
`;

const NavStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e5e0ff;
  height: 8%;
`;

const Menu = styled.div`
  display: flex;
  padding-right: 1rem;
`;

export default Nav;
