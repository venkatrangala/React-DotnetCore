import React, { useContext, useState, useEffect, createContext } from 'react'
import AuthService from '../Services/AuthService'



interface IUser{
    userName: string,
    password: string
}

// Initial State
const initialState : IUser = {
    userName: "",
    password: ""
}
  
export const AuthContext = createContext<IUser>(initialState);


var initializeUser :  IUser = {
    userName: "",
    password: ""
}

export default (props : any) => {
    const [user, setUser] = useState(initializeUser);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, SetIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            SetIsLoaded(true);
        });
    }, []);

    return (
        <div>
            {
                !isLoaded ? <h1>Loading...</h1> : 
                    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
                        {props.children}
                    </AuthContext.Provider>
            }
        </div>
    )
}