import React from "react";

interface LoadingScreenProps {
  message: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message }) => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <p className="text-lg font-medium">{message}</p>
    </section>
  );
};

export default LoadingScreen;
