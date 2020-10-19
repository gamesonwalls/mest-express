import React, { useState, createContext, useContext } from 'react'

const loginContext = createContext();

// Hook for child components to get the count object ...
// ... and re-render when it changes.

function useLogin() {
  const context = useContext(loginContext)
  if (!context) {
    throw new Error(`usecount must be used within a countProvider`);
  }
  return context;
}



// Provider hook that creates count object and handles state
function useProviderLogin () {
  const [isLogin, setLogin] = useState(false);
  const [userName,setuserName]=useState('')


  //method on count object that allows changing of them 
  const handleLogin = () => {
    setLogin(false)
    console.log("user login",isLogin)
  }

  const handleLogout = () => {
    setLogin(false)
  }

  const handleUsername = (user) => {
    setuserName(user)
    console.log("user name set",userName)
  }



  return {
    handleUsername,
    handleLogin,
    handleLogout,
    isLogin,
    userName
  };
}



// Provider component that wraps your app and makes count object ...
// ... available to any child component that calls usecount().
function LoginProvider({ children }) {
  const details = useProviderLogin();
  return <loginContext.Provider value={details}>{children}</loginContext.Provider>;
}

export { LoginProvider, useLogin }