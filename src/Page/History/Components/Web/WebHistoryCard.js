import React from "react";
import styled from "styled-components";
import CardDefault from "../../../../Assets/Card_Default.png";
import CardWhite from "../../../../Assets/Card_White.png";
import CardBlue from "../../../../Assets/Card_Blue.png";
import CardPurple from "../../../../Assets/Card_Purple.png";
import CardPink from "../../../../Assets/Card_Pink.png";

const WebHistoryCard = (props) => {
  const ImgList = [CardWhite, CardPink, CardPurple, CardBlue];

  return (
    <Div
      style={{
        display: "block",
        width: "28.125rem",
        height: "15.625rem",
        fontSize: "2rem",
      }}
    >
      <Div style={{ display: "block", position: "relative" }}>
        <Div
          style={{
            position: "absolute",
            backgroundColor: "none",
            opacity: 1,
            top: "0",
            left: "0",
            zIndex: "3",
          }}
        >
          <Div style={{ width: "55.6%" }}></Div>
          <Div style={{ flexDirection: "column", width: "44.4%" }}>
            <Div
              style={{
                alignItems: "end",
                padding: "0rem 0.875rem 0rem 0.875rem",
                height: "40%",
                boxSizing: "border-box",
              }}
            >
              {(props.cardNum - 1) % 4 >= 2 ? (
                <Div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    justifyContent: "start",
                    alignItems: "bottom",
                    height: "20%",
                    color: "white",
                  }}
                >
                  {props.undefined === true ? "" : props.name}
                </Div>
              ) : (
                <Div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    justifyContent: "start",
                    alignItems: "bottom",
                    height: "20%",
                  }}
                >
                  {props.undefined === true ? "" : props.name}
                </Div>
              )}
            </Div>
            <Div
              style={{
                alignItems: "center",
                padding: "0.4rem 0.875rem 0rem 0.875rem",
                height: "10%",
                boxSizing: "border-box",
              }}
            >
              {(props.cardNum - 1) % 4 >= 2 ? (
                <Div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    justifyContent: "start",
                    alignItems: "bottom",
                    height: "100%",
                    color: "white",
                  }}
                >
                  {props.undefined === true
                    ? ""
                    : props.brandCard?.identity.length > 15
                      ? props.brandCard?.identity.substring(0, 15)
                      : props.brandCard?.identity}
                </Div>
              ) : (
                <Div
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    justifyContent: "start",
                    alignItems: "bottom",
                    height: "100%",
                  }}
                >
                  {props.undefined === true
                    ? ""
                    : props.brandCard?.identity.length > 15
                      ? props.brandCard?.identity.substring(0, 15)
                      : props.brandCard?.identity}
                </Div>
              )}
            </Div>
            <Div
              style={{
                alignItems: "start",
                padding: "1rem 0.875rem 0rem 0.875rem",
                height: "25%",
                boxSizing: "border-box",
              }}
            >
              {(props.cardNum - 1) % 4 >= 2 ? (
                <Div
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: "400",
                    justifyContent: "start",
                    alignItems: "start",
                    height: "80%",
                    lineHeight: "125%",
                    color: "white",
                  }}
                >
                  {props.undefined === true
                    ? ""
                    : props.brandCard?.identity_explanation.length > 70
                      ? props.brandCard?.identity_explanation.substring(0, 70)
                      : props.brandCard?.identity_explanation}
                </Div>
              ) : (
                <Div
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: "400",
                    justifyContent: "start",
                    alignItems: "start",
                    height: "80%",
                    lineHeight: "125%",
                  }}
                >
                  {props.undefined === true
                    ? ""
                    : props.brandCard?.identity_explanation.length > 70
                      ? props.brandCard?.identity_explanation.substring(0, 70)
                      : props.brandCard?.identity_explanation}
                </Div>
              )}
            </Div>
            <Div
              style={{
                alignItems: "start",
                padding: "0rem 0.875rem 0rem 0.875rem",
                height: "25%",
                boxSizing: "border-box",
              }}
            >
              {(props.cardNum - 1) % 4 >= 2 ? (
                <Div
                  style={{
                    height: "80%",
                    lineHeight: "125%",
                    justifyContent: "start",
                  }}
                >
                  <Div
                    style={{
                      width: "fit-content",
                      fontSize: "0.65rem",
                      fontWeight: "600",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "0 0.05rem 0 0",
                      color: "white",
                    }}
                  >
                    {props.undefined === true
                      ? ""
                      : "#" + props.brandStory?.brandKeywords[0]}
                  </Div>
                  <Div
                    style={{
                      width: "fit-content",
                      fontSize: "0.65rem",
                      fontWeight: "600",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "0 0.05rem 0 0",
                      color: "white",
                    }}
                  >
                    {props.undefined === true
                      ? ""
                      : "#" + props.brandStory?.brandKeywords[1]}
                  </Div>
                  <Div
                    style={{
                      width: "fit-content",
                      fontSize: "0.65rem",
                      fontWeight: "600",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "0 0.05rem 0 0",
                      color: "white",
                    }}
                  >
                    {props.undefined === true
                      ? ""
                      : "#" + props.brandStory?.brandKeywords[2]}
                  </Div>
                </Div>
              ) : (
                <Div
                  style={{
                    height: "80%",
                    lineHeight: "125%",
                    justifyContent: "start",
                  }}
                >
                  <Div
                    style={{
                      width: "fit-content",
                      fontSize: "0.65rem",
                      fontWeight: "600",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "0 0.05rem 0 0",
                    }}
                  >
                    {props.undefined === true
                      ? ""
                      : "#" + props.brandStory?.brandKeywords[0]}
                  </Div>
                  <Div
                    style={{
                      width: "fit-content",
                      fontSize: "0.65rem",
                      fontWeight: "600",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "0 0.05rem 0 0",
                    }}
                  >
                    {props.undefined === true
                      ? ""
                      : "#" + props.brandStory?.brandKeywords[1]}
                  </Div>
                  <Div
                    style={{
                      width: "fit-content",
                      fontSize: "0.65rem",
                      fontWeight: "600",
                      justifyContent: "start",
                      alignItems: "start",
                      margin: "0 0.05rem 0 0",
                    }}
                  >
                    {props.undefined === true
                      ? ""
                      : "#" + props.brandStory?.brandKeywords[2]}
                  </Div>
                </Div>
              )}
            </Div>
          </Div>
        </Div>

        {props.undefined === true ? (
          <Img src={CardDefault}></Img>
        ) : (
          <Img src={ImgList[(props.cardNum - 1) % 4]}></Img>
        )}
      </Div>
    </Div>
  );
};

export default WebHistoryCard;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0vh 0vh 0vh 0vh;
  padding: 0vh 0vh 0vh 0vh;
  background-color: none;
  /* border: 0.5px solid black; */
  border-radius: 0rem;
  box-sizing: content-box;
  font-size: ${({ theme }) => theme.Web_fontSizes.Header1};
  font-weight: ${({ theme }) => theme.fontWeights.Header1};
  line-height: ${({ theme }) => theme.LineHeight.Header1};
  font-family: Pretendard;
  /* color: ${({ theme }) => theme.colors.secondary}; */
`;

const Img = styled.img`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  /* border: 1px solid #555555; */
  border-radius: 0rem;
  position: ${(props) => props.position || ""};
  object-fit: cover;
  /* &:hover {
    box-shadow: 0 0 10px 10px rgb(0, 0, 0, 0.2);;
  } */
`;
