const MusicPlayerService = {
  changeSong: async (trackUri) => {
    await localStorage.removeItem('trackUri');
    await localStorage.setItem('trackUri', trackUri);
    await window.dispatchEvent(new Event('change_song'));
  }
}

export default MusicPlayerService;