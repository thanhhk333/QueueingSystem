import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import firebase from "firebase/compat/app";

export interface DataType {
    id: string;
    idDevice: string;
    name: string;
    IpAddress: string;
    status: string;
    statusWork: string;
    service: string;
    userName: string;
    password: string;
    type: string;
    des?: string | React.ReactNode;
    update?: string | React.ReactNode;
}

interface DeviceState {
    data: DataType[];
    loading: boolean;
    error: string | null;
}

const initialState: DeviceState = {
    data: [],
    loading: false,
    error: null,
};

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        fetchDeviceStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDeviceSuccess(state, action: PayloadAction<DataType[]>) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchDeviceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addDeviceStart(state) {
            state.loading = true;
            state.error = null;
        },
        addDeviceSuccess(state, action: PayloadAction<DataType>) {
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addDeviceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateDeviceStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateDeviceSuccess(state, action: PayloadAction<DataType>) {
            const index = state.data.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.data[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },
        updateDeviceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        detailDevice(state, action: PayloadAction<string>) {
            const deviceId = action.payload;
            const device = state.data.find((item) => item.id === deviceId);
            if (device) {
                // Thực hiện các tác động mong muốn với đối tượng `device`
                console.log(device);
            }
        },
    },
});

export const {
    fetchDeviceStart,
    fetchDeviceSuccess,
    fetchDeviceFailure,
    addDeviceStart,
    addDeviceSuccess,
    addDeviceFailure,
    updateDeviceStart,
    updateDeviceSuccess,
    updateDeviceFailure,
    detailDevice,
} = deviceSlice.actions;

export default deviceSlice.reducer;

export const fetchDevice = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchDeviceStart());
        const deviceRef = firebase.firestore().collection("devices");
        const snapshot = await deviceRef.get();
        const deviceData: DataType[] = snapshot.docs.map((doc: any) => {
            const device = doc.data() as DataType;
            device.id = doc.id;
            return device;
        });
        dispatch(fetchDeviceSuccess(deviceData));
    } catch (error: any) {
        dispatch(fetchDeviceFailure(error.message));
    }
};

export const addDevice =
    (newDevice: DataType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(addDeviceStart());
            const deviceCollection = firebase.firestore().collection("devices");
            await deviceCollection.add(newDevice);
            dispatch(addDeviceSuccess(newDevice));
        } catch (error: any) {
            dispatch(addDeviceFailure(error.message));
        }
    };

export const updateDevice =
    (updatedDevice: DataType): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(updateDeviceStart());
            const { id, ...data } = updatedDevice;
            const deviceRef = firebase
                .firestore()
                .collection("devices")
                .doc(id);
            await deviceRef.update(data);
            dispatch(updateDeviceSuccess(updatedDevice));
            window.location.href = "/device";
        } catch (error: any) {
            dispatch(updateDeviceFailure(error.message));
        }
    };
export const getDeviceDetail =
    (id: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(detailDevice(id));
        } catch (error: any) {
            // Xử lý lỗi khi không tìm thấy chi tiết thiết bị
            console.error(error.message);
        }
    };
