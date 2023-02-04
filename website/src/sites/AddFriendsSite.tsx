import styled from "styled-components";
import { useState } from "react";

//Components
import SearchEngine from "../components/addFriendsComponents/SearchEngine";
import SearchResult from "../components/addFriendsComponents/SearchResult";

const AddFriendsSite = () => {
  const [findedUsers, setFindedUsers] = useState<Array<ShortedInfo>>([]);
  const [findingUsers, setFindingUsers] = useState<boolean>(false);

  return (
    <AddFriendsSiteStyle>
      <h1>Find friends</h1>
      <SearchEngine
        setFindedUsers={setFindedUsers}
        setFindingUsers={setFindingUsers}
      />
      <SearchResult
        findedUsers={findedUsers}
        setFindedUsers={setFindedUsers}
        findingUsers={findingUsers}
        setFindingUsers={setFindingUsers}
      />
    </AddFriendsSiteStyle>
  );
};

const AddFriendsSiteStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 92vh;
`;

export default AddFriendsSite;

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
}
