import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    newNotification(_, action) {
      const notification = action.payload;
      return notification;
    },
    clearNotification() {
      return "";
    },
  },
});

export default notificationSlice.reducer;
export const { newNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (notification, timeoutInSeconds) => {
  return async (dispatch) => {
    dispatch(newNotification(notification));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeoutInSeconds * 1000);
  };
};
