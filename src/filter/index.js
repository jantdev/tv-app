const Filter = {
  CurrentDate() {
    const currentDate = new Date();
    const getdate = String(currentDate.toISOString()).split("T");

    return getdate[0];
  },
  ReturnTime(airstamp) {
    const time = airstamp.split("T");
    return String(time[1]).replace(":00+00:00", "");
  }
};
export default Filter;
