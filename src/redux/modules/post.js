import {produce} from 'immer';
import { createAction, handleActions } from 'redux-actions';
import {setCookie,getCookie,deleteCookie} from "../../shared/Cookie";
import {instance} from "../../axios";

import moment from "moment";

// Actions
const LOAD = 'posts/LOAD';
const ADD_POST = 'posts/ADD_POST';
const LOAD_DETAIL = 'posts/LOAD_DETAIL';
const EDIT_POST = 'posts/EDIT_POST';
const DEL_POST = 'posts/DEL_POST';

const initialState = {
    list:[]
}

const initialPost = {
    // postNo:0,
    postTitle:"",
    postContents:"",
    nickname:"roadkill",
    images:"",
    // createdAt:"2022-01-01 17:30:00", 
    // likes:125,
    // views:753
}

// actions creator
const load = createAction(LOAD,(post_list) => ({post_list}));
const addPost = createAction(ADD_POST,(post) => ({post}));
const loadDetail = createAction(LOAD_DETAIL,(post) => ({post}));
const editPost = createAction(EDIT_POST,(post_id,post) => ({post_id,post}));
const delPost = createAction(DEL_POST,(post_id) => ({post_id}));

// middleware
const loadAction = () => {
    return async function(dispatch, getState, {history}){
        await instance
        .get("/posts")
        .then((res) => {
            // console.log(res.data);

            // console.log("포스트 가져오기 성공");
            // Array.from(res.data).map((post) => {
            //     console.log(post);
            // })

            // console.log(...res.data);

            dispatch(load(res.data));
        }).catch((error) => {
            console.log(error);
        });
    }
}

const addPostAction = (image_url="",contents="") => {
    // console.log(image_url,contents);
    return function(dispatch,getState,{history}){
        const username = getState().user.user.user_id;
        
        const post = {
            ...initialPost,
            postContents : contents,
            // 닉네임으로 변경해야함
            nickname : username,
            images:"https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg"
            // images : image_url,
            // createdAt : moment().format("YYYY-MM-DD hh:mm:ss"),
            // likes : "17",
            // views : "59"
        }

        console.log(post);

        instance
        .post("/posts",post)
        .then((res) => {
            console.log(res);
            console.log("포스트 등록완료");
            dispatch(addPost(post));
            history.push("/");
        }).catch((error) => {
            console.log(error);
        });
    }
}

const loadDetailAction = (post_id) => {
    return function(dispatch,getState,{history}){

        instance
        .get(`/posts/${post_id}`)
        .then((res) => {
            console.log(res);
            console.log('해당 게시물이 존재합니다.');
            // 불러온 response를 initialState의 형식으로 가공
            // code here
            // const post = null;

            // 가공한 객체 리덕스 state에 포스트 하나 저장
            // dispatch(load(post));


            history.push(`/detail/${post_id}`);
        }).catch((error) => {
            console.log(error);
            console.log('해당 게시물이 존재하지않습니다.');
        })
    }
}

const editPostAction = (postNo = null, post = {}) => {
    return async function(dispatch, getState, {history}){
        if(!postNo){
            console.log("게시물 정보가 없습니다.");
            return;
        }
        // const _image = getState().image.preview;
        // console.log(_image);
        // console.log(postNo,post);
        await instance
        .put(`/posts/${postNo}`,post)
        .then((res) => {
            console.log(res);
            console.log("수정 완료!");

            dispatch(editPost(postNo,post))
            history.push("/");
        }).catch((error) => {
            console.log(error);
        });
    }
}

const deletePostAction = (postNo) => {
    return function(dispatch,getState,{history}){
        if(!postNo){
            console.log("게시물 정보가 없습니다.");
            return;
        }
        instance
        .delete(`/posts/${postNo}`)
        .then((res) => {
            console.log(res);
            console.log("삭제완료");

            dispatch(delPost(postNo));
            history.push("/");
        }).catch((error) => {
            console.log(error);
        })
    }
}


export default handleActions(
    {
        [LOAD] : (state,action) => produce(state,(draft) => {
            // console.log(action.payload.post_list);
            draft.list.push(...action.payload.post_list);
        }),
        [ADD_POST] : (state,action) => produce(state,(draft) => {
            draft.list.unshift(action.payload.post);
        }),
        [EDIT_POST] : (state,action) => produce(state,(draft) => {

            let idx = draft.list.findIndex((p) => {
                return p.postNo === parseInt(action.payload.post_id) 
            });
            draft.list[idx] = {...draft.list[idx], ...action.payload.post};
        }),
        [DEL_POST] : (state,action) => produce(state,(draft) => {
            draft.list.filter((p) => p.postNo !== parseInt(action.payload.post_id) );
        })
    }, initialState
);

const actionCreators = {
    load,
    addPost,
    loadDetail,
    editPost,
    loadAction,
    addPostAction,
    loadDetailAction,
    editPostAction,
    deletePostAction
}

export {actionCreators};