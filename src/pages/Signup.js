import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as userActions} from "../redux/modules/user";
import {useForm} from "react-hook-form";
import styled from "styled-components";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


const Signup = () => {

    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        userId:Yup.string()
        .required("아이디는 필수입력사항입니다."),
        userEmail:Yup.string()
        .required("이메일은 필수입력사항입니다.")
        .matches(/^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/,"이메일형식에 맞지않습니다."),
        nickname:Yup.string()
        .required("닉네임은 필수입력사항입니다.")
        .min(3,"닉네임은 3자리 이상 입력해주세요."),
        userPwd:Yup.string()
        .required("비밀번호는 필수입력사항 입니다.")
        .min(3,"비밀번호는 3자리 이상 입력해주세요."),
        userPwdConf:Yup.string()
        .required("비밀번호확인은 필수입력사항입니다.")
        .oneOf([Yup.ref("userPwd")],"비밀번호가 일치하지 않습니다.")
    });

    const formOption = {resolver:yupResolver(validationSchema)};

    const {register, handleSubmit, formState:{errors}} = useForm(formOption);
    const onValid = (data) => {
        // console.log(data);
        dispatch(userActions.signupAction({user_id:data.userId,user_email:data.userEmail,user_nickname:data.nickname,user_pwd:data.userPwd}));
    }

    // 참고
    // <input {...register(
    //     "userId",
    //     {required:"아이디는 필수입력사항입니다.",
    //     // pattern:{value:/^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/, 
    //     // message:"이메일형식이 맞지않습니다."}
    //     })} placeholder="아이디를 입력하세요"/>
    
    return(
        <Wrap>
            <SignupTitle>회원가입</SignupTitle>
            <Form onSubmit={handleSubmit(onValid)}>
                <SignupSubTitle>아이디</SignupSubTitle>
                <Input {...register("userId")} placeholder="아이디를 입력하세요"/>
                <WarningSpan>
                    {errors?.userId?.message}
                </WarningSpan>
                <SignupSubTitle>이메일</SignupSubTitle>
                <Input {...register("userEmail")} placeholder="이메일를 입력하세요"/>
                <WarningSpan>
                    {errors?.userEmail?.message}
                </WarningSpan>
                <SignupSubTitle>닉네임</SignupSubTitle>
                <Input {...register("nickname")} placeholder="닉네임을 입력하세요"/>
                <WarningSpan>
                    {errors?.nickname?.message}
                </WarningSpan>
                <SignupSubTitle>비밀번호</SignupSubTitle>
                <Input type="password" {...register("userPwd")} placeholder="비밀번호를 입력하세요"/>
                <WarningSpan>
                    {errors?.userPwd?.message}
                </WarningSpan>
                <SignupSubTitle>비밀번호 확인</SignupSubTitle>
                <Input type="password" {...register("userPwdConf")} placeholder="비밀번호 확인을 입력하세요"/>
                <WarningSpan>
                    {errors?.userPwdConf?.message}
                </WarningSpan>
                <SignupBtn>회원가입하기</SignupBtn>
            </Form>

            
            {/* <h1>아이디</h1>
            <input type="text" placeholder="아이디를 입력하세요" onChange={(e)=>(setId(e.target.value))}/>
            <h1>비밀번호</h1>
            <input type="text" placeholder="비밀번호를 입력하세요" onChange={(e)=>(setPwd(e.target.value))}/>
            <button onClick={login}>로그인하기</button> */}
        </Wrap>
    )
}

export default Signup;

const Wrap = styled.div`
    padding:15px 10px;
`;

const WarningSpan = styled.span`
    color:red;
    margin-bottom:15px;
    font-size:1.3rem;
    font-weight:600;
`;

const SignupTitle = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-weight:600;
    font-size:2.5rem;
    margin:0.5rem;
`;

const Form = styled.form`
    padding-top:15px;
    display:flex;
    flex-direction:column;
    align-items:center;
    & :first-child, & :nth-child(4), & :nth-child(7), & :nth-child(10), & :nth-child(13){
        align-self:start;
        margin-left:5%;
    }
`;

const SignupSubTitle = styled.p`
    font-size:1.3rem;
    margin-bottom:10px;
`;

const Input = styled.input`
    width:90%;
    font-size:1.1rem;
    padding:5px 10px;
    margin-bottom:5px;
    border-radius:5px;
`;

const SignupBtn = styled.button`
    width:90%;
    height:2.3rem;
    font-size:1.2rem;
    font-weight:600;
    margin:2rem 0;
    letter-spacing:0.2rem;
`;