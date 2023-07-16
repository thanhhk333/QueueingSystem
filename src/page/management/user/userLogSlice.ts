import { Action, ThunkAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import firebase from "firebase/compat/app";

const userLogSlice = createSlice({
    name: "userLog",
    initialState: { data: [] },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setData } = userLogSlice.actions;

export default userLogSlice.reducer;

export const getUserLog =
    (): ThunkAction<void, RootState, null, Action<string>> =>
    async (dispatch) => {
        try {
            const snapshot = await firebase
                .firestore()
                .collection("userLog")
                .orderBy("time", "desc")
                .get();
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            dispatch(setData(data));
        } catch (error) {
            console.log(error);
        }
    };

export const createUserLog =
    (data: any): ThunkAction<void, RootState, null, Action<string>> =>
    async (dispatch) => {
        try {
            await firebase.firestore().collection("userLog").add(data);
            dispatch(getUserLog());
        } catch (error) {
            console.log(error);
        }
    };
