import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  profile: { open: false, file: null, imgURL: '' },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
      
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

    // update_user: (state, action) => {
    //   state.currentUser = action.payload;
    //   // state.loading = false;
    //   // state.error = false;
    //   // state.profile = action.payload
    // },
    update_profile: (state, action) => {
      state.loading = false;
      state.error = false;
      state.profile = action.payload
    },
    

    // update_profile : (state,action) => {
    //   state.currentUser = action.payload;
    //   state.loading = false;
    //   state.error = false;
    //   profile: { open: false, file: null, photoURL: '' };
    // }
    
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, update_user, update_profile } = userSlice.actions;

export default userSlice.reducer;

// import { createContext, useContext, useEffect, useReducer } from 'react';
// import reducer from './reducer';

// const initialState = {
//   currentUser: null,
//   openLogin: false,
//   loading: false,
//   alert: { open: false, severity: 'info', message: '' },
//   profile: { open: false, file: null, photoURL: '' },
// };

// const Context = createContext(initialState);

// export const useValue = () => {
//   return useContext(Context);
// };

// const ContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (currentUser) {
//       dispatch({ type: 'UPDATE_USER', payload: currentUser });
//     }
//   }, []);
//   return (
//     <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
//   );
// };

// export default ContextProvider;
