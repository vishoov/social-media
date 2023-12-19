import React, { useState } from "react";

const CustomImageFilter1 = () => {
  const [imageURL, setImageURL] = useState(null);

  const applyFilter = (image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/jpeg");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);

    const image = new Image();
    image.onload = () => {
      const filteredImageURL = applyFilter(image);
      setImageURL(filteredImageURL);
    };
    image.src = imageURL;
  };

  return (
    <div>
      <input
        style={{
          marginLeft: "300px",
        }}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
      {imageURL && <img src={imageURL} alt=" not found" />}
    </div>
  );
};

export default CustomImageFilter1;
