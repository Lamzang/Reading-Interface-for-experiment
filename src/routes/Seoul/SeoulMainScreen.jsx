import { useRecoilState } from "recoil";
import {
  allDataState,
  pilotUserState,
  predictionState,
  TestState,
} from "../../recoil";
import { Fragment, useEffect, useRef, useState } from "react";
import { CalibrationComponent } from "../../components/calibration-component/calibration-components";
import { TestAccuracyComponent } from "../../components/test-accuracy-component/test-accuracy-component";
import GlossComponent from "../../components/word-component/gloss-component";
import webgazer from "../../webgazing/index.mjs";
import {
  PilotSentenceData,
  PilotWordEngArray,
} from "../../components/word-component/sentences";
import {
  AudioAndImageGloss,
  AudioAndTextL1Gloss,
  ImageAndTextL1Gloss,
  TextL1Gloss,
} from "../../components/word-component/gloss-type-components";
import { calcStandardDeviation } from "../../components/test-accuracy-component/calc-accuracy";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import InfoComponent from "../../components/Info-components/info-component";

export default function SeoulMainScreen() {
  //init
  const [predData, setPredData] = useRecoilState(predictionState);
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

  //초기 webgazer 설정
  useEffect(() => {
    async function startGaze() {
      await webgazer.clearData();
      await console.log("clear Data");
      await webgazer
        .setRegression("ridge")
        .setTracker("clmtrackr")
        .showVideoPreview(true)
        .showPredictionPoints(true)
        .applyKalmanFilter(true)
        .setGazeListener((data, clock) => {
          if (data === null) {
            return;
          }
          setPredData((prev) => ({
            ...prev,
            xprediction: data.x,
            yprediction: data.y,
            clock: clock,
          }));
        })
        .begin();
    }
    startGaze()
      .then(() => setStart(true))
      .catch((e) => alert(e));
    return () => {
      webgazer.setGazeListener(null).end();
    };
  }, []);
  //calibration 후 웹게이저 설정변경
  useEffect(() => {
    if (count === 1) {
      webgazer.showVideoPreview(false).semiPause();
    }
  }, [count]);

  //test-accuracy
  const [testData, setTestData] = useState([]);
  const [testSet, setTestSet] = useRecoilState(TestState);
  //test-accuracy 할때에 계산로직
  useEffect(() => {
    if (count === 2) {
      const length = testSet.length;
      setTestData([
        calcStandardDeviation(testSet.slice(Math.floor(length / 3))),
        calcStandardDeviation(
          testSet.slice(Math.floor(length / 3), Math.floor((length * 2) / 3))
        ),
        calcStandardDeviation(testSet.slice(Math.floor((length * 2) / 3))),
      ]);
    }
  }, [count]);
  //glossing 전 infoarray
  const [isEnd, setIsEnd] = useState(false);
  const infoArray = [
    "마지막으로 글읽기 과정입니다.",
    "이제 화면에 주어지는 문장을 이해하기 위해 신중히 읽어주세요.",
    "각 문장에 밑줄친 단어는 힌트가 제공됩니다.",
    "문장을 이해하는데 힌트가 필요하면 '스페이스 바'를 누르면 됩니다. 다시 누르면 힌트가 사라집니다.",
    "문장을 모두 이해하였으면 '엔터 키'를 누르면 다음문장으로 넘어갑니다.",
    "단, 이전문장으로 되돌아 갈 수 없습니다.",
    "각 문장당 주어진 시간은 30초입니다.",
    "이제 시작합니다. 준비되면 확인버튼을 눌러주세요.",
    "",
  ];

  //glossing
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [visibilty, setVisibilty] = useState(false);
  const firstTime = useRef(0);
  //recoil state
  const [allData, setAllData] = useRecoilState(allDataState);
  const [userData, setUserData] = useRecoilState(pilotUserState);

  //timer setting
  const totalDuration = 450;
  const resetInterval = 30;
  const [currentDuration, setCurrentDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(resetInterval);
  const [timerEnd, timerSetEnd] = useState(false);

  //glossing할 때에 매 프레임간 데이터 저장
  useEffect(() => {
    if (count === 2) {
      if (firstTime.current === 0) {
        firstTime.current = predData.clock;
      }
      setAllData((prev) => [
        ...prev,
        {
          xprediction: predData.xprediction,
          yprediction: predData.yprediction,
          clicked: visibilty,
          page: sentenceIndex + 1,
          clock: predData.clock - firstTime.current,
        },
      ]);
    }
  }, [predData, count]);

  //glossing 할 때에 키보드 입력 관리
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setSentenceIndex((prev) => prev + 1);
        setVisibilty(false);
        setTimeLeft(resetInterval);
      } else if (event.key === " ") {
        setVisibilty((prev) => !prev);
      }
    };
    if (count == 2) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [count]);

  useEffect(() => {
    if (count === 2 && isEnd) {
      const updateTimer = () => {
        setCurrentDuration((prev) => {
          if (prev >= totalDuration - 1) {
            timerSetEnd(true);
            return prev + 1;
          } else {
            return prev + 1;
          }
        });
        if (timeLeft > 1) {
          setTimeLeft((prev) => prev - 1);
        } else {
          setTimeLeft(resetInterval);
          setSentenceIndex((prev) => prev + 1);
          setVisibilty(false);
        }
      };

      if (!timerEnd) {
        const timerInterval = setInterval(updateTimer, 1000);

        return () => clearInterval(timerInterval);
      }
    }
  }, [count, timeLeft, timerEnd, isEnd]);

  //glossing 후 로직

  //glossing 후 데이터베이스에 데이터 저장
  useEffect(() => {
    const nowTime = new Date();
    if (sentenceIndex === PilotSentenceData.length - 1) {
      setDoc(doc(db, userData.glosses, userData.name), {
        type: "Seoul",
        nowTime: nowTime.toISOString(),
        name: userData.name,
        gloss: userData.glosses,
        testResult: testData,
        data: allData,
        width: window.innerWidth,
      });
      setCount((prev) => prev + 1);
    }
  }, [sentenceIndex]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!start ? (
        <div style={{ fontSize: "40px", marginTop: "100px" }}>Loading..</div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "max-content",
          }}
        >
          {count === 0 ? (
            <CalibrationComponent setCount={setCount} webgazer={webgazer} />
          ) : count === 1 ? (
            <TestAccuracyComponent setCount={setCount} webgazer={webgazer} />
          ) : count === 2 ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "30px",
                  fontSize: "25px",
                  width: "max-content",
                  marginTop: "0px",
                  border: "2px solid black",
                  padding: "10px",
                  borderRadius: "10px",
                  backgroundColor: "orange",
                }}
              >{`제한시간 : ${timeLeft}초`}</div>
              <InfoComponent
                infoArray={infoArray}
                setIsEnd={setIsEnd}
                isEnd={isEnd}
              />
              <GlossComponent
                visible={visibilty}
                setIsVisible={setVisibilty}
                sentence={PilotSentenceData[sentenceIndex].sentence}
                word={PilotSentenceData[sentenceIndex].wordEng}
                GlossType={
                  userData.glosses === "textL1-gloss"
                    ? TextL1Gloss
                    : userData.glosses === "audio-image-gloss"
                    ? AudioAndImageGloss
                    : userData.glosses === "audio-textL1-gloss"
                    ? AudioAndTextL1Gloss
                    : userData.glosses === "image-textL1-gloss"
                    ? ImageAndTextL1Gloss
                    : null
                }
              />
            </>
          ) : (
            <div
              style={{
                position: "absolute",
                left: "0",
                top: "0",
                width: "100vw",
                height: "100vh",
                zIndex: "8000",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "100px",
              }}
            >
              <h1
                style={{
                  fontSize: "30px",
                }}
              >
                수고하셨습니다
              </h1>
              <div
                onClick={() => {
                  window.location.href =
                    "https://docs.google.com/forms/d/e/1FAIpQLSf-p1ZHZfd3ajK43ckxTYfQYupJloj2H3XZWp8iw6oY4w8yzg/viewform?usp=sf_link";
                }}
                style={{
                  width: "max-content",
                  borderRadius: "20px",
                  backgroundColor: "black",
                  color: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "15px",
                  cursor: "grab",
                }}
              >
                이해도 시험 보러가기
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
