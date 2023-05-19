import React from "react";
import Button from "@mui/material/Button";
import Card from '@mui/material/Card';
import { createTheme } from '@mui/material';
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material";

export default function Submit(){

    
  const theme = createTheme({
    palette: {
      primary: {
        main: '#487346',
      },
    },
  });
return(

    <Card className="Card" sx={{ maxWidth: 345 }}>

<Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <ThemeProvider theme={theme}>
<>
<Button  variant="contained" color="primary" component="span">
  Feltölt
</Button>

          </>
          </ThemeProvider>
          </Stack>
  </Card>

);
}