const Api = {
  url: "http://api.tvmaze.com/",

  SearchTitle(query) {
    return "title";
  },
  ToDayShow() {
    return fetch(this.url + "schedule?country=us&date=2019-07-04")
      .then(response => response.json())
      .then(results => {
        return results;
      })

      .catch(error => {
        return error;
      });
  }
};

export default Api;
