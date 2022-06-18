import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);
  if (message === null) {
    return null;
  }
  return <div className={message.messageType}>{message.content}</div>;
};

export default Notification;
