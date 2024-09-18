import { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import { wordData } from "./sentences";

export function NoGloss({ word, isVisible }) {
  return <div className={styles.NoGlossBox}>{word}</div>;
}

export function ImageGloss({ word, isVisible }) {
  return (
    <div className={styles.GlossBox}>
      {word}
      {isVisible ? (
        <img
          className={`${styles.GlossInnerBox} ${styles.GlossImage}`}
          alt={word}
          src={`${import.meta.env.VITE_IMAGE_URL}/${word}.webp`}
        />
      ) : null}
    </div>
  );
}

export function AudioGloss({ word, isVisible, setIsVisible }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      `../${import.meta.env.VITE_AUDIO_URL}/${word}.m4a`
    );

    audioRef.current.addEventListener("ended", () => setIsVisible(false));

    if (isVisible) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the beginning
    }

    return () => {
      audioRef.current.removeEventListener("ended", () => setIsVisible(false));
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio to the beginning
      }
    };
  }, [isVisible]);

  return <div className={styles.GlossBox}>{word}</div>;
}

export function AudioAndImageGloss({ word, isVisible }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      `../${import.meta.env.VITE_AUDIO_URL}/${word}.m4a`
    );
    if (isVisible) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the beginning
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio to the beginning
      }
    };
  }, [isVisible]);
  return (
    <div className={styles.GlossBox}>
      {word}
      {isVisible ? (
        <>
          <img
            className={`${styles.GlossInnerBox} ${styles.GlossImage}`}
            alt={word}
            src={`../${import.meta.env.VITE_IMAGE_URL}/${word}.webp`}
          />
        </>
      ) : null}
    </div>
  );
}

export function TextL1Gloss({ word, isVisible, key, setIsVisible }) {
  return (
    <div className={styles.GlossBox}>
      {word}
      {isVisible ? (
        <div className={`${styles.GlossInnerBox} ${styles.GlossText}`}>
          {wordData[word]}
        </div>
      ) : null}
    </div>
  );
}

export function AudioAndTextL1Gloss({ word, isVisible }) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      `../${import.meta.env.VITE_AUDIO_URL}/${word}.m4a`
    );
    /* if (!audioRef.current) {
      audioRef.current = new Audio(
        `../${import.meta.env.VITE_AUDIO_URL}/${word}.m4a`
      );
    } */

    if (isVisible) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to the beginning
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Reset audio to the beginning
      }
    };
  }, [isVisible]);
  return (
    <div className={styles.GlossBox}>
      {word}
      <link
        rel="preload"
        href={`../${import.meta.env.VITE_AUDIO_URL}/${word}.m4a`}
        as="audio"
      ></link>
      {isVisible ? (
        <div className={`${styles.GlossInnerBox} ${styles.GlossText}`}>
          {wordData[word]}
        </div>
      ) : null}
    </div>
  );
}

export function ImageAndTextL1Gloss({ word, isVisible }) {
  return (
    <div className={styles.GlossBox}>
      {word}
      {isVisible ? (
        <>
          <div className={`${styles.GlossInnerBox} ${styles.GlossText}`}>
            {wordData[word]}
          </div>
          <link
            rel="preload"
            href={`../${import.meta.env.VITE_IMAGE_URL}/${word}.webp`}
            as="image"
          ></link>
          <img
            className={`${styles.GlossInnerBox} ${styles.GlossUnderImage}`}
            alt={word}
            src={`../${import.meta.env.VITE_IMAGE_URL}/${word}.webp`}
          />
        </>
      ) : null}
    </div>
  );
}
