import styled from "styled-components";
import { ButtonComponent } from "../../components/ButtonComponent/ButtonComponent";

export const WrapperTypeProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: flex-start;
  height: 44px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
  }
`;

export const WrapperButtonMore = styled(ButtonComponent)`
  &:hover {
    color: transparent;
    background: rgb(255, 68, 78);
    span {
      color: #fff;
    }
  }
  width: 100%;
  text-align: center;
`;

export const WrapperProducts = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 20px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
    gap: 10px;
  }
`;