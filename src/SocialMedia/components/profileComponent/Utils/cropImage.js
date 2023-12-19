export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

// export default async function getCroppedImg(
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ) {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement("canvas");
//   const ctx = canvas.getContext("2d");

//   if (!ctx) {
//     return null;
//   }

//   const rotRad = getRadianAngle(rotation);

//   // calculate bounding box of the rotated image
//   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
//     image.width,
//     image.height,
//     rotation
//   );

//   // set canvas size to match the bounding box
//   canvas.width = bBoxWidth;
//   canvas.height = bBoxHeight;

//   // translate canvas context to a central location to allow rotating and flipping around the center
//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
//   ctx.rotate(rotRad);
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
//   ctx.translate(-image.width / 2, -image.height / 2);

//   // draw rotated image
//   ctx.drawImage(image, 0, 0);

//   // croppedAreaPixels values are bounding box relative
//   // extract the cropped image using these values
//   const data = ctx.getImageData(
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   // set canvas width to final desired crop size - this will clear existing context
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;

//   // paste generated rotate image at the top left corner
//   ctx.putImageData(data, 0, 0);

//   // As Base64 string
//   // return canvas.toDataURL('image/jpeg');

//   // As a blob
//   return new Promise((resolve, reject) => {
//     canvas.toBlob((file) => {
//       file.name = "cropped.jpeg";
//       resolve({ url: URL.createObjectURL(file) });
//     }, "image/*");
//   });
// }

export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // Calculate the dimensions of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // Set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // Translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // Draw rotated image
  ctx.drawImage(image, 0, 0);

  // Calculate the rotation-adjusted coordinates for cropping
  const rotatedX = (pixelCrop.x * bBoxWidth) / image.width;
  const rotatedY = (pixelCrop.y * bBoxHeight) / image.height;

  // Extract the cropped image using these values
  const data = ctx.getImageData(
    rotatedX,
    rotatedY,
    pixelCrop.width,
    pixelCrop.height
  );

  // Set canvas width to the final desired crop size - this will clear the existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // Paste the generated rotated image at the top-left corner
  ctx.putImageData(data, 0, 0);

  // Return the cropped image URL as a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      file.name = "cropped.jpeg";
      resolve({ url: URL.createObjectURL(file) });
    }, "image/jpeg");
  });
}
