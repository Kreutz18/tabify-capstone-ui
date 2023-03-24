const UltimateGuitarService = {
  getTest: async () => {
    const response = await fetch('/express_backend?' + new URLSearchParams({
      name: 'Hello World',
      amount: 3
    }));
    return await response.text();
  }
}

export default UltimateGuitarService;