import { Route, Routes } from "react-router-dom";
import { BandView } from "./band-view/band-view";
import { Playlists } from "./playlists/playlists";
import { Login } from "./login/login";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/band" element={<BandView />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}