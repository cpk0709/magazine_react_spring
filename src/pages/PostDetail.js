import { useEffect } from 'react';
import post, {actionCreators as postActions} from "../redux/modules/post";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const PostDetail = (props) => {
    
    const dispatch = useDispatch();

    const post_id = props.match.params.post_id;
    // 여기서는 왜 객체냐...
    const post_list = useSelector((store) => store.post.list);
    const post = Array.from(post_list).find((p) => p.postNo === parseInt(post_id));
    console.log(post);
    // 포스트 아이디 받아옴
    // const post_id = props.match.params.post_id;
    // console.log(post_id);
    
    // 리스트에서 불러올 것이지만 리스트에는 하나만 들어있을것임.


    return (
        <Wrap>
            <PostHeader>
                <PostUserInfo>
                    <PostUserProfile/>
                    <PostUserName>{post.nickname}</PostUserName>
                </PostUserInfo>
                <PostEdit>
                    <PostTime>
                        {post.createdAt}
                    </PostTime>
                </PostEdit>
            </PostHeader>
            <PostContents>
                <PostImage images={post.images} />
                <PostContent>
                    {post.postContents}
                </PostContent>
            </PostContents>
            <CommentBtn>
                댓글 {post.likes} 개
            </CommentBtn>
        </Wrap>
    )
}

export default PostDetail;

const Wrap = styled.div`
    width:100%;
    height:auto;
    background-color:#111;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:flex-start;
    padding:1rem 0;
`;


const PostHeader = styled.div`
    width:100%;
    height: 10%;
    background-color:transparent;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 10px;
`;

// 포스트 유저 프로필,닉네임
const PostUserInfo = styled.div`
    display:flex;
    align-items:center;
`;

const PostUserProfile = styled.div`
    width:2em;
    height: 2em;
    background-color:lavender;
    border-radius:100%;
    margin-right:5px;
`;

const PostUserName = styled.span`
    font-size:0.7em;
    font-weight:700;
`;
// 포스트 작성시간, 수정버튼
const PostEdit = styled.div`
    
`;

const PostTime = styled.span`
    font-size:0.8em;
    font-weight:700;
    margin:10px;
`;

// 포스트 컨텐츠

const PostContents = styled.div`
    width:100%;
    height:75%;
`;

const PostContent = styled.div`
padding:0 10px;
margin-bottom:20px;
`;



const PostImage = styled.img`
    width:100%;
    height:450px;
    background-color:lightgoldenrodyellow;
    background-image:url(${(props) => props.images ? props.images : "http://via.placeholder.com/400x300"});
    background-size:cover;
    background-position:center;
    margin-bottom:20px;
`;

const CommentBtn = styled.button`
    margin-left:10px;
`;