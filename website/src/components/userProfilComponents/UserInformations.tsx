const UserInformations = ({userInfo, setUserInfo}:UserInformationsInterface) =>{
    return(
        <div>
            <div><button>Follow</button></div>
            <div><h1>nick:{userInfo.nick}</h1><h1>name and surname: {userInfo.name} {userInfo.surname}</h1></div>
        </div>
    )
}





interface UserInformationsInterface {
    userInfo:ShortedInfo
    setUserInfo:React.Dispatch<React.SetStateAction<ShortedInfo>>
}

interface ShortedInfo {
    id: number;
    name: string;
    surname: string;
    nick: string;
    register_data:number
    followed_persons:Array<number>
    followers:number
  } 

export default UserInformations