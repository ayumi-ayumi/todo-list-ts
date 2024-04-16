import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebase/BaseConfig';
import { User } from 'firebase/auth';

const AuthContext = createContext();
type UserType = User | null;

export function useAuthContext() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<UserType>(null);
  const [loading, setLoading] = useState(true);

  const value = {
    user,
    loading,
  };
  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      console.log(user);
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}