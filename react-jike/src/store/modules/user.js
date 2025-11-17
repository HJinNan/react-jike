import { createSlice } from '@reduxjs/toolkit';
import { request } from '@/utils/request';

const userStore = createSlice({
    name: 'user',
    // state 初始值
    initialState: {
        token: '',
    },
    // 同步更新 state 的方法
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
    }
})

// 结构出 actionCreators函数
const { setToken } = userStore.actions;

// 解构出 reducer 函数
const userReducer = userStore.reducer;

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        const res = await request.post('/authorizations', loginForm);
        dispatch(setToken(res.data.data.token));
    }
}

export { fetchLogin, setToken };
export default userReducer;
