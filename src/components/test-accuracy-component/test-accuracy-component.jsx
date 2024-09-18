//test를 통과하지 못하면 다시 redirect하게 만들까?

import { useEffect, useState } from "react";
import InfoComponent from "../Info-components/info-component";
import { useRecoilState } from "recoil";
import { TestState, predictionState } from "../../recoil";
import { calcStandardDeviation } from "./calc-accuracy";

const testArray = ["여기 집중", "여기 집중", "여기 집중"];

export function TestAccuracyComponent({ setCount, webgazer }) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [predData, setPredData] = useRecoilState(predictionState);
  const [isEnd, setIsEnd] = useState(false);
  useEffect(() => {
    webgazer.pause();
  }, []);

  useEffect(() => {
    if (isEnd) {
      webgazer.semiPause();
      setTimeout(() => {
        let interval = setInterval(() => {
          setVisibleIndex((prev) => prev + 1);
        }, 5000);

        setTimeout(() => {
          clearInterval(interval);
          setCount((prev) => prev + 1);
        }, 15000);
      }, 500);
    }
  }, [isEnd]);

  const [testSet, setTestSet] = useRecoilState(TestState);
  useEffect(() => {
    if (isEnd) {
      setTestSet((prev) => [
        ...prev,
        [predData.xprediction, predData.yprediction],
      ]);
    }
  }, [isEnd, predData]);

  const infoArray = [
    "이번 시간은 정확도 계산 과정입니다.",
    "앞으로 나올 빨강색 단어에 5초간 집중해주세요",
    "이제 시작합니다. 준비되면 확인버튼을 눌러주세요.",
    "",
  ];
  return (
    <>
      <div style={{ display: "flex", marginTop: "100px" }}>
        {testArray.map((data, index) => {
          return (
            <div
              style={{
                margin: "0 150px",
                fontSize: "2vw",
                width: "max-content",
                color: visibleIndex === index ? "red" : "white",
                display: visibleIndex === 3 ? "none" : "block",
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
