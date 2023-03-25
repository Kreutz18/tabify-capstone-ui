const UltimateGuitarService = {
  getChords: async () => {
    const response = await fetch('/api/chords/?url=' + 'https://tabs.ultimate-guitar.com/tab/elvis-presley/cant-help-falling-in-love-chords-1086983');
    return await response.json();
  },

  getTabs: async () => {
    const response = await fetch('/api/tabs/?url=' + 'https://tabs.ultimate-guitar.com/tab/eagles/hotel-california-tabs-23671');
    return await response.json();
  }
}

export default UltimateGuitarService;