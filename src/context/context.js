import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [githubUser, setGithubUser] = useState ();
    const [repos, setRepos] = useState ();
    const [followers, setFollowers] = useState ();
    const [rateLimit, setRateLimit] = useState ({limit: 60, used: 0});
    const [error, setError] = useState ({show: false, msg:''});
    const [loading, setLoading] = useState (true);

    const getData = async (user = 'john-smilga') => {
        setLoading (true);          
        setError ({show: false, msg: ''});
        await Promise.allSettled([
            axios(`${rootUrl}/users/${user}`),
            axios(`${rootUrl}/users/${user}/repos?per_page=100`),
            axios(`${rootUrl}/users/${user}/followers`),
            axios(`${rootUrl}/rate_limit`)
        ])
        .then((results) => {
            const [user, repos, followers, rate] = results;
            const status = 'fulfilled';
            if (user.status === status){
                setGithubUser(user.value.data);
            } else {
                setError({show: true, msg:'no such user'});
            }
            if (repos.status === status){
                setRepos(repos.value.data);
            }
            if (followers.status === status){
                setFollowers(followers.value.data);
            }
            if (rate.status === status){
                setRateLimit(rate.value.data.rate);
            } else {
                setError({show: true, msg: 'rate limit exceeded'});
            }
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    useEffect (() => {
        getData();
    }, []);
    return <AppContext.Provider value={{
        githubUser,
        repos,
        followers,
        getData,
        rateLimit,
        loading,
        error
    }}>{children}</AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export {AppProvider}

