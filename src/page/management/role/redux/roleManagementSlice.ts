import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../../../store";
import firebase from "firebase/compat/app";

export interface RoleManagementData {
    id: string;
    name: string;
    used?: number;
    des: string;
    // Add other properties as needed
}

interface RoleManagementState {
    data: RoleManagementData[];
    loading: boolean;
    error: string | null;
}

const initialState: RoleManagementState = {
    data: [],
    loading: false,
    error: null,
};

const roleManagementSlice = createSlice({
    name: "roleManagement",
    initialState,
    reducers: {
        fetchRoleManagementStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchRoleManagementSuccess(
            state,
            action: PayloadAction<RoleManagementData[]>
        ) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchRoleManagementFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addRoleStart(state) {
            state.loading = true;
            state.error = null;
        },
        addRoleSuccess(state, action: PayloadAction<RoleManagementData>) {
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addRoleFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateRoleStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateRoleSuccess(state, action: PayloadAction<RoleManagementData>) {
            const updatedRole = action.payload;
            const existingRole = state.data.find(
                (role) => role.id === updatedRole.id
            );
            if (existingRole) {
                Object.assign(existingRole, updatedRole);
            }
            state.loading = false;
            state.error = null;
        },
        updateRoleFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchRoleManagementStart,
    fetchRoleManagementSuccess,
    fetchRoleManagementFailure,
    addRoleStart,
    addRoleSuccess,
    addRoleFailure,
    updateRoleStart,
    updateRoleSuccess,
    updateRoleFailure,
} = roleManagementSlice.actions;

export default roleManagementSlice.reducer;

export const fetchRoleManagement = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchRoleManagementStart());
        const roleManagementRef = firebase.firestore().collection("roles");
        const snapshot = await roleManagementRef.get();
        const roleManagementData: RoleManagementData[] = snapshot.docs.map(
            (doc: any) => {
                const roleManagement = doc.data() as RoleManagementData;
                roleManagement.id = doc.id;
                return roleManagement;
            }
        );
        dispatch(fetchRoleManagementSuccess(roleManagementData));
    } catch (error: any) {
        dispatch(fetchRoleManagementFailure(error.message));
    }
};

export const addRoleManagement =
    (newRoleManagement: RoleManagementData): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(addRoleStart());
            const roleManagementCollection = firebase
                .firestore()
                .collection("roles");
            await roleManagementCollection.add({
                name: newRoleManagement.name,
                des: newRoleManagement.des,
            });
            dispatch(addRoleSuccess(newRoleManagement));
            // Redirect to the role management page
            window.location.href = "/role";
        } catch (error: any) {
            dispatch(addRoleFailure(error.message));
        }
    };

export const updateRoleManagement =
    (updatedRoleManagement: RoleManagementData): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(updateRoleStart());
            const { id, ...updatedData } = updatedRoleManagement;
            const roleManagementRef = firebase
                .firestore()
                .collection("roles")
                .doc(id);
            await roleManagementRef.update(updatedData);
            dispatch(updateRoleSuccess(updatedRoleManagement));
            // Redirect to the role management page
            window.location.href = "/role";
        } catch (error: any) {
            dispatch(updateRoleFailure(error.message));
        }
    };
