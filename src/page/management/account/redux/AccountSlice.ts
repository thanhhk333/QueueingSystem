import {
    Action,
    createSlice,
    PayloadAction,
    ThunkAction,
} from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../../../store";
import firebase from "firebase/compat/app";

export interface AccountData {
    id: string;
    userName: string;
    fullName: string;
    phone: string;
    email: string;
    password?: string;
    department?: string;
    status: string;
    update?: string | React.ReactNode;
    role: any;
    image?: any;
}

interface AccountState {
    data: AccountData[];
    loading: boolean;
    error: string | null;
    isLoggedIn: boolean;
    userInfo: any;
}

const initialState: AccountState = {
    data: [],
    loading: false,
    error: null,
    isLoggedIn: false,
    userInfo: [],
};

const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        fetchAccountStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchAccountSuccess(state, action: PayloadAction<AccountData[]>) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchAccountFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addAccountStart(state) {
            state.loading = true;
            state.error = null;
        },
        addAccountSuccess(state, action: PayloadAction<AccountData>) {
            state.data.push(action.payload);
            state.loading = false;
            state.error = null;
        },
        addAccountFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateAccountStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateAccountSuccess(state, action: PayloadAction<AccountData>) {
            const updatedAccount = action.payload;
            const existingAccount = state.data.find(
                (account) => account.id === updatedAccount.id
            );
            if (existingAccount) {
                Object.assign(existingAccount, updatedAccount);
            }
            state.loading = false;
            state.error = null;
        },
        updateAccountFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userInfo = {
                ...action.payload,
                role: action.payload.role.id,
            };
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userInfo = null;
        },
    },
});

export const {
    fetchAccountStart,
    fetchAccountSuccess,
    fetchAccountFailure,
    addAccountStart,
    addAccountSuccess,
    addAccountFailure,
    updateAccountStart,
    updateAccountSuccess,
    updateAccountFailure,
} = accountSlice.actions;

export default accountSlice.reducer;

export const fetchAccount = (): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchAccountStart());
        const accountRef = firebase.firestore().collection("accounts");
        const snapshot = await accountRef.get();
        const accountData: AccountData[] = snapshot.docs.map((doc: any) => {
            const account = doc.data() as AccountData;
            account.id = doc.id;
            return account;
        });
        dispatch(fetchAccountSuccess(accountData));
    } catch (error: any) {
        dispatch(fetchAccountFailure(error.message));
    }
};

export const addAccount =
    (newAccount: AccountData): AppThunk =>
    async (dispatch) => {
        try {
            await firebase
                .firestore()
                .collection("accounts")
                .add({
                    ...newAccount,
                    role: firebase.firestore().doc(`roles/${newAccount.role}`),
                });
            dispatch(addAccountSuccess(newAccount));

            window.location.href = "/account";
        } catch (error: any) {
            dispatch(addAccountFailure(error.message));
        }
    };

export const UpdateAccount =
    (updatedAccount: AccountData): AppThunk =>
    async (dispatch) => {
        try {
            dispatch(updateAccountStart());
            const accountCollection = firebase
                .firestore()
                .collection("accounts");
            await accountCollection
                .doc(updatedAccount.id)
                .update(updatedAccount);
            dispatch(updateAccountSuccess(updatedAccount));
            // Redirect to the account management page
            window.location.href = "/account";
        } catch (error: any) {
            dispatch(updateAccountFailure(error.message));
        }
    };
export const getLogin =
    (userName: string, password: string): AppThunk =>
    async (dispatch: any) => {
        try {
            const accountRef = firebase
                .firestore()
                .collection("accounts")
                .where("userName", "==", userName)
                .where("password", "==", password);
            const snapshot = await accountRef.get();
            const accountData: AccountData[] = snapshot.docs.map((doc: any) => {
                const account = doc.data() as AccountData;
                account.id = doc.id;
                return account;
            });
            const account = accountData.find(
                (item) =>
                    item.userName === userName && item.password === password
            );
            if (account) {
                dispatch(accountSlice.actions.login(account));

                window.location.href = "/profile";
            } else {
                alert("Tài khoản hoặc mật khẩu không chính xác");
            }
        } catch (error: any) {
            alert(error.message);
        }
    };
export const getLogout = (): AppThunk => async (dispatch: any) => {
    try {
        dispatch(accountSlice.actions.logout());
        localStorage.setItem("userInfo", JSON.stringify({}));
        localStorage.setItem("isLoggedIn", "false");
        window.location.href = "/";
    } catch (error: any) {
        alert(error.message);
    }
};
