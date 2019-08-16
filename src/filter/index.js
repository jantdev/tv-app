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
    let salt = Math.floor(Math.random() * 10000000);
    return Math.floor(Math.random() * salt);
  },
  setUId(id) {
    return Math.floor(Math.random() * id * 10000000);
  },
  returnTimeFormat(num) {
    num = String(num);

    if (num.length < 4) {
      num = "0" + num;
    }
    return num.substring(0, 2) + ":" + num.substring(2, 4);
  },
  HourToNum(hour) {
    return Number(String(hour).replace(":", ""));
  }
};
export default Filter;
