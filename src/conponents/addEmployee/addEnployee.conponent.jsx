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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import CardActions from "@mui/material/CardActions";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./addEnployee.css";
import { FormHelperText } from "@mui/material";
import { firestore } from "../../firebase";
import { addDoc, collection } from "@firebase/firestore";

// a form validáláshoz való yup schema
const schema = yup.object().shape({
  Name: yup.string().required("A név mező kitöltése kötelező"),
  Email: yup.string().email().required("A email mező kitöltése kötelező"),
  Kor: yup
    .number("Csal számot írhat ebbe a mezőbe")
    .min(18, "Legalább 18 évesnek kell lennie")
    .required("A kor mező kitöltése kötelező"),
  Beosztas: yup.string(),
});

const Addemployee = (value) => {
  //isdesabled felel azért hogy a gomb inaktív legyenm még nem lett mentve egy cég
  let isdesabled = value.value;
  // hook-form változói
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //lenyiló doboz értékét vezérlik
  const [beosztas, setbeosztas] = React.useState("");
  // az urlcímet gja tárolni
  let cvURL = "";
  // ha sikeres a form validálád megszünteti az egyedet
  let destroyed = false;

  //beosztás mező beállítása választás után
  const handleChange = (event) => {
    setbeosztas(event.target.value);
  };
  //formot validálo gomb eseménye
  const onSubmit = (data) => {
    const ref = collection(firestore, "Employee");
    isdesabled = true;
    data.Cv = cvURL;

    try {
      addDoc(ref, data);
    } catch (e) {
      console.log(e);
    }
    destroyed = true;
  };

  //primary szint állít
  const theme = createTheme({
    palette: {
      primary: {
        main: "#487346",
      },
    },
  });

  // cv url beállítása
  const onChange = (e) => {
    cvURL = e.target.value;
  };
  // cv url nullázása, hogy biztos ne ötközzön
  const onClick = (e) => {
    e.target.value = null;
  };

  return (
    <div>
      {!destroyed && (
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
                    helperText={errors.Name?.message}
                    {...register("Name")}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    variant="outlined"
                    helperText={errors.Email?.message}
                    {...register("Email")}
                  />
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">
                      Beosztas
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={beosztas}
                      label="beosztas"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Könyvelő"}>Könyvelő</MenuItem>
                      <MenuItem value={"Szeftver Fejlesztő"}>
                        Szeftver Fejlesztő
                      </MenuItem>
                      <MenuItem value={"Szoftver Tesztelő"}>
                        Szoftver Tesztelő
                      </MenuItem>
                      <MenuItem value={"Menedzser"}>Menedzser</MenuItem>
                    </Select>
                    <FormHelperText>{errors.Beosztas?.message}</FormHelperText>
                  </FormControl>

                  <TextField
                    id="outlined-number"
                    label="Dolgozó életkora"
                    type="number"
                    defaultValue={18}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputProps: { min: "18", max: "100", step: "1" },
                    }}
                    helperText={errors.Kor?.message}
                    {...register("Kor")}
                  />
                  <label htmlFor="upload-file">
                    <input
                      style={{ display: "none" }}
                      id="upload-file"
                      name="upload-file"
                      type="file"
                      onClick={onClick}
                      onChange={onChange}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      component="span"
                    >
                      CV Feltöltés
                    </Button>
                  </label>
                </>

                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    disabled={!isdesabled}
                    onClick={handleSubmit(onSubmit)}
                  >
                    Kész
                  </Button>
                </CardActions>
              </ThemeProvider>
            </Stack>
          </form>
        </Card>
      )}
    </div>
  );
};

export default Addemployee;
