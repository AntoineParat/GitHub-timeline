new Vue({
  el: "#app",
  data: {
    username: 'AntoineParat,
    timeline: [],
    error: false,
    errorMsg: null,
    classe: "is-primary"
  },
  created(){
    this.getUserTimeline()
  },
  mounted() {
    window.onscroll = function() {
      if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        document.getElementById("myBtn").style.display = "block";
      } else {
        document.getElementById("myBtn").style.display = "none";
      }
    };
  },
  methods: {
    getUserTimeline() {
      axios
        .get(`https://api.github.com/users/${this.username}/repos`)
        .then(response => {
          this.timeline = [];
          this.error = false;
          this.errorMsg = null;
          this.classe = "is-primary";
          response.data.forEach(element => {
            if (element.created_at === "2019-07-27T17:30:08Z" ) {
              element.created_at = "2019-02-22T17:10:36Z";
              element.sortByDate = "2019-02-22T17:10:36Z" 
            }
            let date = this.getDateFormat(element.created_at);
            this.timeline.push({
              sortByDate: new Date(element.created_at),
              date: date,
              name: element.name,
              content: element.description,
              link: element.html_url,
              website : element.homepage
            });
          });
        })
        .then(() => {
          this.timeline.sort(function(a, b) {
            return b.sortByDate - a.sortByDate;
          });
        })
        .catch(() => {
          this.classe = "is-danger";
          this.error = true;
          this.errorMsg = "L'utilisateur n'a pas pu être trouvé";
        });
    },
    getDateFormat(element) {
      const today = new Date(element);
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return (date = `${dd}/${mm}/${yyyy}`);
    },
    topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
  }
});
