import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { change } from "../../store/slicers/logginSlicer";
import { RootState } from "../../store/store";

//Components
import NavButton from "./NavButton";

const Nav = () => {
  const logginValue = useSelector((state: RootState) => state.loggin.value);
  const dispatch = useDispatch();

  return (
    <NavStyle>
      <div>
        <p>logo</p>
      </div>
      <Menu>
        <p>{logginValue.toString()}</p>
        <button onClick={() => dispatch(change())}>test</button>
        <NavButton link="/" name="login" />
        <NavButton link="/" name="login" />
      </Menu>
    </NavStyle>
  );
};

const NavStyle = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e5e0ff;
  height: 8%;
`;

const Menu = styled.div`
  display: flex;
`;

export default Nav;
