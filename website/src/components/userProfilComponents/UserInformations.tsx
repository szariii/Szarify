import styled from "styled-components";
import axios from "axios";

//Redux
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

const UserInformations = ({
  userInfo,
  setUserInfo,
}: UserInformationsInterface) => {
  const registerTimestamp = new Date(userInfo.register_date);
  const registerDate = `${registerTimestamp.getDate()}.${
    registerTimestamp.getMonth() + 1
  }.${registerTimestamp.getFullYear()}`;
  console.log(registerDate);

  const logedUserData = useSelector((state: RootState) => state.userData);


  const buttonClickHandler = async()=>{
    const sendObj={
      from: logedUserData.id,
      to:userInfo.id
    }

    const result = await axios.post("http://127.0.0.1:3000/followUser", sendObj)

    console.log(sendObj)
  }

  return (
    <Column>
      <Row>
        <NickText>{userInfo.nick}</NickText>
        <HeaderTextStyle>
          {userInfo.name} {userInfo.surname}
        </HeaderTextStyle>
      </Row>
      <Row>
        <h3>Registered at: {registerDate}</h3>
        <h3>followers: {userInfo.followers}</h3>
        <h3>followed people: {userInfo.followed_persons.length}</h3>
        <ButtonStyle onClick={buttonClickHandler} >Follow</ButtonStyle>
      </Row>
    </Column>
  );
};

const ButtonStyle = styled.button`
  background-color: #8ea7e9;
  width: 8rem;
  height: 2rem;
  border-radius: 20px;
  border-color: #8ea7e9;
  color: #fff2f2;
  font-size: 1rem;
  :hover{
    cursor: pointer;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 20%;
  justify-content: space-around;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const HeaderTextStyle = styled.h2`
  font-size: 3rem;
`;

const NickText = styled.h2`
  font-size: 3rem;
  color: #8ea7e9;
`;

interface UserInformationsInterface {
  userInfo: ShortedInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<ShortedInfo>>;
}

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
  register_date: string;
  followed_persons: Array<number>;
  followers: number;
}

export default UserInformations;
