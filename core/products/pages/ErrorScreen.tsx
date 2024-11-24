import React from "react";

interface ErrorScreenProps {
  message: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ message }) => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium text-red-500">{message}</p>
    </section>
  );
};

export default ErrorScreen;
