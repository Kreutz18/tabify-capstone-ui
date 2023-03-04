import {useEffect } from 'react';

export function Home() {
  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      getUserProfile();
    }
  }, [username])

  function getUserProfile() {
    setLoading(true);
    fetch("https://api.spotify.com/v1/me", {
        method: 'get',
        headers
    }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoggedIn(localStorage.getItem("loggedIn"));
        localStorage.setItem("user", JSON.stringify(data));
        setUsername(data.display_name);
        setLoading(false);
    });
  }

  return (
    <p>Home Works!</p>
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
    .then((data) => localStorage.setItem("profile", JSON.stringify(data)))
    .then((data) => console.log(JSON.stringify(data)));


  var profile = localStorage.getItem("profile");
  console.log(profile);

  var parseTest = JSON.parse(profile);
  var name = parseTest.display_name;

  console.log(name);
  return name;
}