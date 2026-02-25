import { createSlice, type PayloadAction, type Dispatch } from "@reduxjs/toolkit";

interface Notification {
    id: string;
    message: string;
}

interface NotificationState {
    notifications: Notification[];
}

const initialState: NotificationState = {
    notifications: [],
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification(state, action: PayloadAction<Notification>) {
            state.notifications.push(action.payload);
        },
        removeNotification(state, action: PayloadAction<string>) {
            state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
        }
    }
});

const { addNotification, removeNotification } = notificationSlice.actions;

export const showNotification = (message: string) => (dispatch: Dispatch) => {
    if (message.trim() === "") {
        return;
    }

    const id = Math.random().toString(36);

    dispatch(addNotification({
        id,
        message,
    }));

    setTimeout(() => {
        dispatch(removeNotification(id));
    }, 3000);
}

export default notificationSlice.reducer;