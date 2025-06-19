import * as React from "react";

type ConnectionStatus = "online" | "offline" | "loading";
const useConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] =
    React.useState<ConnectionStatus>("loading");
  React.useEffect(() => {
    setConnectionStatus("online");
    const online = () => setConnectionStatus("online");
    const offline = () => setConnectionStatus("offline");
    // capture passively
    window.addEventListener("online", online, { passive: true, capture: true });
    window.addEventListener("offline", offline, {
      passive: true,
      capture: true,
    });

    return () => {
      // capture passively
      window.removeEventListener("online", online);
      window.removeEventListener("offline", offline);
    };
  }, []);

  return connectionStatus;
};

export { useConnectionStatus };
