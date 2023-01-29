import styled from "styled-components";
import { useState } from "react";

//Components
import SearchEngine from "../components/addFriendsComponents/SearchEngine";



const AddFriendsSite = () => {
    const [findedUsers,setFindedUsers] = useState<Array<UserData>>()
    const [findingUsers,setFindingUsers] = useState<boolean>()

  return (
    <AddFriendsSiteStyle>
      <h1>Find friends</h1>
      <SearchEngine />
    </AddFriendsSiteStyle>
  );
};




const AddFriendsSiteStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default AddFriendsSite;

interface UserData {
    id: number;
    surname: string;
    email: string;
    phone: string;
    nick: string;
  }
