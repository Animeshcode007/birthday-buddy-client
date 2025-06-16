import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">Click Here</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    color: #ecf0f1;
    font-size: 17px;
    background-color: #e67e22;
    border: 1px solid #f39c12;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    box-shadow: 0px 6px 0px #d35400;
    transition: all 0.1s;
  }

  .button:active {
    box-shadow: 0px 2px 0px #d35400;
    position: relative;
    top: 2px;
  }
`;

export default Button;
