import { Route, Routes } from "react-router-dom";
import { Home } from "./home/home.js";
import { BandView } from "./band-view/band-view.js";
import { Playlists } from "./playlists/playlists.js";
import { Login } from "./login/login.js";
import { Logout } from "./login/logout.js";
import { Validate } from "./login/Validate.js";


export function AppRouter() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/band" element={<BandView />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/validate" element={<Validate />} />
    </Routes>
  )
}