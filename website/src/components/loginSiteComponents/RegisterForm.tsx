import { useState } from "react";
import FormInput from "./FormInput";

const RegisterForm = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    surname: "",
    nick: "",
    email: "",
    phone: "",
    password: "",
  });
  return (
    <div>
      <FormInput
        fieldName="name"
        value={data.name}
        type="text"
        setData={setData}
      />

<FormInput
        fieldName="name"
        value={data.name}
        type="password"
        setData={setData}
      />
      <div></div>
    </div>
  );
};

interface FormData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
  password: string;
}

export default RegisterForm;
