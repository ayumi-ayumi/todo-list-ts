import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebase/BaseConfig';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// const authContext = createContext();
type UserType = User | null;

// export function useauthContext() {
//   return useContext(authContext);
// }

// export function AuthProvider({ children }) {
//   const [currentUser, setCurrentUser] = useState<UserType>(null);
//   // const [loading, setLoading] = useState(true);

//   const value = {
//     currentUser,
//     // loading,
//   };
//   useEffect(() => {
//     const unsubscribed = auth.onAuthStateChanged((currentUser) => {
//       console.log(currentUser);
//       setCurrentUser(currentUser);
//       // setLoading(false);
//     });
//     return () => {
//       unsubscribed();
//     };
//   }, []);

//   return <authContext.Provider value={value}>{children}</authContext.Provider>;
// }

// type InitialState = {currentUser: User | null};
// export const authContext = createContext<InitialState>({ currentUser: null });

// export const authContextProvider = ({children,}: {children: React.ReactNode,}) => {
//   const [currentUser, setCurrentUser] = useState<InitialState>();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser?.emailVerified) {
//         setCurrentUser(currentUser);
//       } else {
//         setCurrentUser(null);
//       }
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <authContext.Provider value={{ currentUser }}>
//       {children}
//     </authContext.Provider>
//   );
// };

 export const authContext = createContext({currentUser: {} as User | null, setCurrentUser: (_user:User) => {}, logOut: () => {}});

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate()

  // const createUser = (email, password) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password);
  // };

  // const loginUser = (email, password) => {
  //   setLoading(true);
  //   return signInWithEmailAndPassword(auth, email, password);
  // };

  // const logOut = () => {
  //   setLoading(true);
  //   return signOut(auth);
  // };

  useEffect(() => {
    // const unsubcribe = onAuthStateChanged(auth, (user) => {
    //   console.log("Current value of the current currentUser", user);
    //   setCurrentUser(user);
    //   setLoading(false);
    // });

    // return () => {
    //   unsubcribe();
    // };
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setCurrentUser(user)
      }
    })
    return unsubscribe
  }, [setCurrentUser]);

  async function logOut() {
    await signOut(auth);
    setCurrentUser(null)
    navigate("/", { replace: true });
  }

  const authValue = {
    // createUser,
    currentUser,
    setCurrentUser,
    // loginUser,
    logOut,
    loading,
  };

  return (
    <authContext.Provider value={authValue}>{children}</authContext.Provider>
  );
};



// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };