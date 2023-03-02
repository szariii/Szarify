import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

import settings from "../../settings.json"


//Redux
import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const SearchEngine = ({setFindedUsers,setFindingUsers}:SearchEngine) => {
    const userData = useSelector((state: RootState) => state.userData);
    const [inputValue,setInputValue] = useState<string>("")

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }

  const searchHandler = async() => {
    setFindingUsers(true)
    const sendData = {
        nick: inputValue
    }
    const result = await axios.get(`${settings.address}/findUsers`,{params:sendData})
    const data: Array<ShortedInfo> = result.data
    const filteredResult = data.filter(ele=>ele.id!==userData.id)
    setFindedUsers(filteredResult)
    setFindingUsers(false)
  };

  return (
    <SearchEngineStyle>
      <InputStyle
        value={inputValue}
        type={"text"}
        placeholder={"Type nick or name and surname"}
        onChange={(event) => inputChangeHandler(event)}
      />
      <ButtonStyle onClick={searchHandler}>Find</ButtonStyle>
    </SearchEngineStyle>
  );
};

const SearchEngineStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ButtonStyle = styled.button`
  background-color: #8ea7e9;
  width: 10%;
  height: 2rem;
  border-radius: 20px;
  border-color: #8ea7e9;
  color: #fff2f2;
  font-size: 1.5rem;

  :hover {
    cursor: pointer;
  }
`;

const InputStyle = styled.input`
  width: 60%;
  height: 2rem;
  font-size: 1.5rem;
`;

interface ShortedInfo {
    id:number
    name:string
    surname:string
    nick:string
}

interface SearchEngine{
   setFindedUsers: React.Dispatch<React.SetStateAction<ShortedInfo[]>>
   setFindingUsers:React.Dispatch<React.SetStateAction<boolean>>
}

export default SearchEngine;
