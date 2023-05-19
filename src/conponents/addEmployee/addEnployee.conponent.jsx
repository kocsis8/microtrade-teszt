import React from "react";
import { useForm } from "react-hook-form";
import { createTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



const Addemployee = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => console.log(data);
    
      const [beosztas, setAge] = React.useState("");
    
      const handleChange = (event) => {
        setAge(event.target.value);
      };
    
    
      
    
      const theme = createTheme({
        palette: {
          primary: {
            main: "#487346",
          },
        },
      });


   
     

    return(

          <Card className="Card2" sx={{ maxWidth: 345 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <ThemeProvider theme={theme}>
              <>

                <TextField
                  id="outlined-basic"
                  label="Név"
                  variant="outlined"
                  {...register("firstName")} />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  {...register("firstName")} />
      <FormControl required sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-required-label">Besztás</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={beosztas}
          label="Beosztas *"
          onChange={handleChange}
        >
          <MenuItem value="Könyvelő">Könyvelő</MenuItem>
          <MenuItem value="Szeftver Fejlesztő">Szeftver Fejlesztő</MenuItem>
          <MenuItem value="Szoftver Tesztelő">Szoftver Tesztelő</MenuItem>
          <MenuItem value="Menedzser">Menedzser</MenuItem>
        </Select>
      </FormControl>
      <TextField
                id="outlined-number"
                label="Dolgozó életkora"
                type="number"
                defaultValue= {"1"}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: "1", max: "100", step: "1" } }}
                watch="true"
                {...register("firstName")} />
  <label htmlFor="contained-button-file">
    <Button variant="contained" color="primary" component="span">
      Upload
    </Button>
  </label>
              </>
            </ThemeProvider>
          </Stack>
        </form>
      </Card>

            
        );
}

export default Addemployee;