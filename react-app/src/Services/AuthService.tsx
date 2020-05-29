import React from 'react'

export default {
    login: (user: any) => {
        return fetch('/users/login', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(result => result.json)
            .then(data => data);
    },
    register: (user: any) => {
        return fetch('/users/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(result => result.json)
            .then(data => data);
    },
    logout: () => {
        return fetch('/users/logout')
            .then(result => result.json)
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/users/isAuthenticated')
            .then(result => {
                if (result.status !== 401)
                    return result.json.then(data => data);
                else
                    return {isAuthenticated : false, user : {userName: "", role : ""}}
        })
    }
}

