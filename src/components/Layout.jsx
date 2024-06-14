import React, { useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { getUserInfo } from "../lib/api/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
`;

const NavItem = styled(Link)`
  display: flex;
  color: white;
  text-decoration: none;
  padding: 10px;
  &:hover {
    background-color: #555;
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background-color: #555;
  }
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  color: white;
  margin-right: 20px;
`;

const PageContainer = styled.div`
  padding: 6rem 2rem;
`;

export default function Layout({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        navigate("/login");
        localStorage.clear();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Container>
      <NavBar>
        <NavItem to="/">HOME</NavItem>
        <NavItem to="/profile">내 프로필</NavItem>
        <UserProfile>
          {user && (
            <>
              <UserAvatar src={user.avatar} alt="User Avatar" />
              <UserName>{user.nickname}</UserName>
            </>
          )}
        </UserProfile>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </NavBar>
      <PageContainer>
        <Outlet />
      </PageContainer>
    </Container>
  );
}
