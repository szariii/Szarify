import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserProfilSite = () => {
  const [userInfo, setUserInfo] = useState<ShortedInfo>({
    id: -1,
    name: "",
    surname: "",
    nick: "",
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
    console.log(result);
  };

  return (
    <div>
      {userInfo.id === -1 ? (
        <div>
          <p>test</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserProfilSite;

interface ShortedInfo {
  id: number;
  name: string;
  surname: string;
  nick: string;
}
