import { toast } from "react-toastify";

const setPosition = () => {
  const position = localStorage.getItem("lang") === "ar" ? toast.POSITION.BOTTOM_RIGHT : toast.POSITION.BOTTOM_LEFT;
  return    {
    position
  }
}

const Error = (msg, clear = false) => {
  toast.error(msg, setPosition());
  if (clear) toast.clearWaitingQueue();
};

const Success = (msg, clear = false) => {
  toast.success(msg, setPosition());
  if (clear) toast.clearWaitingQueue();
};
const Info = (msg, clear = false) => {
  toast.info(msg, setPosition());
  if (clear) toast.clearWaitingQueue();
};
const Warning = (msg, clear = false) => {
  toast.warn(msg, setPosition());
  if (clear) toast.clearWaitingQueue();
};

export default {
  Error,
  Success,
  Warning,
  Info,
};
