import { createContext, useState, useContext, useEffect } from 'react';
import { auth } from './firebase/BaseConfig';
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();
type UserType = User | null;

// export function useauthContext() {
//   return useContext(AuthContext);
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

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// type InitialState = {currentUser: User | null};
// export const AuthContext = createContext<InitialState>({ currentUser: null });

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
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

export const AuthContext = createContext({ 
  currentUser: {} as User | null, 
  setCurrentUser: (_user: User) => { }, 
  logOut: () => { } 
});

export default function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState("");

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
      if (user) {
        setCurrentUser(user)
        setLoading(false);
        console.log(user)
      } else {
        setCurrentUser(null)
      }
    })
    // return unsubscribe
    return () => {
      unsubscribe();
    };
  }, [currentUser]);

  // function logIn() {
  //   // function logIn(e: any) {
  //   // e.preventDefault();
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       console.log(userCredential.user);
  //       navigate("/todolist"); // 登録成功後のリダイレクトページを設定してください。

  //       // Signed in
  //       // const user = userCredential.user;
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }

  async function logOut() {
    await signOut(auth);
    setCurrentUser(null)
    console.log("logout", currentUser)
    navigate("/", { replace: true });
  }

  const authValue = {
    currentUser,
    setCurrentUser,
    // logIn,
    logOut,
    // error,
    loading,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};



// AuthProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };