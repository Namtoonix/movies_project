/* eslint-disable react-hooks/exhaustive-deps */
import { EffectCallback, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  message: string;
  type?: string;
}

const ToastMessage = (props: IProps) => {
  const { message, type } = props;

  const useEffectDidUpdate = (effect: EffectCallback) => {
    useEffect(effect, [message]);
  };

  useEffectDidUpdate(() => {
    if (message) {
      toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  });

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

ToastMessage.defaultProps = {
  type: "error",
};

export default ToastMessage;
