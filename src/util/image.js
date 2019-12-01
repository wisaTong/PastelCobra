import { Image, createCanvas } from 'canvas';
import _ from 'underscore';

export async function imgDataFromUrl(imgUrl) {
  const img = new Image();
  await new Promise(resolve => {
    img.onload = resolve;
    img.src = imgUrl;
  });

  const { width, height } = img;
  const maxDimension = width > height ? width : height;

  const scale = maxDimension / 100;
  const canvas = createCanvas(width / scale, height / scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return ctx.getImageData(0, 0, width, height).data;
}

export async function collectPixels(imgData) {
  const pixels = [];
  for (let i = 0; i < imgData.length; i += 4) {
    const r = imgData[i + 0];
    const g = imgData[i + 1];
    const b = imgData[i + 2];
    pixels.push({ r, g, b });
  }
  return pixels;
}

export function computeAverageColor(pixels) {
  var totalRed = _.reduce(pixels, (m, p) => m + p.r, 0);
  var totalGreen = _.reduce(pixels, (m, p) => m + p.g, 0);
  var totalBlue = _.reduce(pixels, (m, p) => m + p.b, 0);
  return {
    r: (totalRed / pixels.length),
    g: (totalGreen / pixels.length),
    b: (totalBlue / pixels.length)
  };
}
