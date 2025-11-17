import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils/request';
import { setToken as _setToken, getToken } from '@/utils/token';



const userStore = createSlice({
    name: 'user',
    // state 初始值
    initialState: {
        token: getToken() || '',
        userInfo: {}
    },
    // 同步更新 state 的方法
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            _setToken(action.payload);
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        }
    }
})

// 结构出 actionCreators函数
const { setToken, setUserInfo } = userStore.actions;

// 解构出 reducer 函数
const userReducer = userStore.reducer;

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        const res = await request.post('/authorizations', loginForm);
        dispatch(setToken(res.data.data.token));
    }
}

const fetchUserInfo = () => {
    return async(dispatch) => {
        const res = await request.get('/user/profile');
        dispatch(setUserInfo(res.data.data));
    }
}

export { fetchLogin, fetchUserInfo, setToken, setUserInfo };
export default userReducer;
