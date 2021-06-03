function books() {
    get = function () {
      return axios.get('http://localhost:3000/books');
    };
  
    remove = function (index) {
      return axios.delete('http://localhost:3000/books/'+index);
    };
  
    return {
      get: get,
      remove: remove
    };
  }
  