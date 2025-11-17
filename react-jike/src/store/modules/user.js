import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils/request';
import { setToken as _setToken, getToken, removeToken } from '@/utils/token';



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
        },
        clearUserInfo: (state) => {
            state.token = '';
            state.userInfo = {};
            removeToken();
        }
    }
})

// 结构出 actionCreators函数
const { setToken, setUserInfo, clearUserInfo } = userStore.actions;

// 解构出 reducer 函数
const userReducer = userStore.reducer;

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        try {
            const res = await request.post('/authorizations', loginForm);
            dispatch(setToken(res.data.data.token));
        } catch (error) {
            console.log(error);
        }
    }
}

const fetchUserInfo = () => {
    return async(dispatch) => {
        try {
            const res = await request.get('/user/profile');
            dispatch(setUserInfo(res.data.data));
        } catch (error) {
            console.log(error);
        }
    }
}

export { fetchLogin, fetchUserInfo, clearUserInfo };
export default userReducer;
