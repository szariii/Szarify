import styled from "styled-components";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

//Components
import ListElement from "./ListElement";

const SearchResult = ({
  findedUsers,
  setFindedUsers,
  findingUsers,
  setFindingUsers,
}: SearchEngine) => {
  return (
    <SearchResultStyle>
      {findingUsers ? (
        <WaitingDiv>
          <WaitingText>Waiting...</WaitingText>
          <Icon icon={faCircleNotch} className="fa-spin" />
        </WaitingDiv>
      ) : (
        findedUsers.map((ele) => (
          <>
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
            <ListElement
              id={ele.id}
              name={ele.name}
              nick={ele.nick}
              surname={ele.surname}
            />
          </>
        ))
      )}
    </SearchResultStyle>
  );
};

const SearchResultStyle = styled.div`
display: flex;
flex-flow: column;
  overflow-y: auto;
  max-height: 500px;
  border: 2px solid black;
`;

const WaitingDiv = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
`;

const WaitingText = styled.h1`
  color: #3454d6;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 8rem;
  color: #3454d6;
`;

export default SearchResult;

interface SearchEngine {
  findedUsers: Array<ShortedInfo>;
  setFindedUsers: React.Dispatch<React.SetStateAction<ShortedInfo[]>>;
  findingUsers: boolean;
  setFindingUsers: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
}
