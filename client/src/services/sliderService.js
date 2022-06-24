export const setCounter = (array, counterNum, controller = "") => {
  let newCounter = 0;
  if (controller === "next") {
    newCounter = counterNum < array.length - 1 ? counterNum + 1 : 0;
    return newCounter;
  }
  if (controller === "prev") {
    newCounter = counterNum > 0 ? counterNum - 1 : array.length - 1;
    return newCounter;
  }
  return newCounter;
};
