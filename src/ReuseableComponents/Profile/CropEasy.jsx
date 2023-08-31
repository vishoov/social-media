import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import React, { cloneElement, useCallback, useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./Utils/cropImage";
import { AIAddFilter } from "./AIAddFilter";

export const CropEasy = ({ uploadedFile, upBar }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [ProfileUrl, setProfileUrl] = useState(undefined);
  const [next, setNext] = useState(false);
  const [selectValue, setSelectValue] = useState(1);
  const [newUpBarCom, setNewUpBarCom] = useState(null);
  const [newUpBarForNext, setNewUpBarForNext] = useState(null);
  const [newUpdatedProfile, setUpdatedProfile] = useState(null);

  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  var handleUpBarClick = useCallback(() => {
    if (upBar?.props?.backArrowOnClick) {
      upBar.props.backArrowOnClick();
    }
  }, [upBar?.props]);

  const handleCallBack1 = () => {
    setNext(false);
  };

  const cropImage = async () => {
    const { url } = await getCroppedImg(
      ProfileUrl,
      croppedAreaPixels,
      rotation
    );
    setUpdatedProfile(url);
    setNext(true);
  };

  useEffect(() => {
    const newUpBar = cloneElement(upBar, {
      nextButton: true,
      nextVisibility: "hidden",
      backArrow: true,
      renderMessage: "Crop",
      backArrowOnClick: handleUpBarClick,
    });

    const newUpBarForNextData = cloneElement(upBar, {
      nextButton: true,
      backArrow: true,
      backArrowOnClick: handleCallBack1,
    });

    setNewUpBarForNext(newUpBarForNextData);
    setNewUpBarCom(newUpBar);
    setProfileUrl(URL.createObjectURL(uploadedFile));
  }, [uploadedFile, upBar, handleUpBarClick]);

  return (
    <>
      {next ? (
        <AIAddFilter
          updatedCroppedPic={newUpdatedProfile}
          upBarNext={newUpBarForNext}
        />
      ) : (
        <>
          {newUpBarCom}
          <div>
            <DialogContent
              dividers
              sx={{
                marginTop: 4,
                background: "#333",
                position: "relative",
                height: 490,
                width: "auto",
                border: 1,
                borderRadius: 3,
                minWidth: { sm: 785 },
              }}
            >
              <Cropper
                objectFit="cover"
                image={ProfileUrl}
                crop={crop}
                zoom={zoom}
                rotation={rotation}
                aspect={selectValue}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
                showGrid={false}
              />
            </DialogContent>
            <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
              <Box sx={{ width: "100%" }}>
                <Box>
                  <Typography>Zoom: {zoomPercent(zoom)}</Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    min={1}
                    max={3}
                    step={0.1}
                    value={zoom}
                    onChange={(e, zoom) => setZoom(zoom)}
                  />
                </Box>
                <Box>
                  <Typography>Rotation: {rotation + "°"}</Typography>
                  <Slider
                    valueLabelDisplay="auto"
                    min={0}
                    max={360}
                    value={rotation}
                    onChange={(e, rotation) => setRotation(rotation)}
                  />
                </Box>
              </Box>
              <Stack direction="row" spacing={10}>
                <Box>
                  <Select
                    value={selectValue}
                    onChange={(event) => setSelectValue(event.target.value)}
                    autoWidth
                  >
                    <MenuItem value={1}>original</MenuItem>
                    <MenuItem value={1 / 1}>1:1</MenuItem>
                    <MenuItem value={4 / 5}>4:5</MenuItem>
                    <MenuItem value={14 / 9}>14:9</MenuItem>
                    <MenuItem value={16 / 9}>16:9</MenuItem>
                  </Select>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button variant="outlined" onClick={cropImage}>
                    Next
                  </Button>
                </Box>
              </Stack>
            </DialogActions>
          </div>
        </>
      )}
    </>
  );
};

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
};
