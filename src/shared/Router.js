import {ConnectedRouter} from "connected-react-router";
import { history } from '../redux/configureStore';
import {Switch,Route} from "react-router-dom";
import {Provider} from "react-redux";
import store from '../redux/configureStore';

import PostList from '../pages/PostList';
import PostWrite from '../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

import styled from 'styled-components';

import Header from '../components/Header';

const Router = () => {
    return(
        <>
            <Provider store={store}>
                <Wrap>
                    <ConnectedRouter history={history}>
                    <Header/>

                    {/* <BrowserRouter> */}
                        <Switch>
                            <Route path="/" exact component={PostList}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/signup" exact component={Signup}/>
                            <Route path="/write" exact component={PostWrite}/>
                            <Route path="/write/:post_id" exact component={PostWrite}/>
                            <Route path="/detail/:post_id" exact component={PostDetail}/>
                        </Switch>
                    {/* </BrowserRouter> */}

                            
                    </ConnectedRouter>
                </Wrap>
            </Provider>

        </>
    )
}

export default Router;

const Wrap = styled.div`
    background-color:#242424;
    width:40vw;
    height:auto;
    margin:auto;
`;