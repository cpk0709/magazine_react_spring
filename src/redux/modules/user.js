import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {setCookie,getCookie,deleteCookie} from "../../shared/Cookie";
import {instance} from "../../axios";

const LOG_IN = "user/LOG_IN";
const LOG_OUT = "user/LOG_OUT";
const GET_USER = "user/GET_USER";
const SIGNUP_USER = "user/SIGNUP_USER"

// state
const initialState = {
    user:null,
    is_login:false
}

// 기존 Action Creators
// export function login(user){
//     return { type:LOG_IN, user};
// }

// redux-actions를 이용한 Action Creators
const login = createAction(LOG_IN,(user) => ({user}));
const logout = createAction(LOG_OUT,() => ({}));
const getUser = createAction(GET_USER,(user) => ({user}));
const signupUser = createAction(SIGNUP_USER,(user) => ({user}));

// middleware section

const loginAction = (user) => {
    return function (dispatch, getState,{history}){

        const userInfo = {
            username : user.user_id,
            password : user.user_pwd
        }

        // const username = user.user_id;
        // const password = user.user_pwd;
        
        instance
        .post("/login",userInfo)
        .then((res) => {
            dispatch(login(user));
            history.push("/");
            console.log(res);
            console.log("로그인성공");
        }).catch((error) => {
            console.log(error);
        });

    // //////////////fetch or axios 작성
    // const urlAddress = "http://3.38.106.41/";
    // const urlAddress = "http://3.38.106.41:8080/api/login";
    // // 참고 http://3.38.106.41:8080/api/register
    //     axios({
    //         url:urlAddress,
    //         method:'post',
    //         data:{
    //             username:user.user_id,
    //             password:user.user_pwd
    //         }
    //     }).then((res) => {
    //         console.log(res);
    //         dispatch(login(user));
    //         history.push("/");
    //     }).catch((erroe) => {
    //         console.log("로그인에 실패했습니다.",erroe);
    //     });

        //////////////////
        // const string = { username: "adf", pw: "asdf", nickname: "asaaa" };

        // // const jsonData = JSON.stringify(string); (object to string)
        // const jsonData = eval(string); // string to object
        // console.log(typeof jsonData);

        // axios
        //     .get("http://3.38.106.41:8080/api/posts", {}) // 3번째 인자는 토큰?
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        //////////////////

        // dispatch(login(user));
        // history.push("/");
    }
}

const logoutAction = () => {
    return function(dispatch,getState,{history}){
        dispatch(logout());
        console.log("logout!!");
        history.push("/login");
    }
}

const signupAction = (user) => {
    return function (dispatch, getState, {history}){
        console.log(user);
        const userInfo = {
            username : user.user_id,
            nickname : user.user_nickname,
            email : user.user_email,
            password : user.user_pwd
        }

        instance
        .post("/register",userInfo)
        .then((res) => {
            dispatch(signupUser(user));
            history.push("/login");
            console.log(res);
            console.log("회원가입 성공");
        }).catch((error) => {
            console.log(error);
        });
    }
}


// 기존 Reducer
// export default function reducer(state = {initialState}, action = {}){
//     switch(action.type){
//         case "user/LOG_IN":{
            
//         }
//         default : return state;
//     }
// }

// redux-actions를 이용한 Reducer
export default handleActions({
    [LOG_IN]:(state,action) => 
        produce(state,(draft) => {
            setCookie("is_login","success");
            draft.user = action.payload.user;
            draft.is_login = true;
        })
    ,
////////////////////////////////////바로아래 괄호때문에 draft 안 되고 개고생함... 괄호 조심!
    // [LOG_IN]: (state, action) => {   <-이거
    // produce(state, (draft) => {
    //   setCookie("is_login", "success");
    //   console.log(draft);
    //   console.log(draft.user);
    //   draft.user = action.payload.user;
    //   draft.is_login = true;
    //   // console.log(draft.user);
    // }),
    // }
    
    [LOG_OUT]:(state,action) => 
        produce(state,(draft) => {
            deleteCookie("is_login");
            draft.user = null;
            draft.is_login = false;
        })
    ,
    [GET_USER]:(state,action) => 
        produce(state,(draft) => {})
    ,
},initialState);

// 액션생성함수 export
const actionCreators = {
    login,
    logout,
    getUser,
    loginAction,
    logoutAction,
    signupAction
};

export {actionCreators};