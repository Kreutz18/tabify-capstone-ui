import { useEffect, useState } from "react";

export function Validate() {
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);


  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("loggedIn"));
    if (!isLoggedIn && window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      localStorage.setItem("loggedIn", true);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);

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
}
