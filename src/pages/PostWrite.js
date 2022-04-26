import React from 'react';
// import Upload from '../shared/Upload';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as imageActions} from "../redux/modules/image";
import {actionCreators as postActions} from "../redux/modules/post";
import styled from "styled-components";
import { useState } from 'react';


const PostWrite = (props) => {

    const dispatch = useDispatch();

    // 포스트 수정을 위한 포스트아이디 및 is_edit
    const post_id = props.match.params.post_id;
    const is_edit = post_id ? true : false;
    // 다시 DB연결할 필요 없이 post리덕스의 포스트 리스트 state를 불러옴
    const post_list = useSelector((store) => store.post.list);
    
    let _post = is_edit ? post_list.find((p) => p.postNo === parseInt(post_id)) : null;
    console.log(_post);
    // 이미지도 db에 등록된거 불러오게했는데 수정이 안됨...
    // if(is_edit){
    //     dispatch(imageActions.setPreview(_post.images));
    // }

    // 유저 로그인확인
    const is_login = useSelector((store) => store.user.is_login);

    // 이미지 업로딩 true/false
    const is_uploading = useSelector(store => store.image.uploading);
    // 이미지 태그 select
    const fileInput = React.useRef();

    // 이미지 선택시 실행 함수
    const selectFile = () => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            // console.log(reader.result);
            // image 리덕스에 미리보기 state에 등록
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    // 이미지 선택시 이미지리덕스에 올라간 프리뷰를 불러옴(얘를 최종 포스트 추가할때도 사용... 변수명 변경필요)
    const preview = useSelector(store => store.image.preview);

    // 포스트 글 내용
    const [contents, setContents] = useState("");

    const changeContests = (e) => {
        setContents(e.target.value);
    }

    // 포스트 추가
    const addPost = () => {
        dispatch(postActions.addPostAction(preview,contents));
    }

    // 포스트 수정
    const editPost = () => {
        const post = {
            postTitle:'',
            postContents:contents,
            // images:preview
            images:"https://pikwizard.com/photos/7dfd148fb38cdc9da4a1913244af4a5f-s.jpg"
        };
        dispatch(postActions.editPostAction(post_id,post));
    }

    // 포스트 삭제
    const deletePost = () => {
        if(window.confirm("정말 삭제하시겠습니까?") === true){
            dispatch(postActions.deletePostAction(post_id));
        }else{
            console.log("취소");
        }
    }

    if(!is_login){
        return(
            <WarnWrap>
                <WarnP>로그인해야 이용가능해요!</WarnP>
            </WarnWrap>
            
        )
        
    }

    return(
        <Wrap>
            <PsWriteTitle>
                {is_edit ? "게시글 수정" : "게시글 작성"}
            </PsWriteTitle>

            {/* <Upload/> */}
            <LabelForInput htmlFor="input_file">파일업로드</LabelForInput>
            <Input id="input_file" type="file" ref={fileInput} onChange={selectFile} disabled={is_uploading}/>

            <PsWriteSubTitle>미리보기</PsWriteSubTitle>
            <Image src={preview?preview:"http://via.placeholder.com/400x300"}/>

            <PsWriteSubTitle>게시글 내용</PsWriteSubTitle>
            <Textarea onChange={changeContests} value={ contents}/>
            {is_edit ? (<BtnWrap><PsEditBtn onClick={editPost}>게시글수정</PsEditBtn><DeleteBtn onClick={deletePost}>삭제</DeleteBtn></BtnWrap>) : (<PsWriteBtn onClick={addPost}>게시글작성</PsWriteBtn>)}
            

        </Wrap>
    )
}

export default PostWrite;

const Wrap = styled.div`
    width:100%;
    height:auto;
    display:flex;
    flex-direction:column;
    align-items:center;
    padding:20px 10px;
    & :first-child,& :nth-child(2){
        align-self:start;
    };
`;

const PsWriteTitle = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-weight:600;
    font-size:2.5rem;
    margin:0.5rem;
`;

const LabelForInput = styled.label`
    padding: 10px 25px;
    background-color:#FF6600;
    font-size:1.3rem;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    margin:20px 0 10px;
`;

const Input = styled.input`
    margin:20px 0;
    display:none;
`;

const PsWriteSubTitle = styled.p`
    font-size:1.3rem;
    margin-bottom:15px;
`;
// 수정 / 등록 버튼
const BtnWrap = styled.div`
    width:100%;
    display:flex;
    justify-content:space-around;
`;

const PsEditBtn = styled.button`
    width:45%;
    height:2.3rem;
    font-size:1.2rem;
    font-weight:600;
    margin-top:1rem;
    letter-spacing:0.2rem;
`;

const DeleteBtn = styled.button`
    width:45%;
    height:2.3rem;
    font-size:1.2rem;
    font-weight:600;
    margin-top:1rem;
    letter-spacing:0.2rem;
    &:hover{
        background-color:#F07974;
    }
`;

const PsWriteBtn = styled.button`
    width:90%;
    height:2.3rem;
    font-size:1.2rem;
    font-weight:600;
    margin-top:1rem;
    letter-spacing:0.2rem;
`;

const Image = styled.img`
    width: 100%;
    height:350px;
    min-width: 250px;
    margin-bottom:25px;
`;

const Textarea = styled.textarea`
    border: 1px solid #212121;
    height:300px;
    width: 100%;
    padding: 12px 4px;
    resize:none;
    outline:none;
    font-size:1.2rem;
`;



// 로그인 안 했을 때
const WarnWrap = styled.div`
    height:100vh;
    text-align:center;
`;

const WarnP = styled.p`
    line-height:100vh;
    font-size:1.5rem;
`;