import styled from "styled-components";

//FontAwasome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const WaitingDiv = () => {
  return (
    <WaitingDivStyle>
      <WaitingText>Waiting...</WaitingText>
      <Icon icon={faCircleNotch} className="fa-spin" />
    </WaitingDivStyle>
  );
};

const WaitingDivStyle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 0;
  left: 0;
`;

const WaitingText = styled.h1`
  color: #3454d6;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 8rem;
  color: #3454d6;
`;

export default WaitingDiv;
