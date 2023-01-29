import styled from "styled-components";
import axios from "axios";
import { useState } from "react";

const SearchEngine = () => {
    const [inputValue,setInputValue] = useState<string>("")

    const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setInputValue(event.target.value)
    }

  const searchHandler = async() => {
    console.log(inputValue)
    const sendData = {
        nick: inputValue
    }
    const result = await axios.post("/findUsers",sendData)
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

export default SearchEngine;
