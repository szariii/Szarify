import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";


//Components
import UserInformations from "../components/userProfilComponents/UserInformations";

const UserProfilSite = () => {
  const [userInfo, setUserInfo] = useState<ShortedInfo>({
    id: -1,
    name: "",
    surname: "",
    nick: "",
    register_data:0,
    followed_persons:[],
    followers:0
  });
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const obj = {
      id: id,
    };
    const result = await axios.post("http://127.0.0.1:3000/findUser", obj);
    setUserInfo(result.data)
  };

  return (
    <UserProfilSiteStyle>
      {userInfo.id === -1 ? (
        <WaitingDiv>
          <Icon icon={faCircleNotch} className="fa-spin" />
        </WaitingDiv>
      ) : (
        <>
          <UserInformations userInfo={userInfo} setUserInfo={setUserInfo} />
        </>
      )}
    </UserProfilSiteStyle>
  );
};

const WaitingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserProfilSiteStyle = styled.div`
  width: 92%;
  height: 92%;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 8rem;
  color: #3454d6;
`;

export default UserProfilSite;

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
  register_data:number
  followed_persons:Array<number>
  followers:number
} 