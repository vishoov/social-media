import React, { useState } from "react";

const AdenFilter = () => {
  const [imageURL, setImageURL] = useState(null);

  const applyAdenFilter = (image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      // Desaturate the image by reducing the color intensity
      const grayscale = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
      data[i] = data[i + 1] = data[i + 2] = grayscale;

      // Apply a slight blue color shift
      data[i] += 10; // Increase blue channel
      data[i + 2] -= 10; // Decrease red channel
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/jpeg");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);

    const image = new Image();
    image.onload = () => {
      const filteredImageURL = applyAdenFilter(image);
      setImageURL(filteredImageURL);
    };
    image.src = imageURL;
  };

  return (
    <div>
      <input
        style={{
          marginLeft: 300,
        }}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {imageURL && <img src={imageURL} alt="not found" />}
    </div>
  );
};

export default AdenFilter;
