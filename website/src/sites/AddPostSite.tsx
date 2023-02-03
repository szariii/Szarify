import styled from "styled-components";
import React, { useState } from "react";
import axios from "axios";

//Redux
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

//Helping components
import WaitingDiv from "../components/helpingComponents/WaitingDiv";

const AddPostSite = () => {
  const [text, setText] = useState<string>("");
  const [waiting, setWaiting] = useState<boolean>(false);
  const [thanks, setThanks] = useState<boolean>(false);
  const userData = useSelector((state: RootState) => state.userData);

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const publishPostHandler = async () => {
    setWaiting(true);
    const sendObj = {
      id: userData.id,
      text: text,
    };
    const result = await axios.post("http://127.0.0.1:3000/addPost", sendObj);
    if (result.data === "added") {
      setWaiting(false);
      setThanks(true);
    }
  };

  const thanksHandler = () => {
    setText("")
    setThanks(false);
  };

  return (
    <AddPostSiteStyle>
      <TextareaStyle value={text} onChange={(event) => changeHandler(event)} />
      <ButtonStyle onClick={publishPostHandler}>Publish</ButtonStyle>
      {waiting ? <WaitingDiv /> : ""}
      {thanks ? (
        <BackgroundDiv>
          <CommunicateDiv>
            <CommunicateHeader>Thanks for your post</CommunicateHeader>
            <ThanksButtonStyle onClick={thanksHandler}>
              Thanks
            </ThanksButtonStyle>
          </CommunicateDiv>
        </BackgroundDiv>
      ) : (
        ""
      )}
    </AddPostSiteStyle>
  );
};

const CommunicateHeader = styled.h1`
  color: #fff2f2;
  text-align: center;
`;

const CommunicateDiv = styled.div`
  width: 60%;
  height: 50%;
  background-color: #7286d3;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const BackgroundDiv = styled.div`
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

const ThanksButtonStyle = styled.button`
  background-color: #fff2f2;
  width: 8rem;
  height: 3rem;
  border-radius: 20px;
  border-color: #fff2f2;
  color: #8ea7e9;
  font-size: 1rem;

  :hover {
    cursor: pointer;
  }
`;

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
