const Filter = {
  CurrentDate() {
    const currentDate = new Date();
    const getdate = String(currentDate.toISOString()).split("T");

    return getdate[0];
  },
  ReturnTime(airstamp) {
    const time = airstamp.split("T");
    return String(time[1]).replace(":00+00:00", "");
  },
  AddZero(value) {
    if (value < 10) {
      return "0" + value;
    } else {
      return value;
    }
  },
  setId() {
    let salt = Math.floor(Math.random() * 1000000);
    return Math.floor(Math.random() * salt);
  }
};
export default Filter;
