import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Toast = {
  id: string;
  message: string | undefined;
  type: "success" | "error" | "warning" | "info";
};

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = {
  toasts: [],
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<Toast, "id">>) => {
      console.log("action.payload => ", action.payload);
      state.toasts.push({ id: crypto.randomUUID(), ...action.payload });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
