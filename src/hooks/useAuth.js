// src/hooks/useAuth.js

import { useContext } from "react";
// Import AuthContext từ file context của nó
import { AuthContext } from "../contexts/AuthContext";

// Hook này bây giờ nằm trong file riêng của nó.
export const useAuth = () => {
  return useContext(AuthContext);
};
