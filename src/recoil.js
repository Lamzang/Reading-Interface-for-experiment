import { atom } from "recoil";

export const predictionState = atom({
  key: "predictionState",
  default: {
    xprediction: -100,
    yprediction: -100,
    clicked: "",
    page: "",
    clock: "",
  },
});
export const userState = atom({
  key: "userState",
  default: {
    name: "none",
    glosses: "ImageGloss",
    deviceWidth: 0,
    deviceHeight: 0,
    accuracy: -100, //어떻게 accuracy를 정할까?
  },
});

export const allDataState = atom({
  key: "allDataState",
  default: [],
});

export const TestState = atom({
  key: "testState",
  default: [],
});

export const pilotUserState = atom({
  key: "pilotuserState",
  default: {
    name: "none",
    glosses: "no-gloss",
    deviceWidth: 0,
    deviceHeight: 0,
    accuracy: -100, //어떻게 accuracy를 정할까?
    region: "",
  },
});

export const testResultState = atom({
  key: "testResultState",
  default: {
    schoolName: "",
    studentId: "",
    part1: {},
    part2: {},
  },
});
