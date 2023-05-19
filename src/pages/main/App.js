import React, { useState } from "react";
import AddemployeeConponent from "../../conponents/addEmployee/addEnployee.conponent";
import "./App.css";
import { useForm } from "react-hook-form";
import { createTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { firestore } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";
import DescriptionConponent from "../../conponents/Description/Description.Conponent";

// a form validáláshoz való yup schema
const schema = yup.object().shape({
  Name: yup.string().required("A név mező kitöltése kötelező"),
  Email: yup
    .string()
    .email("Ez az email cím nem valid")
    .required("A email mező kitöltése kötelező"),
  employeeNum: yup
    .number()
    .min(1, "Legalább 1 et meg kell adni")
    .max(100, "maximum 100-at tud megadni")
    .required("A dolgozok száma mező kitöltése kötelező"),
});
// gomb inaktivitását állítja
let isdesabled = false;
// sikeres validáció utáni event
const onSubmit = (data) => {
  const ref = collection(firestore, "Companys");
  isdesabled = true;

  try {
    addDoc(ref, data);
  } catch (e) {
    console.log(e);
  }
};
//primary szint állít
const theme = createTheme({
  palette: {
    primary: {
      main: "#487346",
    },
  },
});

function App() {
  // hook-form változói
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // generálni volo formok száma
  const [alkalmazottSzam, setAlkalmazottSzam] = useState(0);

  //változás utáni érték
  const handleAlkalmazottSzamChange = (event) => {
    setAlkalmazottSzam(Number(event.target.value));
  };
  // formot generáló függvény
  const generateAlkalmazottak = () => {
    const alkalmazottak = [];
    for (let i = 0; i < alkalmazottSzam; i++) {
      alkalmazottak.push(
        <AddemployeeConponent value={isdesabled} key={i} index={i} />
      );
    }
    return alkalmazottak;
  };

  return (
    <>
      <div className="grid-container">
        <div className="grid-child">
          <Card className="Card" sx={{ maxWidth: 345 }}>
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
                      helperText={errors.Name?.message}
                      {...register("Name")}
                      disabled={isdesabled}
                    />
                    <TextField
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                      {...register("Email")}
                      helperText={errors.Email?.message}
                      disabled={isdesabled}
                    />
                    <TextField
                      id="outlined-number"
                      label="Dolgozók száma"
                      type="number"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputProps: { min: "1", max: "100", step: "1" },
                      }}
                      {...register("employeeNum")}
                      helperText={errors.employeeNum?.message}
                      onChange={handleAlkalmazottSzamChange}
                    />
                    <TextField
                      id="standard-multiline-static"
                      label="Leírás"
                      multiline
                      rows={4}
                      variant="outlined"
                      disabled={isdesabled}
                      {...register("Description")}
                    />
                  </>

                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      disabled={isdesabled}
                      onClick={handleSubmit(onSubmit)}
                    >
                      Kész
                    </Button>
                  </CardActions>
                </ThemeProvider>
              </Stack>
            </form>
          </Card>

          <DescriptionConponent />
        </div>

        <div className="grid-child">{generateAlkalmazottak()}</div>
      </div>
    </>
  );
}

export default App;
