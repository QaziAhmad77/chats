import { useEffect, useState } from 'react'; // Import useContext
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { authContext } from './authContext';

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => {
      unsub();
    };
  }, []);

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
