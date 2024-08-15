import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  background: rgb(26, 148, 255);
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px 20px;
  }
  @media (max-width: 480px) {
    padding: 10px 10px;
  }
`;

export const WrapperTextHeader = styled.span`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
`;

export const WrapperHeaderAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
`;

export const WrapperConttentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

export const MobileSearchIcon = styled.div`
  display: none;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
    font-size: 24px;
    color: #fff;
  }
`;

export const MobileSearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const MobileSearchWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    padding: 10px;
    background: white;
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 1000;
  }
`;
