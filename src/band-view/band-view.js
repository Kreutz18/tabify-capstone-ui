export function BandView() {
/*
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
  function getData() {

  }
  */

  var playlist = localStorage.getItem("playlist_info")
  
  var name = playlist;

  console.log(name);
  return (
    <p>Band View Works!</p>
  )
}