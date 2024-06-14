import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { register } from "../lib/api/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  background-color: #f7f7f7;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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

const LoginButton = styled(Button)`
  background-color: #6c757d;

  &:hover {
    background-color: #565e64;
  }
`;

export function Signup() {
  const [id, setid] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (id.length < 4 || id.length > 10) {
      alert("아이디는 4~10글자 이내로만 가능합니다.");
      return;
    }
    if (password.length < 4 || password.length > 15) {
      alert("비밀번호는 4~15글자 이내로만 가능합니다.");
      return;
    }
    if (nickname.length < 1 || nickname.length > 10) {
      alert("닉네임은 1~10글자 이내로만 가능합니다.");
      return;
    }

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });
    console.log("회원가입 응답값 : ", response);
    if (response) {
      alert("회원가입에 성공했습니다!");
      navigate("/login");
    }
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <Input
        type="text"
        placeholder="아이디"
        value={id}
        onChange={(e) => setid(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="text"
        placeholder="닉네임"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button onClick={handleSignup}>회원가입</Button>
      <LoginButton onClick={() => navigate("/")}>로그인</LoginButton>
    </Container>
  );
}

export default Signup;
