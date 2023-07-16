import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../store";
import firebase from "firebase/compat/app";

export interface ServiceType {
    id: string;
    idService: string;
    name: string;
    description: string;
    status: string;
    des?: string | React.ReactNode;
    update?: string | React.ReactNode;
}

interface ServiceState {
    data: ServiceType[];
    loading: boolean;
    error: string | null;
    selectedService: ServiceType | null; // Add selectedService property
}

const initialState: ServiceState = {
    data: [],
    loading: false,
    error: null,
    selectedService: null, // Initialize selectedService as null
};

const serviceSlice = createSlice({
    name: "service",
    initialState,
    reducers: {
        fetchServiceStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchServiceSuccess(state, action: PayloadAction<ServiceType[]>) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchServiceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addServiceStart(state) {
            state.loading = true;
            state.error = null;
        },
        addServiceSuccess(state, action: PayloadAction<ServiceType>) {
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addServiceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateServiceStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateServiceSuccess(state, action: PayloadAction<ServiceType>) {
            const updatedService = action.payload;
            const existingService = state.data.find(
                (service) => service.id === updatedService.id
            );
            if (existingService) {
                Object.assign(existingService, updatedService);
            }
            state.loading = false;
            state.error = null;
        },
        updateServiceFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        detailService(state, action: PayloadAction<string>) {
            const serviceId = action.payload;
            const service = state.data.find((item) => item.id === serviceId);
            if (service) {
                // Thực hiện các tác động mong muốn với đối tượng `service`
                console.log(service);
            }
        },
    },
});

export const {
    fetchServiceStart,
    fetchServiceSuccess,
    fetchServiceFailure,
    addServiceStart,
    addServiceSuccess,
    addServiceFailure,
    updateServiceStart,
    updateServiceSuccess,
    updateServiceFailure,
    detailService,
} = serviceSlice.actions;

export default serviceSlice.reducer;

export const fetchService = (): AppThunk => async (dispatch: any) => {
    try {
        dispatch(fetchServiceStart());
        const serviceRef = firebase.firestore().collection("services");
        const snapshot = await serviceRef.get();
        const serviceData: ServiceType[] = snapshot.docs.map((doc: any) => {
            const service = doc.data() as ServiceType;
            service.id = doc.id;
            return service;
        });
        dispatch(fetchServiceSuccess(serviceData));
    } catch (error: any) {
        dispatch(fetchServiceFailure(error.message));
    }
};

export const addService =
    (newService: ServiceType): AppThunk =>
    async (dispatch: any) => {
        try {
            dispatch(addServiceStart());
            const serviceCollection = firebase
                .firestore()
                .collection("services");
            await serviceCollection.add(newService);
            dispatch(addServiceSuccess(newService));
            // Redirect to the service management page
            window.location.href = "/service";
        } catch (error: any) {
            dispatch(addServiceFailure(error.message));
        }
    };

export const updateService =
    (updatedService: ServiceType): AppThunk =>
    async (dispatch: any) => {
        try {
            dispatch(updateServiceStart());
            const { id, ...updatedData } = updatedService;
            const serviceRef = firebase
                .firestore()
                .collection("services")
                .doc(id);
            await serviceRef.update(updatedData);
            dispatch(updateServiceSuccess(updatedService));
            // Redirect to the service management page
            window.location.href = "/service";
        } catch (error: any) {
            dispatch(updateServiceFailure(error.message));
        }
    };
export const getServiceDetail =
    (id: string): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(detailService(id));
        } catch (error: any) {
            // Xử lý lỗi khi không tìm thấy chi tiết thiết bị
            console.error(error.message);
        }
    };
