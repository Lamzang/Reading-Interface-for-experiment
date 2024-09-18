const testSentence =
  "hello world and nice to meet you. Our reading interface web is good for you";

const PilotSentenceArray = [
  "Amy wanted to publish a storybook about her summer vacation.",
  "At first, she attempted to write it all by herself.",
  "It was awkward at first, but she wrote the story again and again.",
  "When she needed help, Amy requested some ideas from her father.",
  "He pretended to be too busy, but he really wanted to help Amy.",
  "Amy's sister tried to prevent her from using the computer.",
  "This gave Amy insight into writing a story with a pencil.",
  "In an instant, she knew what to write about next.",
  "Amy wrote about her father’s favorite leather jacket in the story.",
  "Amy also wrote about a distant park they visited on vacation.",
  "She didn't mention the name of the park in the story.",
  "One night, she had a dream about quarreling with a monster.",
  "The monster tried to swallow her storybook, but she stopped it.",
  "The monster was scared and ran away, so Amy was delighted.",
  "Amy hopes to convert her story into a real book next year.",
  "",
];

export const PilotWordEngArray = [
  "publish",
  "attempted",
  "awkward",
  "requested",
  "pretended",
  "prevent",
  "insight",
  "instant,",
  "leather",
  "distant",
  "mention",
  "quarreling",
  "swallow",
  "delighted.",
  "convert",
  "",
];

const PilotWordKorArray = [
  "출판하다.",
  "시도하다.",
  "어색한",
  "요청하다.",
  "아니면서 그런척하다.",
  "못하게 하다.",
  "이해, 통찰",
  "즉시, 순간적으로",
  "가죽",
  "거리가 먼",
  "말하다. 언급하다.",
  "싸우다.",
  "음식등을 삼키다.",
  "기쁜",
  "변환하다.",
  "",
];

//전체 wordData
export const wordData = {
  publish: "출판하다.",
  attempted: "시도하다.",
  awkward: "어색한",
  requested: "요청하다.",
  pretended: "아니면서 그런척하다.",
  prevent: "못하게 하다.",
  insight: "이해, 통찰",
  "instant,": "즉시, 순간적으로",
  leather: "가죽",
  distant: "거리가 먼",
  mention: "말하다. 언급하다.",
  quarreling: "싸우다.",
  swallow: "음식등을 삼키다.",
  "delighted.": "기쁜",
  convert: "변환하다.",
  bucket: "양동이",
  stomach: "위, 배",
};

export const PilotSentenceData = PilotSentenceArray.map((data, index) => ({
  sentence: data.split(" "),
  wordEng: PilotWordEngArray[index],
  wordKor: PilotWordKorArray[index],
}));

export const testSentenceArray = testSentence.split(" ");

//위와 같이 전달하여 MainScreen에서 페이지를 넘길때마다 배열의 다음순서에 따라 아래 컴포넌트에 문장을 전달?
