import React, { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";

const MoonFilter = () => {
  const [imageURL, setImageURL] = useState(null);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [saturation, setSaturation] = useState(0);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image) {
      const filteredImageURL = applyMoonFilter(image);
      setImageURL(filteredImageURL);
    }
  }, [brightness, contrast, saturation, image]);

  const applyMoonFilter = (image) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(255, data[i] * (brightness / 100));
      data[i + 1] = Math.min(255, data[i + 1] * (contrast / 100));
      data[i + 2] = Math.min(255, data[i + 2] * (saturation / 100));
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/jpeg");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const imageURL = URL.createObjectURL(file);

    const newImage = new Image();
    newImage.src = imageURL;
    newImage.onload = () => {
      setImage(newImage);
    };
  };

  const handleBrightnessChange = (event, newValue) => {
    setBrightness(newValue);
  };

  const handleContrastChange = (event, newValue) => {
    setContrast(newValue);
  };

  const handleSaturationChange = (event, newValue) => {
    setSaturation(newValue);
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
      {imageURL && <img src={imageURL} alt="not found!" />}

      <div>
        <p>Brightness</p>
        <Slider
          value={brightness}
          onChange={handleBrightnessChange}
          min={0}
          max={200}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
        />
      </div>

      <div>
        <p>Contrast</p>
        <Slider
          value={contrast}
          onChange={handleContrastChange}
          min={0}
          max={200}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
        />
      </div>

      <div>
        <p>Saturation</p>
        <Slider
          value={saturation}
          onChange={handleSaturationChange}
          min={-100}
          max={100}
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${value}%`}
        />
      </div>
    </div>
  );
};

export default MoonFilter;
