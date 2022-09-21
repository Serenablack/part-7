// import { blogNotific } from "../reducers/notificationReducer";

import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification !== null)
    return (
      <div className={notification.type === "success" ? "success" : "error"}>
        {notification.message}
      </div>
    );
};
export default Notification;
