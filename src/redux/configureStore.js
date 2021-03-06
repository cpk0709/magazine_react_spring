import {createStore,combineReducers,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import { connectRouter } from 'connected-react-router';

import Post from "./modules/post";
import User from "./modules/user";
import Image from "./modules/image";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    post:Post,
    user:User,
    image:Image,
    router:connectRouter(history)
});

const middlewares = [thunk.withExtraArgument({history:history})];
// 지금 어느 환경인지 알려준다고... 왜쓰는건지..
const env = process.env.NODE_ENV;

if(env === "development"){
    const {logger} = require("redux-logger");
    middlewares.push(logger);
}

const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares)
    );

    let store = (initialStore) => createStore(rootReducer, enhancer);

    export default store();
    
