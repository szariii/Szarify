import styled from "styled-components";

const FormInput = ({
  fieldName,
  value,
  type,
  setData,
  data,
}: FormInputInterface) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newData = { ...data };
    newData[fieldName as keyof FormData] = event.target.value;
    setData(newData);
  };

  return (
    <FormInputStyle>
      <h2>{fieldName[0].toUpperCase() + fieldName.substring(1)}</h2>
      <InputStyle
        type={type}
        value={value}
        onChange={(event) => onChangeHandler(event)}
        placeholder={fieldName}
      />
    </FormInputStyle>
  );
};

const FormInputStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

const InputStyle = styled.input`
  border: 0;
  text-align: center;
`;

export default FormInput;

interface FormInputInterface {
  fieldName: string;
  value: string;
  type: string;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  data: FormData;
}

interface FormData {
  name: string;
  surname: string;
  nick: string;
  email: string;
  phone: string;
  password: string;
}
