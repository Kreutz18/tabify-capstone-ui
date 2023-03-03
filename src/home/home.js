import { React, useEffect, useState } from 'react';         
import { LoadingSpinner } from '../LoadingSpinner';


export function Home() {
  const [ username, setUsername ] = useState("name");
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
  setLoading(true);
  if (window.location.hash) {
    const { access_token, expires_in, token_type } =
      getReturnedParamsFromSpotifyAuth(window.location.hash);

    localStorage.clear();
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("tokenType", token_type);
    localStorage.setItem("expiresIn", expires_in);
    localStorage.setItem("user", true);
    console.log(localStorage.getItem("accessToken"));
    getUserProfile();
  }
});

function getUserProfile() 
{
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  fetch("https://api.spotify.com/v1/me", {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      }
  })
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem("profile", JSON.stringify(data))
        setUsername(data);
        setLoading(false);
        var profile = localStorage.getItem("profile");
        var parseTest = JSON.parse(profile);
        var name = parseTest.display_name;
        return name;
    })



}
  return (
      
        !loading ? (<p>Welcome {username}</p>):(<LoadingSpinner />)
     
    
    // Do we need a Home view
  )

}

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});
  window.location = "http://localhost:3000/home";
  return paramsSplitUp;
};

