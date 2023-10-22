import { useEffect, useState } from "react";

export const useOrigin = () => {
  const [mounted, setMounted] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setMounted(true);
    setOrigin(window.location.origin);
  }, []);

  if (!mounted) {
    return "";
  }

  return origin;
};
