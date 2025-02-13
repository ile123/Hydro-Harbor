import { ModalProps } from "@/types/components/ModalProps";
import React, { FC } from "react";
import CloseIcon from "./close-icon";

const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-[#393E46] rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <h2 className="text-xl font-semibold text-black dark:text-white text-center">{title}</h2>
        <div className="mt-4 text-center">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
