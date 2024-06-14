import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f7f7f7;
`;

const InputGroup = styled.div`
  width: 300px;
  margin: 10px 0;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Profile() {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    await updateProfile(formData);
    alert("수정이 완료 되었습니다.");
    navigate("/");
  };

  return (
    <Container>
      <h1>내 프로필</h1>
      <InputGroup>
        <label htmlFor="nickname">닉네임:</label>
        <StyledInput
          type="text"
          minLength={"1"}
          maxLength={"10"}
          onChange={(e) => setNickname(e.target.value)}
        />
      </InputGroup>
      <InputGroup>
        <label htmlFor="avatar">프로필 이미지:</label>
        <StyledInput
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </InputGroup>
      <Button onClick={handleUpdateProfile}>변경하기</Button>
    </Container>
  );
}
