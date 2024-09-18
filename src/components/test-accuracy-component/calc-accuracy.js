//standard deviation
export const calcStandardDeviation = (data) => {
  const meanX = data.reduce((sum, point) => sum + point[0], 0) / data.length;
  const meanY = data.reduce((sum, point) => sum + point[1], 0) / data.length;

  let varianceX = 0;
  let varianceY = 0;
  for (let i = 0; i < data.length; i++) {
    const [x, y] = data[i];
    const dx = x - meanX;
    const dy = y - meanY;
    varianceX += dx * dx;
    varianceY += dy * dy;
  }
  varianceX /= data.length;
  varianceY /= data.length;
  const sdX = Math.sqrt(varianceX);
  const sdY = Math.sqrt(varianceY);
  return (sdX / 10) * 1.96 * 2;
};

//mean distance from center
export function calculateCalibrate(testResultList) {
  const distanceList = [];
  let xDistance = 0;
  let yDistance = 0;
  let distance = 0;
  const maxWidth = window.innerWidth;
  const maxHeight = window.innerHeight;
  console.log(testResultList);

  for (let i = 0; i < testResultList.length; i++) {
    xDistance = Math.abs(maxWidth / 2 - testResultList[i].x);
    yDistance = Math.abs(maxHeight / 2 - testResultList[i].y);
    distanceList.push(Math.sqrt(xDistance * xDistance + yDistance * yDistance));
  }
  return (
    distanceList.reduce((acc, currentValue) => acc + currentValue, 0) /
    distanceList.length
  );
}
