import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {getCookie,deleteCookie} from "../shared/Cookie";
import {history} from "../redux/configureStore";

import {useSelector, useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";

const Header = (props) => {
    // props로 받아온 history는 안 됐음...
    // const history = props.history;

    const dispatch = useDispatch();

    const isLogin = useSelector(store => store.user.is_login);

    // useEffect(() => {
    //     let cookie = getCookie("is_login");
    //     console.log(cookie);
    //     if(cookie){
    //         setIsLogin(true);
    //     }else{
        
    //         setIsLogin(false);
    //     }
    // });

    

    const logout = () => {
        dispatch(userActions.logoutAction({}));
    }

    const gotoLoginPage = () => {
        history.push("/login");
    }

    const gotoSignupPage = () => {
        history.push("/signup");
    }

    if(isLogin){
        return (
            <Wrap>
                <UserProfile/>
                <BtnWrap>
                    <UserInfoBtn>내 정보</UserInfoBtn>
                    <NoticeBtn>알림</NoticeBtn>
                    <LogoutBtn onClick={logout}>로그아웃</LogoutBtn>
                </BtnWrap>
            </Wrap>
        )
    }

    return (
        <Wrap>
            <UserProfile/>
            <BtnWrap>
                <LoginBtn onClick={gotoLoginPage}>로그인</LoginBtn>
                <SignupBtn onClick={gotoSignupPage}>회원가입</SignupBtn>
            </BtnWrap>
        </Wrap>
    )
}

export default Header;

const Wrap = styled.div`
    width:100%;
    height:10%;
    background-color:#111;
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding:10px 5px;
`;

const UserProfile = styled.div`
    width:3em;
    height:3em;
    background-color:lightgreen;
    background-image:url("https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg");
    background-size:cover;
    background-position:center;
    border-radius:100%;
`;

const BtnWrap = styled.div`
    width:80%;
    display:flex;
    justify-content:flex-end;
`;

const UserInfoBtn = styled.button`
    width:5em;
    height:2em;
    font-weight:900;
    font-size:1rem;
    margin-right:2rem;
`;

const NoticeBtn = styled.button`
    width:5em;
    height:2em;
    font-weight:900;
    font-size:1rem;
    margin-right:2rem;
`;

const LogoutBtn = styled.button`
    width:5em;
    height:2em;
    font-weight:900;
    font-size:1rem;
`;

const LoginBtn = styled.button`
    width:5em;
    height:2em;
    font-weight:900;
    font-size:1.2rem;
    margin-right:3rem;
`;

const SignupBtn = styled.button`
    width:5em;
    height:2em;
    font-weight:900;
    font-size:1.2rem;
`;