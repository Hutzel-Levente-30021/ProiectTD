function run() {
    new Vue({
      el: '#add',
      data: {
        id: '',
        message: '',
        book: {}
      },
      created: function () {
      },
      methods: {
       add: function(){
            console.dir(this.book);
            return axios.put('http://localhost:3000/books', this.book).then(
                (response) => {
                    this.message = response.data; // saved
                }
            );

        }
      }
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });