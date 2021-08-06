import React, { useState } from "react";
import styled from "styled-components";
import SelectCountry from "./SelectCountry";
import { logoutUser } from "../redux/modules/userSlice";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const userName = useSelector(state => state.user.user.nickname);
    const [menuOn, setMenuOn] = useState(false);
    return (
        <HeaderContainer>
            <LeftColumn>
                <Logo>로고</Logo>
                <SelectCountry />
            </LeftColumn>
            <RightColumn>
                <UserName>
                    {/* 유저가 로그인을 하면 유저네임이 나옵니다! */}
                    {userName
                        ? `안녕하세요 ${userName}님`
                        : "로그인이 필요해요!"}
                </UserName>
                <MenuBtn onClick={() => setMenuOn(!menuOn)}>
                    {/* 메뉴버튼 on&off 토글설정 */}
                    {menuOn ? <ClearIcon /> : <MenuIcon />}
                </MenuBtn>
                <Controls menuOn={menuOn}>
                    <Control>
                        <Link to="/" onClick={e => setMenuOn(false)}>
                            홈
                        </Link>
                    </Control>

                    <Control>
                        <Link to="/freeboard" onClick={e => setMenuOn(false)}>
                            자유게시판
                        </Link>
                    </Control>
                    <Control>
                        <Link to="/univboard" onClick={e => setMenuOn(false)}>
                            대학게시판
                        </Link>
                    </Control>
                    {isLoggedIn ? (
                        <>
                            <Control>
                                <Link
                                    to="/mypage"
                                    onClick={e => setMenuOn(false)}
                                >
                                    마이 페이지
                                </Link>
                            </Control>
                            <Control>
                                <a
                                    onClick={() => {
                                        dispatch(logoutUser());
                                        localStorage.removeItem("token");
                                    }}
                                >
                                    로그아웃
                                </a>
                            </Control>
                        </>
                    ) : (
                        <>
                            <Control>
                                <Link
                                    to="/login"
                                    onClick={e => setMenuOn(false)}
                                >
                                    로그인
                                </Link>
                            </Control>
                            <Control>
                                <Link
                                    to="/signup"
                                    onClick={e => setMenuOn(false)}
                                >
                                    회원가입
                                </Link>
                            </Control>
                        </>
                    )}
                </Controls>
            </RightColumn>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    width: 1060px;
    margin: auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const LeftColumn = styled.div`
    display: flex;
`;

const Logo = styled.div`
    border: 1px solid #d2d2d2;
    padding: 10px 30px;
`;

const RightColumn = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.span`
    margin-right: 20px;
`;

const MenuBtn = styled.button`
    background: inherit;
    line-height: 0;
`;

const Controls = styled.ul`
    ${props => (props.menuOn ? "display:flex;" : "display:none;")}
    top: 100px;
    right: 0px;
    position: absolute;
    z-index: 99;
    flex-direction: column;
    background: #fff;
    border: 1px solid #d2d2d2;
    padding: 20px;
`;
const Control = styled.li`
    list-style: none;
    margin-right: 10px;
    cursor: pointer;
`;
export default Header;
