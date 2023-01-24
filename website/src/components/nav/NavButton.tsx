import { Link } from "react-router-dom";
import styled from "styled-components";

const NavButton = ({ name, link }: NavButtonInterfacve) => {
  return (
    <NavButtonStyle>
      <LinkStyle to={link}>
        <h2>{name}</h2>
      </LinkStyle>
    </NavButtonStyle>
  );
};

const LinkStyle = styled(Link)`
  text-decoration: none;
`;

const NavButtonStyle = styled.div`
  width: 6rem;
  text-align: center;
  border: 1px solid black;
  border-top: 0;
  border-bottom: 0;
  &:hover {
    background-color: red;
  }
`;

interface NavButtonInterfacve {
  name: string;
  link: string;
}

export default NavButton;
