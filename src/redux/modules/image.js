import {createAction,handleActions} from "redux-actions";
import produce from 'immer';
import { instance } from '../../axios';

const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIRW = "SET_PREVIEW";

const uploading = createAction(UPLOADING,(uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE,(image_url) => ({image_url}));
const setPreview = createAction(SET_PREVIRW,(preview) => ({preview}));

const initialState = {
    image_url : '',
    uploading:false,
    preview:null
}

const uploadImageAction = (image) => {
    return async function(dispatch,getState,{history}){
        dispatch(uploading(true));

        if(image){
            const formData = new FormData();
            formData.append('images',image);

            await instance({
                method:'post',
                url : '/posts',
                data:formData,
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then((res) => {
                console.log(res);
                console.log("업로드 성공");
                dispatch(uploadImage(image));
            }).catch((error) => {
                console.log(error);
            });
        }
    }
}

export default handleActions({
    [UPLOADING] : (state,action) => produce(state,(draft) => {
        draft.uploading = action.payload.uploading;
    }),
    [UPLOAD_IMAGE] : (state,action) => produce(state,(draft) => {
        draft.image_url = action.payload.image_url;
        draft.uploading = false;
    }),
    [SET_PREVIRW] : (state,action) => produce(state,(draft) => {
        draft.preview = action.payload.preview;
    })
},initialState);

const actionCreators = {
    uploading,
    uploadImage,
    uploadImageAction,
    setPreview
}

export {actionCreators};