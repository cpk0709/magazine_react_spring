import styled from 'styled-components';
import { history } from '../redux/configureStore';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as postActions} from "../redux/modules/post";
import { min } from 'moment';

const Post = (props) => {

    const dispatch = useDispatch();

    const {post_no,post_title,post_contents,nickname,created_at,likes,views,post_images,is_me} = props;

    // console.log(is_me);

    const gotoDetailPage = () => {
        dispatch(postActions.loadDetailAction(post_no));
    }

    const gotoEdit = () => {
        history.push(`/write/${post_no}`)
    }

    return(
        <Wrap>
            <PostHeader>
                <PostUserInfo>
                    <PostUserProfile/>
                    <PostUserName>{nickname}</PostUserName>
                </PostUserInfo>
                <PostEdit>
                    <PostTime>
                        {created_at}
                    </PostTime>
                    {props.is_me && <PostEditBtn onClick={gotoEdit}>
                        수정
                    </PostEditBtn>}
                </PostEdit>
            </PostHeader>
            <PostContents>
                <PostContent>
                    {post_contents}
                </PostContent>
                <PostImage backgroundImage={post_images} onClick={gotoDetailPage}/>
            </PostContents>
            <CommentBtn>
                댓글 10 개
            </CommentBtn>
        </Wrap>
    )
}

export default Post;

const Wrap = styled.div`
    width:100%;
    height:70%;
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

const PostEditBtn = styled.button`
    font-weight:700;
`;

// 포스트 컨텐츠

const PostContents = styled.p`
    width:100%;
    height:75%;
`;

const PostContent = styled.div`
margin-bottom:5px;
`;



const PostImage = styled.img`
    width:100%;
    height:300px;
    background-color:lightgoldenrodyellow;
    /* background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4N8RDCP_9HqsYg_c357CbPfSOxNqbRAqu6eZemFfr_75YCGocn3ZWpDnpKnw7M4zebJA&usqp=CAU); */
    background-image:url(${(props) => (props.backgroundImage ? props.backgroundImage : "http://via.placeholder.com/400x300")});
    background-size:cover;
    background-position:center;
    margin-bottom:10px;
`;

const CommentBtn = styled.button`
    margin-left:10px;
`;