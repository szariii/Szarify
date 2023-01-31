import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";


//Redux
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";


const AddPostSite = () => {
  const [text, setText] = useState<string>("");
  const userData = useSelector((state: RootState) => state.userData);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const publishPostHandler = async() =>{
    const sendObj = {
        id:userData.id,
        text:text
    }

    const result = await axios.post("http://127.0.0.1:3000/login",)
  }

  return (
    <AddPostSiteStyle>
      <TextareaStyle value={text} onChange={(event) => changeHandler(event)} />
      <ButtonStyle onClick={publishPostHandler} >Publish</ButtonStyle>
    </AddPostSiteStyle>
  );
};

const ButtonStyle = styled.button`
  background-color: #8ea7e9;
  width: 8rem;
  height: 3rem;
  border-radius: 20px;
  border-color: #8ea7e9;
  color: #fff2f2;
  font-size: 1rem;

  :hover {
    cursor: pointer;
  }
`;

const TextareaStyle = styled.textarea`
  width: 60%;
  height: 60%;
  padding: 10px;
  border-radius: 10px;
`;

const AddPostSiteStyle = styled.div`
  width: 100%;
  height: 92%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: space-evenly;
`;

export default AddPostSite;
