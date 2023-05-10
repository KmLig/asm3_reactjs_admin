import { useState } from "react";

// const AuthContext = createContext();

export default function useAuth() {
  const [authed, setAuthed] = useState(false);

  return {
    authed,
    login() {
      setAuthed(true);
    },
    logout() {
      setAuthed(false);
    },
  };
}

// export function AuthProvider({ children }) {
//   const auth = useAuth();

//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
// }

// export default function AuthConsumer() {
//   return useContext(AuthContext);
// }
