import _ from 'underscore';
// import Plotly from 'plotly.js-dist';

export function computeMeshesForHist(bucketsPerDimension) {
  var bucketSize = (255 / bucketsPerDimension);
  var numPlanes = bucketsPerDimension - 1;
  var planes = []

  // small offsets are used to get around plotting limitations
  var currentHeight = bucketSize;
  _.times(numPlanes, () => {
    planes.push(
      [{ x: currentHeight, y: 0, z: 0 },
      { x: currentHeight + 0.1, y: 255, z: 0 },
      { x: currentHeight + 0.2, y: 255, z: 255 },
      { x: currentHeight + 0.3, y: 0, z: 255 }]
    );
    currentHeight += bucketSize;
  });

  currentHeight = bucketSize;
  _.times(numPlanes, () => {
    planes.push(
      [{ z: currentHeight, y: 0, x: 0 },
      { z: currentHeight + 0.1, y: 255, x: 0 },
      { z: currentHeight + 0.2, y: 255, x: 255 },
      { z: currentHeight + 0.3, y: 0, x: 255 }]
    );
    currentHeight += bucketSize;
  });

  currentHeight = bucketSize;
  _.times(numPlanes, () => {
    planes.push(
      [{ y: currentHeight, x: 0, z: 0 },
      { y: currentHeight + 0.1, x: 255, z: 0 },
      { y: currentHeight + 0.2, x: 255, z: 255 },
      { y: currentHeight + 0.3, x: 0, z: 255 }]
    );
    currentHeight += bucketSize;
  });
  return planes;
}

export function plotOriginalData(elId, pixels) {
  var colors = _.map(pixels, (p, index) => {
    return "rgb(" + p.r + "," + p.g + "," + p.b + ")";
  });

  var data = {
    x: _.map(pixels, (p) => { return p.r; }),
    y: _.map(pixels, (p) => { return p.g; }),
    z: _.map(pixels, (p) => { return p.b; }),
    mode: 'markers',
    marker: {
      size: 3,
      color: colors,
      line: {
        color: 'rgb(100,100,100)',
        width: 1
      }
    },
    type: 'scatter3d'
  };

  var layout = {
    margin: { l: 0, r: 0, b: 0, t: 0 },
    scene: {
      xaxis: { title: "Red" },
      yaxis: { title: "Green" },
      zaxis: { title: "Blue" }
    }
  };

  Plotly.newPlot(elId, [data], layout);
}
