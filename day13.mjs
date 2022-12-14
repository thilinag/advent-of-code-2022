import { readFileSync } from "fs";
const input = readFileSync("./input.txt", { encoding: "utf8" });
const data = input;

const getIsRightOrder = (left, right, orderData) => {
  // If the left list runs out of items first,
  // the inputs are in the right order.
  if (left === undefined) {
    orderData.rightOrder = true;
    return;
  }

  // If the right list runs out of items first,
  // the inputs are not in the right order.
  if (right === undefined) {
    orderData.rightOrder = false;
    return;
  }

  // If both values are integers, the lower integer should come first.
  if (typeof left === "number" && typeof right === "number") {
    // if the inputs are the same integer; continue checking the next part
    if (left === right) {
      return;
    }

    // If the left integer is lower than the right integer,
    // the inputs are in the right order
    // If the left integer is higher than the right integer,
    // the inputs are not in the right order
    orderData.rightOrder = left < right;
    return;
  }

  // If both values are lists,
  if (typeof left === "object" && typeof right === "object") {
    // go through the list and compare left and right
    // do this till end of left or right list (whichever is longer)
    for (let i = 0; i < Math.max(right.length, left.length); i++) {
      // we already found out about order
      if ("rightOrder" in orderData) {
        return;
      }

      getIsRightOrder(left[i], right[i], orderData);
    }
  }

  // If exactly one value is an integer
  // convert the integer to a list which contains that integer as its only value,
  // then retry the comparison.
  if (typeof left === "object" && typeof right !== "object") {
    getIsRightOrder(left, [right], orderData);
  }
  if (typeof left !== "object" && typeof right === "object") {
    getIsRightOrder([left], right, orderData);
  }
};

const part1 = (data) => {
  // pairs are separated by a blank line.
  const part1Data = data.split("\n\n");

  // store correctly ordered pairs here
  const rightOrderPairs = [];

  for (let index = 0; index < part1Data.length; index++) {
    const orderData = {};
    const [left, right] = part1Data[index]
      .split("\n")
      .map((part) => JSON.parse(part));

    getIsRightOrder(left, right, orderData);

    if (orderData.rightOrder === false) continue;

    // The first pair has index 1
    rightOrderPairs.push(index + 1);
  }

  // What is the sum of the indices of the pairs
  // that are already in the right order?
  console.log(rightOrderPairs.reduce((p, c) => p + c, 0));
};

const part2 = (data) => {
  const dividerPackets = [[[2]], [[6]]];

  // Disregard the blank lines
  const part2Data = data
    .split("\n")
    .filter((data) => data)
    .map((data) => JSON.parse(data));

  // add divider packets and sort
  const sortedPackets = [...part2Data, ...dividerPackets].sort((a, b) => {
    const orderData = {};
    getIsRightOrder(a, b, orderData);
    // > 0	sort a after b
    // < 0	sort a before b
    return orderData.rightOrder ? -1 : 1;
  });

  // turn the packets back to strings so its easier to find divider packets
  const sortedPacketsAsJSONStrings = sortedPackets.map((packet) =>
    JSON.stringify(packet)
  );
  // decoder key = multiply the indices of the two divider packets
  // What is the decoder key for the distress signal?
  console.log(
    dividerPackets.reduce(
      (p, c) => (sortedPacketsAsJSONStrings.indexOf(JSON.stringify(c)) + 1) * p,
      1
    )
  );
};

part1(data);
part2(data);
