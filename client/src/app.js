function run() {
    let indexComponent = new Vue({
      el: '#app',
      data: {
        books: [],
        booksService: null,
        message: ''
      },
      created: function () {
        this.booksService = books();
        console.log(books());
        this.booksService.get().then(response => (this.books = response.data));
        console.log( this.books );
      },
      methods: {
        deleteBook: function(id) {
          console.log('HTTP DELETE spre backend, book: '+id);
          this.booksService.remove(id).then(response => {
            this.booksService.get().then(response => (this.books = response.data));
          });
        },
      }
    });
  
  //  indexComponent.use(VueMaterial);
  
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    run();
  });
  