import { useState } from "react";
import { Terminal } from "@/components/Terminal";
import { BootPreloader } from "@/components/BootPreloader";

const Index = () => {
  const [isBooted, setIsBooted] = useState(() => {
    return !!sessionStorage.getItem("hasBooted");
  });

  const handleBootComplete = () => {
    sessionStorage.setItem("hasBooted", "true");
    setIsBooted(true);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", overflow: "hidden", background: "#050505" }}>
      {isBooted ? (
        <Terminal />
      ) : (
        <BootPreloader onComplete={handleBootComplete} />
      )}
    </div>
  );
};

export default Index;

