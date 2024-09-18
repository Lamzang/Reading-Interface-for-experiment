const testCalibrationLogicArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 2, 4, 6, 8, 10, 12, 14,
  0, 4, 9, 14,
];

import { useRef, useState } from "react";
import { testSentenceArray } from "../word-component/sentences";
import InfoComponent from "../Info-components/info-component";

export function TutorialCalibrationComponent({ setCount }) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const count = useRef(0);

  const onClick = () => {
    count.current += 1;
    setVisibleIndex(testCalibrationLogicArray[count.current]);
    if (count.current === testCalibrationLogicArray.length) {
      setCount((prev) => prev + 1);
    }
  };

  const infoArray = [
    "빨강색 단어에 집중하여 클릭하세요.",
    "가끔 클릭이 안되는 경우 여러번 클릭해야합니다",
    "모든 빨강색 단어를 클릭한 후, Focus me! 에 집중하여 바라보세요",
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        {testSentenceArray.map((data, index) => {
          return (
            <div
              onClick={visibleIndex === index ? onClick : null}
              style={{
                margin: "10px",
                fontSize: "40px",
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
      <InfoComponent infoArray={infoArray} />
    </>
  );
}
