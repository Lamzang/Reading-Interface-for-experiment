//키보드 입력에 의해 gloss의 visible을 결정.
export default function GlossComponent({
  visible,
  sentence,
  word,
  GlossType,
  setIsVisible,
}) {
  return (
    <div style={{ display: "flex", fontSize: "35px", marginTop: "100px" }}>
      {sentence.map((data, index) => {
        return data === word ? (
          <GlossType
            word={word}
            isVisible={visible}
            key={index}
            setIsVisible={setIsVisible}
          />
        ) : (
          <div style={{ margin: "10px" }} key={index}>
            {data}
          </div>
        );
      })}
    </div>
  );
}
