import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ListElement = ({ id, name, surname, nick }: ShortedInfo) => {
  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(`/user/${id}`);
  };

  return (
    <ListElementStyled onClick={clickHandler}>
      <TextElementStyle>
        {nick},{name} {surname}
      </TextElementStyle>
    </ListElementStyled>
  );
};

export default ListElement;

const ListElementStyled = styled.div`
  border: 2px solid black;
  :hover {
    background-color: #7286d3;
    cursor: pointer;
  }
`;

const TextElementStyle = styled.h2`
  :hover {
    color: #fff2f2;
  }
`;

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
}
