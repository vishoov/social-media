import { useCallback, useEffect, useState } from "react";

const useResizeImageHook = (imageFile) => {
  const [, setFile] = useState(null);
  const [resizedImage, setResizedImage] = useState(null);
  console.log("image file", imageFile);

  const handleImageChange = useCallback(
    (event) => {
      setFile(imageFile);

      imageFile.onload = () => {
        // Resize the image using a canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 726; // Set the desired width
        canvas.height = (imageFile.height / imageFile.width) * canvas.width; // Maintain aspect ratio

        // Draw the image onto the canvas with the new dimensions
        ctx.drawImage(imageFile, 0, 0, canvas.width, canvas.height);

        // Get the resized image data as a data URL
        // const resizedDataURL = canvas.toDataURL(selectedFile.type);
        const resizedDataURL = canvas.toDataURL("image/jpeg");

        // Update the state with the resized image data URL
        setResizedImage(resizedDataURL);
      };

      return [resizedImage];
    },
    [resizedImage, imageFile]
  );

  useEffect(() => {
    handleImageChange();
  }, [handleImageChange]);
};

export default useResizeImageHook;
