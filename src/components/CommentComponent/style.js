import styled from "styled-components";

export  const CommentWrapper = styled.div`
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentActions = styled.div`
  margin-left: 20px;
  display: flex;
  gap: 10px;
`;

export const ActionSpan = styled.span`
  cursor: pointer;
  color: #1890ff;
  &:hover {
    text-decoration: underline;
  }
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const AuthorName = styled.span`
  font-weight: bold;
  color: #333;
`;

export const CommentContent = styled.p`
  margin: 0;
`;

export const CommentDatetime = styled.span`
  font-size: 12px;
  color: #888;
`;

export const CommentAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;