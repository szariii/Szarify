


const FormInput  = ({fieldName,value, type,setData}:FormInputInterface) =>{

    const onChangeHandler=()=>{
        
    }

    return(
        <div>
            <h2>{fieldName[0].toUpperCase() + fieldName.substring(1)}</h2>
            <input type={type} value={value} onChange={onChangeHandler} />
            
        </div>
    )
}

export default FormInput

interface FormInputInterface{
    fieldName: string
    value: string
    type:string
    setData: React.Dispatch<React.SetStateAction<FormData>>
    
}

interface FormData{
    name: string
    surname: string,
    nick:string
    email:string
    phone:string
    password:string
  }
  