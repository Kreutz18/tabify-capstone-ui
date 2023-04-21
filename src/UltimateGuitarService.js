const UltimateGuitarService = {
  getChords: async () => {
    const response = await fetch('/api/chords/?url=' + 'https://tabs.ultimate-guitar.com/tab/elvis-presley/cant-help-falling-in-love-chords-1086983');
    return await response.json();
  },

  getTabList: async (title, artist) => {
    let params = title + ' ' + artist;
    const response = await fetch('/api/tabs/search?title=' + params);
    return await response.json();
  },

  getTab: async (tabUrl) => {
    const response = await fetch ('/api/tabs?url=' + tabUrl);
    return await response.json();
  }
}

export default UltimateGuitarService;