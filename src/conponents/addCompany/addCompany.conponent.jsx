import React from "react";
import { useForm } from "react-hook-form";
import { createTheme } from "@mui/material";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import {yupResolver} from "@hookform/resolvers/yup";
import { Company } from "../../models/Company"
import * as yup from "yup";
import { firestore } from "../../firebase"
import { addDoc, collection } from "@firebase/firestore"
import "./addCompany.css";

// a form validáláshoz való yup schema
const schema = yup.object().shape({
    Name: yup.string().required(),
    Email: yup.string().email().required(),
    employeeNum: yup.number().min(1).max(100).required(),

})

export default function AddCompany() {
    // hook-form változói
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



//form sikeres validálása után lefutó esemény
  const onSubmit = (data) =>{
    const c = new Company(data.Name,data.Email,data.employeeNum,data.Description);

    const ref = collection(firestore,"Companys");

    try{
          addDoc(ref,data);
    }catch(e){
        console.log(e);
    }
  

  }

  const watchNum = watch("employeeNum");

  const handleAlkalmazottSzamChange = (event) => {
    console.log(Number(event.target.value));
    

  };

  //primary szint állít
  const theme = createTheme({
    palette: {
      primary: {
        main: "#487346",
      },
    },
  });

  return (
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
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                {...register("Email")}
                helperText={errors.Email?.message}
              />
              <TextField
                id="outlined-number"
                label="Dolgozók száma"
                type="number"
                defaultValue={"1"}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: "1", max: "100", step: "1" } }}
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
                {...register("Description")}
              />
            </>

            <CardActions>
            
              <Button variant="contained" color="primary" component="span"  onClick={handleSubmit(onSubmit)}>
                Kész
              </Button>
            </CardActions>
          </ThemeProvider>
        </Stack>
      </form>
    </Card>
  );
}
