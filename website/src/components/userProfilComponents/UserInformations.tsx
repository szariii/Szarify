import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";

//Redux
import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../../store/slicers/userDataSlicer";

const UserInformations = ({
  userInfo,
  setUserInfo,
}: UserInformationsInterface) => {
  const dispatch = useDispatch();

  const registerTimestamp = new Date(userInfo.register_date);
  const registerDate = `${registerTimestamp.getDate()}.${
    registerTimestamp.getMonth() + 1
  }.${registerTimestamp.getFullYear()}`;

  const logedUserData = useSelector((state: RootState) => state.userData);
  const [followedUser, setFollowedUser] = useState<boolean>(
    logedUserData.followed_persons.includes(userInfo.id)
  );


  useEffect(() => {
    setFollowedUser(logedUserData.followed_persons.includes(userInfo.id));
  }, [logedUserData]);

  const followButtonClickHandler = async () => {
    const sendObj = {
      from: logedUserData.id,
      to: userInfo.id,
    };

    const result = await axios.post(
      "http://127.0.0.1:3000/followUser",
      sendObj
    );

    const changeData: LogedUserData = JSON.parse(JSON.stringify(logedUserData));
    changeData.followed_persons.push(userInfo.id);
    console.log(changeData);
    dispatch(setUserData(changeData));
    setUserInfo({ ...userInfo, followers: userInfo.followers + 1 });
  };

  const unFollowButtonClickHandler = async () => {
    const changeData: LogedUserData = JSON.parse(JSON.stringify(logedUserData));
    changeData.followed_persons = changeData.followed_persons.filter((ele) => {
      ele !== userInfo.id;
    });

    let str = "";
    changeData.followed_persons.map((ele) => (str += `,${ele.toString()}`));

    const sendObj = {
      from: logedUserData.id,
      to: userInfo.id,
      array: str,
    };

    const result = await axios.post(
      "http://127.0.0.1:3000/unfollowUser",
      sendObj
    );

    dispatch(setUserData(changeData));
    setUserInfo({ ...userInfo, followers: userInfo.followers - 1 });
  };

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
        {!followedUser ? (
          <>
            <ButtonStyle onClick={followButtonClickHandler}>Follow</ButtonStyle>
          </>
        ) : (
          <>
            <UnFollowButtonStyle onClick={unFollowButtonClickHandler}>
              Unfollow
            </UnFollowButtonStyle>
          </>
        )}
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
  color: #e5e0ff;
  font-size: 1rem;
  :hover {
    cursor: pointer;
  }
`;

const UnFollowButtonStyle = styled.button`
  background-color: #e5e0ff;
  width: 8rem;
  height: 2rem;
  border-radius: 20px;
  border-color: #e5e0ff;
  color: #8ea7e9;
  font-size: 1rem;
  :hover {
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

interface LogedUserData {
  id: number;
  surname: string;
  email: string;
  phone: string;
  nick: string;
  register_date: string;
  followed_persons: number[];
  followers: number;
}

export default UserInformations;
