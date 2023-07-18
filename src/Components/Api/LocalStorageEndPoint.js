const fetchDataFromLocalStorage = async () => {
    const userdata = await localStorage.getItem('user'); 
    return userdata ? JSON.parse(userdata) : null;

  };

  export default fetchDataFromLocalStorage;