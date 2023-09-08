import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { FavoriteRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";

export default function TriggersTooltips() {
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid item>
          <Tooltip
            disableFocusListener
            title={
              <React.Fragment>
                <Stack spacing={2} direction="row" alignItems="center">
                  <FavoriteRounded />
                  <Typography>424,242 likes</Typography>
                </Stack>
              </React.Fragment>
            }
          >
            <Button>Hover or touch</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </div>
  );
}
