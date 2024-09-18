const testArray = ["Focus me!", "Focus me!", "Focus me!"];

export function TutorialTestAccuracyComponent({ visibleIndex }) {
  return (
    <div style={{ display: "flex" }}>
      {testArray.map((data, index) => {
        return (
          <div
            style={{
              margin: "150px",
              fontSize: "40px",
              color: visibleIndex === index ? "red" : "white",
            }}
            key={index}
          >
            {data}
          </div>
        );
      })}
    </div>
  );
}
