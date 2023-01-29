import { Link } from "react-router-dom";
import styled from "styled-components";

const NavButton = ({ name, action }: NavButtonInterfacve) => {
  return (
    <NavButtonStyle onClick={() => action()}>
      <h2>{name}</h2>
    </NavButtonStyle>
  );
};

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const NavButtonStyle = styled.div`
  width: auto;
  text-align: center;
  border-left: 1px solid black;
  &:hover {
    background-color: white;
    color: #7286d3;
    cursor: pointer;
  }
`;

interface NavButtonInterfacve {
  name: string;
  action: Function;
}

export default NavButton;
