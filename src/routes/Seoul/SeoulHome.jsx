import { Fragment, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { pilotUserState } from "../../recoil";
import { PilotWordEngArray } from "../../components/word-component/sentences";

export default function SeoulHome() {
  const [name, setName] = useState("");
  const [optionValue, setOption] = useState("");
  const [userData, setUserData] = useRecoilState(pilotUserState);
  const navigate = useNavigate();
  const [cachingEnd, setCachingEnd] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || optionValue === "") {
      alert("ID 또는 힌트를 입력하세요");
      return;
    }
    setUserData({
      name: name,
      glosses: optionValue,
      deviceWidth: window.innerWidth,
      deviceHeight: window.innerHeight,
      accuracy: -100,
      region: "Seoul",
    });
    navigate(`/multi-glosses`);
  };
  const onClick = async () => {
    PilotWordEngArray.forEach((word) => {
      if (word) {
        const audio = new Audio(
          `../${import.meta.env.VITE_AUDIO_URL}/${word}.m4a`
        );
        audio.preload = "auto";
      }
    });
    setCachingEnd(true);
  };

  return (
    <div className={styles.HomeWrapper}>
      {PilotWordEngArray.map(
        (word, index) =>
          word && ( // 빈 문자열을 건너뛰도록 처리
            <Fragment key={index}>
              <link
                rel="preload"
                href={`../${import.meta.env.VITE_IMAGE_URL}/${word}.webp`}
                as="image"
              />
            </Fragment>
          )
      )}
      <form className={styles.HomeForm} onSubmit={onSubmit}>
        <div className={styles.HomeTitle}>Reading Interface</div>
        <div className={styles.HomeSchoolName}>- 서울 용강중학교 -</div>
        <input
          className={styles.HomeInput}
          required
          placeholder="자신의 ID를 입력하세요"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <select
          className={styles.HomeSelect}
          onChange={(e) => setOption(e.target.value)}
          defaultValue={""}
        >
          <option className={styles.HomeOption} value={""} disabled>
            힌트를 선택하세요
          </option>
          <option className={styles.HomeOption} value="textL1-gloss">
            A타입
          </option>
          <option className={styles.HomeOption} value="audio-textL1-gloss">
            B타입
          </option>
          <option className={styles.HomeOption} value="image-textL1-gloss">
            C타입
          </option>
          <option className={styles.HomeOption} value="audio-image-gloss">
            D타입
          </option>
        </select>
        <button className={styles.HomeButton}>시작하기</button>
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "30px",
            border: "2px solid black",
            padding: "10px",
            borderRadius: "10px",
            display: cachingEnd ? "none" : "block",
          }}
          onClick={onClick}
        >
          {cachingEnd ? null : "데이터 캐싱하기"}
        </div>
      </form>
    </div>
  );
}
