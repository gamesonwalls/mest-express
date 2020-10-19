import React, { useState, createContext, useContext } from 'react'

const countContext = createContext();

// Hook for child components to get the count object ...
// ... and re-render when it changes.

function useCount() {
  const context = useContext(countContext)
  if (!context) {
    throw new Error(`usecount must be used within a countProvider`);
  }
  return context;
}



// Provider hook that creates count object and handles state
function useProvideCount() {
  const [countLike, setCountLike] = useState(0);
  const [countDisLike, setcountDisLike] = useState(0);

  //method on count object that allows changing of them 
  const fireLikes = () => {
  

    console.log("count likes from firelikes",countLike)
   
    if(countLike===0){
      setCountLike(countLike + 1);
    }else{

    }
    if(countDisLike>0){
      setcountDisLike(countDisLike - 1)
    }else{
      
    }
  }

  const fireDisLikes = () => {
  
    console.log("countLike",countLike)
    if(countDisLike===0){
      setcountDisLike(countDisLike + 1)
    }else{

    }
   
    if(countLike>0){
     // alert("")
      setCountLike(countLike - 1);
    }else{
     
    }
  }


  return {
    countLike,
    countDisLike,
    fireLikes,
    fireDisLikes
  };
}



// Provider component that wraps your app and makes count object ...
// ... available to any child component that calls usecount().
function VotesProvider({ children }) {
  const count = useProvideCount();
  return <countContext.Provider value={count}>{children}</countContext.Provider>;
}

export { VotesProvider, useCount }