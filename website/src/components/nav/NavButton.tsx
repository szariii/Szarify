import { Link } from "react-router-dom";
import styled from "styled-components";

const NavButton = ({ name, action, windowWidth }: NavButtonInterfacve) => {
  const NavButtonStyle = styled.div`
    //width: auto;
    width: ${windowWidth >= 850 ? "auto" : "100%"};
    text-align: center;
    border-left: 1px solid black;
    background-color: #e5e0ff;
    &:hover {
      background-color: white;
      color: #7286d3;
      cursor: pointer;
    }
  `;

  return (
    <NavButtonStyle onClick={() => action()}>
      <h2>{name}</h2>
    </NavButtonStyle>
  );
};

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

interface NavButtonInterfacve {
  name: string;
  action: Function;
  windowWidth: number;
}

export default NavButton;
