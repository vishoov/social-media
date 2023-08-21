import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Typography } from "@mui/material";
import { AIButton } from "../ReuseableComponents/AIButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function AIModel({ register, inputName }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          borderRadius: 20,
        }}
      >
        <DialogContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Gender
          </Typography>
          <FormControl>
            <RadioGroup
              defaultValue="female"
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: 30,
                },
              }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="custom"
                control={<Radio />}
                label="Custom"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <AIButton
            onClick={handleClose}
            content="Done"
            style={{
              width: 500,
            }}
          />
        </DialogActions>
      </Dialog>
    </div>
  );
}
