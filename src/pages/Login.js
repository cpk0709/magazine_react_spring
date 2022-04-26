import { useState } from 'react';
import {getCookie, setCookie, deleteCookie} from "../shared/Cookie";
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as userActions} from "../redux/modules/user";
import {useForm} from "react-hook-form";
import styled from "styled-components";

const Login = () => {
    
    const dispatch = useDispatch();

    const {register, handleSubmit, formState:{errors}} = useForm();
    const onValid = (data) => {

        dispatch(userActions.loginAction({user_id:data.userId,user_pwd:data.userPwd}));
    }

    // const [id, setId] = useState("");
    // const [pwd, setPwd] = useState("");

    // const login = () => {
    //     dispatch(userActions.login({user_id:"test321"}));
    // }
    
    return(
        <Wrap>
            <LoginTitle>로그인</LoginTitle>
            <Form onSubmit={handleSubmit(onValid)}>
                <LoginSubTitle>아이디</LoginSubTitle>    
                <Input {...register(
                    "userId",
                    {required:"아이디는 필수입력사항입니다.",
                    // pattern:{value:/^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/, 
                    // message:"이메일형식이 맞지않습니다."}
                    })} placeholder="아이디를 입력하세요"/>
                <WarningSpan>
                    {errors?.userId?.message}
                </WarningSpan>
                <LoginSubTitle>비밀번호</LoginSubTitle>
                <Input type="password" {...register("userPwd",{required:"비밀번호는 필수입력사항입니다.", minLength:{value:3,message:"비밀번호는 3자리 이상 입력해주세요."}})} placeholder="비밀번호를 입력하세요"/>
                <WarningSpan>
                    {errors?.userPwd?.message}
                </WarningSpan>
                <LoginBtn>로그인하기</LoginBtn>
            </Form>

        </Wrap>
    )
}

export default Login;

const Wrap = styled.div`
    padding:15px 10px;
`;

const WarningSpan = styled.span`
    color:red;
    margin-bottom:15px;
    font-size:1.2rem;
    font-weight:400;
`;

const LoginTitle = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-weight:600;
    font-size:3rem;
    margin:0.5rem;
`;

const Form = styled.form`
    padding-top:50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    & :first-child, & :nth-child(4) {
        align-self:start;
        margin-left:5%;
    }
`;

const LoginSubTitle = styled.p`
    font-size:1.5rem;
    margin-bottom:10px;
`;

const Input = styled.input`
    width:90%;
    font-size:1.2rem;
    padding:5px 10px;
    margin-bottom:5px;
    border-radius:5px;
`;

const LoginBtn = styled.button`
    width:90%;
    height:2.5rem;
    font-size:1.2rem;
    font-weight:600;
    margin:2rem 0;
    letter-spacing:0.2rem;
`;