import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useGoogleLogin } from "@react-oauth/google";
import {
  isLogined,
  accessTokenState,
  recoilUserID,
  recoilUserData,
  isFirstLogin,
  recoilUserAllResults,
  noCard,
} from "../atom/loginAtom";
import { useMediaQuery } from "react-responsive";

const TopNavBar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLogined);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const [isDropdownView, setDropdownView] = useState(false);
  const [userID, setUserID] = useRecoilState(recoilUserID);
  const [userData, setUserData] = useRecoilState(recoilUserData);
  const [isFirstLoggedin, setIsFirstLoggedin] = useRecoilState(isFirstLogin);
  const [nickname, setNickname] = useState(localStorage.getItem("nickname"));
  const [userAllResults, setUserAllResults] =
    useRecoilState(recoilUserAllResults);
  const [noCardR, setNoCard] = useRecoilState(noCard);
  const isDesktopOrMobile = useMediaQuery({ query: "(max-width:768px)" }); // 758px 이하일 때는 모바일 뷰로 바뀐다.

  const handleLogin = (token) => {
    localStorage.setItem("accessToken", token);
    setIsLoggedIn(true);
    sendUserDataToGoogle(token);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAccessToken(null);
    setIsLoggedIn(false);
    setNoCard(true);
    setIsFirstLoggedin(null);
    setUserAllResults({
      userId: 0,
      name: "string",
      email: "string",
      nickname: "string",
      chatRooms: [
        {
          chatRoomId: 1,
          progress: 0,
          finishChat: false,
          chatNickName: "",
          keywords: [],
          answers: [],
          groupKeywords: {},
          brandCard: {
            brandCardId: 0,
            identity: "",
            identity_explanation: "",
          },
          brandStory: {
            brandStoryId: 1,
            identity: "",
            identity_explanation: "",
            brandKeywords: [""],
            storyHeadlines: [""],
            storyContents: [""],
            competency: "",
            target: "",
            contentsRecommendation: "",
          },
        },
      ],
    });
    navigate("/");
  };

  const sendUserDataToServer = async (userData) => {
    console.log(userData);
    //유저의 구글정보를 서버로 보내서 디비에 저장
    try {
      const jsonUserData = JSON.stringify(userData);
      console.log(jsonUserData);
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/login/google`,
        jsonUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("서버 응답2:", response.data); //response.data = 유저 아이디.
      setUserID(response.data.userId);
      localStorage.setItem("userID", response.data.userId);
      localStorage.setItem("nickname", response.data.nickname);
      setNickname(localStorage.getItem("nickname"));
      setIsFirstLoggedin(response.data.firstLogin);
    } catch (error) {
      console.error("서버 요청 에러2:", error);
    }
  };
  const sendUserDataToGoogle = async (token) => {
    //구글에게 억세스토큰 보내서 사용자정보 받아옴
    try {
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("서버 응답:", response.data);
      setUserData({
        name: response.data.name,
        email: response.data.email,
        picture: response.data.picture,
      });
      sendUserDataToServer({
        name: response.data.name,
        email: response.data.email,
        picture: response.data.picture,
      }); // 빋은 데이터를 서버로 보내서 디비에 저장
    } catch (error) {
      console.error("서버 요청 에러:", error);
    }
  };

  const login = useGoogleLogin({
    // 구글 로그인 실행
    onSuccess: (res) => {
      setAccessToken(res.access_token);
      handleLogin(res.access_token); //억세스 토큰을 로컬스토리지에 저장하고 악시오스로 구글에게 보냄.
      // if (isFirstLoggedin) {
      //   //FirstLogin이 true이면 이름 온보딩페이지
      //   navigate("/name");
      // } else {
      //   //FirstLogin이 false이면 원래페이지
      //   navigate("/");
      // }
    },
    onFailure: (err) => {
      console.log(err);
    },
  });

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };

  useEffect(() => {
    setNickname(localStorage.getItem("nickname"));
  }, [localStorage.getItem("nickname")]);

  useEffect(() => {
    console.log(isFirstLoggedin);
    if (isFirstLoggedin !== null) {
      if (isFirstLoggedin) {
        navigate("/name");
      }
    }
  }, [isFirstLoggedin]);

  return (
    <>
      {isDesktopOrMobile === true ?
        <Div scrolled={isScrolled}>
          <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
            <img
              src="Nav Logo.png"
              alt="Brand On 로고"
              width={180}
              style={{ marginTop: "10px" }}
            />
          </Link>
          <div style={{ flex: 1 }} />
        </Div>
        :
        <Div scrolled={isScrolled}>
          <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
            <img
              src="Nav Logo.png"
              alt="Brand On 로고"
              width={180}
              style={{ marginTop: "10px" }}
            />
          </Link>
          <div style={{ flex: 1 }} />

          {!isLoggedIn && (
            <>
              <LoginButton onClick={login}>로그인</LoginButton>
            </>
          )}
          {isLoggedIn && (
            <>
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? {
                      all: "unset",
                      cursor: "pointer",
                      color: "#8F2EFF",
                    }
                    : {
                      all: "unset",
                      cursor: "pointer",
                      color: "white",
                    }
                }
              >
                <Body1>홈</Body1>
              </NavLink>
              <div style={{ width: "66px" }} />
              <NavLink
                to="/chat"
                style={({ isActive }) =>
                  isActive
                    ? {
                      all: "unset",
                      cursor: "pointer",
                      color: "#8F2EFF",
                    }
                    : {
                      all: "unset",
                      cursor: "pointer",
                      color: "white",
                    }
                }
              >
                <Body1>채팅</Body1>
              </NavLink>
              <div style={{ width: "66px" }} />
              <NavLink
                to="/history"
                style={({ isActive }) =>
                  isActive
                    ? {
                      all: "unset",
                      cursor: "pointer",
                      color: "#8F2EFF",
                    }
                    : {
                      all: "unset",
                      cursor: "pointer",
                      color: "white",
                    }
                }
              >
                <Body1>기록</Body1>
              </NavLink>
              <div style={{ width: "4.25rem" }} />
              <div onBlur={handleBlurContainer} style={{ marginTop: "3px" }}>
                <label onClick={handleClickContainer}>
                  <button
                    style={{ all: "unset", color: "white", cursor: "pointer" }}
                  >
                    <Body1>
                      <img
                        src={userData.picture}
                        alt="프로필 사진"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "30px",
                        }}
                      ></img>
                      <div style={{ width: "0.9375rem" }} />
                      {nickname}
                    </Body1>
                  </button>
                </label>
                {isDropdownView && (
                  <Ul>
                    <li style={{ marginBottom: "10px" }}>
                      <Link
                        to="/mypage"
                        style={{ all: "unset", cursor: "pointer" }}
                      >
                        마이페이지
                      </Link>
                    </li>
                    <li style={{ cursor: "pointer" }} onClick={handleLogout}>
                      로그아웃
                    </li>
                  </Ul>
                )}
              </div>
            </>
          )}
        </Div>
      }

    </>
  );
};

export default TopNavBar;

const Div = styled.div`
  display: flex;
  position: fixed;
  z-index: 1000;
  align-items: center;
  vertical-align: middle;
  padding: 12px 48px;
  width: 100%;
  height: 72px;
  background-color: ${(props) =>
    props.scrolled ? "rgba(0, 0, 0, 0.4)" : "transparent"};
  backdrop-filter: ${(props) => (props.scrolled ? "blur(50px)" : "none")};
  transition: background-color 0.5s;
  color: white;
`;

const Header1 = styled.div`
  font-size: ${({ theme }) => theme.Web_fontSizes.Header1};
  font-weight: ${({ theme }) => theme.fontWeights.Header1};
  line-height: ${({ theme }) => theme.LineHeight.Header1};
  color: white;
  font-family: "Pretendard";
`;

const Body1 = styled.div`
  font-size: ${({ theme }) => theme.Web_fontSizes.Body1};
  font-weight: ${({ theme }) => theme.fontWeights.Body1};
  line-height: ${({ theme }) => theme.LineHeight.Body1};
  font-family: "Pretendard";
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ul = styled.ul`
  position: absolute;
  list-style: none;
  padding: 0;
  text-align: center;
  padding: 10px;
  margin-top: 25px;
  margin-left: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(50px);
  border-radius: 5px;
`;

const LoginButton = styled.button`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 300px;
  background: var(--White, #fff);
  width: 82px;
  height: 35px;
  border: none;
  color: var(--black, #101010);
  font-family: "Pretendard";
  font-size: ${({ theme }) => theme.Web_fontSizes.Body1};
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  cursor: pointer;
`;
