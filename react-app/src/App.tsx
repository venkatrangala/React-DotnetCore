import React, {useContext} from 'react';
import AuthContext from './Context/AuthContext';

function App() {
  const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  console.log(user);
  return (
<h1>Place holder</h1>
  )
}

export default App;
