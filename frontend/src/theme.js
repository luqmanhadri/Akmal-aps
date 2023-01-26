import { createTheme } from "@mui/material";
import { yellow } from "@mui/material/colors";

export const theme = createTheme({
    palette:{
      primary:{
        main: "#FF4B2B",
        light: "skyblue"
      },
      secondary:{
        main: yellow,
      },
      otherColor:{
        main:"#999"
      }
    }
  })