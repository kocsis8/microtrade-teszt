import React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import "./Description.css";


// Csak a jobboldali feliratért felel
const Description = () => {
  return (
    <Card className="Card" sx={{ maxWidth: 345 }}> 
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <>
          <h3>
            Addig nem lehet menteni a dolgozokat még nem mentettél a cég ürlapon
            viszont mentés után is lehet módosítani a dolgozó ürlapok számát. Az adatok firebase adatbázisban rögzítésre kerülnek.
          </h3>
        </>
      </Stack>
    </Card>
  );
}

export default Description;
