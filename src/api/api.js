import Filter from "../filter/index";
class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}
const loadJson = url => {
  return fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new HttpError(response);
    }
  });
};

const Api = {
  url: "http://api.tvmaze.com/",
  imgFlagUrl: "https://static.tvmaze.com/intvendor/flags/|country|.png",
  ToDaysShow() {
    return loadJson(
      this.url + "schedule?country=us&date=" + Filter.CurrentDate()
    ).catch(error => {
      console.log(error);
      return error;
    });
  },
  getShow(showid) {
    if (showid) {
      return loadJson(this.url + "shows/" + showid).catch(error => {
        console.log(error);
        return error;
      });
    } else {
      return null;
    }
  },
  getEpisodes(showid) {
    if (showid) {
      return loadJson(this.url + "shows/" + showid + "/episodes").catch(
        error => {
          console.log(error);
          return error;
        }
      );
    } else {
      return null;
    }
  },
  getCast(showid) {
    if (showid) {
      return loadJson(this.url + "shows/" + showid + "/cast").catch(error => {
        console.log(error);
        return error;
      });
    } else {
      return null;
    }
  },
  getCrew(showid) {
    if (showid) {
      return loadJson(this.url + "shows/" + showid + "/crew").catch(error => {
        console.log(error);
        return error;
      });
    } else {
      return null;
    }
  },
  searchTitle(query) {
    if (query) {
      return loadJson(this.url + "/search/shows?q=:" + query).catch(error => {
        console.log(error);
        return error;
      });
    } else {
      return null;
    }
  }
};

export default Api;
