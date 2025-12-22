// components/GradientButton.jsx
import styled from "styled-components";

const GradientButton = ({ text = "Click Me", onClick }) => {
  return (
    <StyledWrapper>
      <button onClick={onClick}>
        <span className="text">{text}</span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    align-items: center;
    background-image: linear-gradient(
      144deg,
      #af40ff,
      #5b42f3 50%,
      #00ddeb
    );
    border: 0;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    color: #fff;
    display: flex;
    font-size: 18px;
    justify-content: center;
    min-width: 160px;
    padding: 3px;
    cursor: pointer;
    transition: all 0.3s;
  }

  button span {
    background-color: rgb(5, 6, 45);
    padding: 14px 24px;
    border-radius: 6px;
    width: 100%;
    text-align: center;
    transition: 300ms;
  }

  button:hover span {
    background: transparent;
  }

  button:active {
    transform: scale(0.92);
  }
`;

export default GradientButton;
