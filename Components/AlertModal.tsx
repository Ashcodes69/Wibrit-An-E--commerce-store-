import React from "react";
import { FaCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { MdQuestionMark } from "react-icons/md";

interface AlertModalProps {
  showAlert: boolean;
  message: string;
  success: boolean;
  onClose: () => void;
  confirmation?: boolean;
  onConfirm?: () => void;
}
function AlertModal({
  showAlert,
  message,
  success,
  onClose,
  confirmation,
  onConfirm,
}: AlertModalProps) {
  return (
    <>
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-purple-100 border border-purple-600 rounded-xl shadow-xl p-6 w-72 sm:w-96 text-center">
            {confirmation ? (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-yellow-200 animate-bounce mb-3">
                  <MdQuestionMark className="text-yellow-700 text-3xl" />
                </div>
                <p className="text-lg font-semibold text-yellow-900 mb-4">
                  {message}
                </p>
              </div>
            ) : success ? (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-green-300 animate-bounce mb-3">
                  <FaCheck className="text-green-700 text-3xl" />
                </div>
                <p className="text-lg font-semibold text-green-900 mb-4">
                  {message}
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 flex items-center justify-center rounded-full bg-red-300 animate-bounce mb-3">
                  <IoCloseSharp className="text-red-700 text-3xl" />
                </div>
                <p className="text-lg font-semibold text-red-900 mb-4">
                  {message}
                </p>
              </div>
            )}
            {confirmation ? (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-full transition shadow-md"
                >
                  NO
                </button>
                <button
                  onClick={() => {
                    if (onConfirm) {
                      onConfirm();
                    }
                  }}
                  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full transition shadow-md"
                >
                  YES
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  onClose();
                }}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full transition shadow-md"
              >
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default AlertModal;
