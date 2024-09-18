const testCalibrationLogicArray = [
  0, 1, 2, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 12, 13, 14, 0, 2,
  0, 2, 4, 6, 8, 10, 12, 14, 12, 14, 0, 4, 9, 14,
];

import { useEffect, useRef, useState } from "react";
import { testSentenceArray } from "../word-component/sentences";
import InfoComponent from "../Info-components/info-component";

export function CalibrationComponent({ setCount, webgazer }) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const count = useRef(0);
  useEffect(() => {
    webgazer.pause();
  }, []);

  useEffect(() => {
    if (isEnd) {
      webgazer.clearData();
      webgazer.resume();
    }
  }, [isEnd]);

  const onClick = () => {
    count.current += 1;
    setVisibleIndex(testCalibrationLogicArray[count.current]);
    if (count.current === testCalibrationLogicArray.length) {
      setCount((prev) => prev + 1);
    }
  };

  const infoArray = [
    "보정을 시작하겠습니다.",
    "머리는 고정해주시고, 눈동자만 움직여주세요.",
    "이후에 나올 빨강색 단어를 집중해서 바라보며, 클릭하세요",
    "이제 시작합니다. 준비되면 확인버튼을 눌러주세요.",
    "",
  ];

  return (
    <>
      <div style={{ display: "flex", marginTop: "100px" }}>
        {testSentenceArray.map((data, index) => {
          return (
            <div
              onClick={visibleIndex === index ? onClick : null}
              style={{
                margin: "0.5vw",
                fontSize: "2.5vw",
                color: visibleIndex === index ? "red" : "lightgray",
                zIndex: 100,
                cursor: visibleIndex === index ? "grab" : "default",
              }}
              key={index}
            >
              {data}
            </div>
          );
        })}
      </div>
      <InfoComponent infoArray={infoArray} setIsEnd={setIsEnd} isEnd={isEnd} />
    </>
  );
}
