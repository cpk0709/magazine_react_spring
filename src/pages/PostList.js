import styled from 'styled-components';
import Post from '../components/Post';
import {useDispatch, useSelector} from "react-redux";
import { useHistory } from 'react-router-dom';
import {actionCreators as postActions} from "../redux//modules/post";
import { useEffect } from 'react';

const PostList = (props) => {
    const history = props.history;
    const dispatch = useDispatch();
    // 포스트 수정/삭제를 위해 사용할거임
    const userInfo = useSelector((store) => store.user.user);

    const post_list = useSelector((store) => store.post.list);
    const MoveToWritePage = () => {
        history.push("/write");
    }

    useEffect(() => { 
        dispatch(postActions.loadAction());    
    },[]);

    // console.log(post_list);

    return(
        <Wrap>
            {post_list.map((post,index) => {
                if(post.nickname === userInfo?.user_id){
                    return (
                        <Post key={index} post_no={post.postNo} post_title={post.postTitle}  post_contents={post.postContents} nickname={post.nickname} created_at={post.createdAt} likes={post.likes} views={post.views} post_images={post.images} is_me/>
                    )
                }else{
                    return (
                        <Post key={index} post_no={post.postNo} post_title={post.postTitle}  post_contents={post.postContents} nickname={post.nickname} created_at={post.createdAt} likes={post.likes} views={post.views} post_images={post.images} />
                    )
                }
                
            })}
            <PostAddBtn onClick={MoveToWritePage}>+</PostAddBtn>
        </Wrap>
    )
}

export default PostList;

const Wrap = styled.div`
    width:100%;
    height:100%;
`;

const PostAddBtn = styled.button`
    width:3.5rem;
    height:3.5rem;
    background-color:#111;
    color:#fff;
    font-weight:900;
    font-size:2.5rem;
    line-height:2.5rem;
    text-align:center;
    border:none;
    border-radius:100%;
    position:fixed;
    right:32%;
    bottom:5%;
`;