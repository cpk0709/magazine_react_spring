import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {actionCreators as imageActions} from "../redux/modules/image";
import styled from 'styled-components';


const Upload = () => {
    const dispatch = useDispatch();
    const is_uploading = useSelector(store => store.image.uploading);
    // 이미지 태그 select
    const fileInput = React.useRef();

    // 이미지 선택시 실행 함수
    const selectFile = () => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];

        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
            // image 리덕스에 미리보기 state에 등록
            dispatch(imageActions.setPreview(reader.result));
        }
    }

    return(
        <>
            <Input type="file" ref={fileInput} onChange={selectFile} disabled={is_uploading}/>
        </>
    )
}

export default Upload;

const Input = styled.input`
    margin:20px 0;
`;
