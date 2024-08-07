import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("test-practical")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// import React, { createContext, useContext, useState } from "react";

// interface AuthUser {
//   // Define the type for your authUser here
// }

// interface AuthContextType {
//   authUser: AuthUser | null;
//   setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
// }

// export const AuthContext = createContext<AuthContextType>({
//   authUser: null,
//   setAuthUser: () => null
// });

// export const useAuthContext = () => {
//   return useContext(AuthContext);
// };

// export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
//   children
// }) => {
//   const storedUser = localStorage.getItem("travll-guider");
//   const [authUser, setAuthUser] = useState<AuthUser | null>(
//     storedUser ? JSON.parse(storedUser) : null
//   );

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

