const UltimateGuitarService = {
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