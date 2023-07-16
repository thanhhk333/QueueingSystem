import {
    Action,
    createSlice,
    PayloadAction,
    ThunkAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../store";
import firebase from "firebase/compat/app";

export interface ProgressiveType {
    id: string;
    name: string;
    nameService: any; // Tham chiếu đến đối tượng trong bảng "service"
    grantTime: any;
    exp: any;
    status: string;
    source: string;
    stt: string;
    phone: string;
    email: string;
}

interface ProgressiveState {
    data: ProgressiveType[];
    loading: boolean;
    error: string | null;
    selectedProgressive: ProgressiveType | null; // Add selectedProgressive property
}

const initialState: ProgressiveState = {
    data: [],
    loading: false,
    error: null,
    selectedProgressive: null, // Initialize selectedProgressive as null
};

const progressiveSlice = createSlice({
    name: "progressive",
    initialState,
    reducers: {
        fetchProgressiveStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProgressiveSuccess(
            state,
            action: PayloadAction<ProgressiveType[]>
        ) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchProgressiveFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addProgressiveStart(state) {
            state.loading = true;
            state.error = null;
        },
        addProgressiveSuccess(state, action: PayloadAction<ProgressiveType>) {
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addProgressiveFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateProgressiveStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateProgressiveSuccess(
            state,
            action: PayloadAction<ProgressiveType>
        ) {
            const updatedProgressive = action.payload;
            const existingProgressive = state.data.find(
                (progressive) => progressive.id === updatedProgressive.id
            );
            if (existingProgressive) {
                Object.assign(existingProgressive, updatedProgressive);
            }
            state.loading = false;
            state.error = null;
        },
        updateProgressiveFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        detailProgressive(state, action: PayloadAction<string>) {
            const progressiveId = action.payload;
            const progressive = state.data.find(
                (item) => item.id === progressiveId
            );
            if (progressive) {
                // Thực hiện các tác động mong muốn với đối tượng `progressive`
                console.log(progressive);
            }
        },
    },
});

export const {
    fetchProgressiveStart,
    fetchProgressiveSuccess,
    fetchProgressiveFailure,
    addProgressiveStart,
    addProgressiveSuccess,
    addProgressiveFailure,
    updateProgressiveStart,
    updateProgressiveSuccess,
    updateProgressiveFailure,
    detailProgressive,
} = progressiveSlice.actions;

export default progressiveSlice.reducer;

export const fetchProgressive = (): AppThunk => async (dispatch: any) => {
    try {
        dispatch(fetchProgressiveStart());
        // lấy danh sách theo thứ tự giảm dần của thời gian tạo
        const progressiveRef = firebase
            .firestore()
            .collection("progressive")
            .orderBy("grantTime", "desc");
        const snapshot = await progressiveRef.get();
        const progressiveData: ProgressiveType[] = snapshot.docs.map(
            (doc: any) => {
                const progressive = doc.data() as ProgressiveType;
                progressive.id = doc.id;
                return progressive;
            }
        );

        dispatch(fetchProgressiveSuccess(progressiveData));
    } catch (error: any) {
        dispatch(fetchProgressiveFailure(error.message));
    }
};
export const createProgressive =
    (data: any): ThunkAction<void, RootState, null, Action<string>> =>
    async (dispatch) => {
        try {
            await firebase
                .firestore()
                .collection("progressive")
                .add({
                    ...data,
                    nameService: firebase
                        .firestore()
                        .doc(`services/${data.nameService}`),
                });
            dispatch(fetchProgressive());
        } catch (error) {
            console.log(error);
        }
    };

export const updateProgressive =
    (updatedProgressive: ProgressiveType): AppThunk =>
    async (dispatch: any) => {
        try {
            dispatch(updateProgressiveStart());
            const { id, ...updatedData } = updatedProgressive;
            const progressiveRef = firebase
                .firestore()
                .collection("progressive")
                .doc(id);
            await progressiveRef.update(updatedData);
            dispatch(updateProgressiveSuccess(updatedProgressive));
            // Redirect to the progressive management page
            window.location.href = "/progressive";
        } catch (error: any) {
            dispatch(updateProgressiveFailure(error.message));
        }
    };

export const getProgressiveDetail =
    (id: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(detailProgressive(id));
        } catch (error: any) {
            // Xử lý lỗi khi không tìm thấy chi tiết progressive
            console.error(error.message);
        }
    };
