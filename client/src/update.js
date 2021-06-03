function run() {
    new Vue({
      el: '#update',
      data: {
        id: '',
        message: '',
        book: {}
      },
      created: function () {

        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        this.id = params.get("id");

        axios.get('http://localhost:3000/books/'+this.id).then(
            (response) => {
                this.book = response.data;
            }
        );
      },
      methods: {
        update: function(){
            console.dir(this.book);

            return axios.post('http://localhost:3000/books', this.book).then(
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
  