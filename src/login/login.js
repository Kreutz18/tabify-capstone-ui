import React, { useEffect, useState } from "react";

const CLIENT_ID = "5e4a37cbcf854828b12099796f712f94";
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";

// https://accounts.spotify.com/authorize?client_id=5e4a37cbcf854828b12099796f712f94&redirect_uri=http://localhost:8080/get-user-code/&scope=user-read-currently-playing%20user-read-playback-state%20playlist-read-private&response_type=token&show_dialog=true
// What is the redirect URI?
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export function Login() {
  console.log("test");
  return HandleLogin();
}
/* 
http://localhost:3000/login#access_token=ABCqxL4Y&token_type=Bearer&expires_in=3600
*/
const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};


const HandleLogin = () => {
   window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
    useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      console.log(localStorage.getItem("accessToken"));
    }
  });
 };
