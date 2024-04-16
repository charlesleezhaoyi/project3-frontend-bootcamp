import React, { useEffect } from "react";
import { useState } from "react";

const ErrorAlert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 m-4 z-50 transition-all duration-500 ease-in-out transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      } `}
    >
      <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4">
        <p className="font-bold">Be Warned</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorAlert;
