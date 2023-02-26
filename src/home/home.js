import {useEffect } from 'react';

export function Home() {
  useEffect(() => {
  if (window.location.hash) {
    const { access_token, expires_in, token_type } =
      getReturnedParamsFromSpotifyAuth(window.location.hash);

    localStorage.clear();
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("tokenType", token_type);
    localStorage.setItem("expiresIn", expires_in);
    localStorage.setItem("user", JSON.stringify("user"));

    console.log(localStorage.getItem("accessToken"));
  }
});

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

  return paramsSplitUp;
};

