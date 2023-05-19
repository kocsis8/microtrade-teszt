import React from "react";
import AddCompanyConponent from "../../conponents/addCompany/addCompany.conponent";
import AddemployeeConponent from "../../conponents/addEmployee/addEnployee.conponent";
import Submit from "../../conponents/submit/Submit.Conponent";
import "./App.css";

function App() {

const formNumber = 5;

const employeeform=[];


  return (
    <>
      <div className="grid-container">
        <div className="grid-child">
          <AddCompanyConponent />
        </div>

        <div className="grid-child">
          
        </div>
      </div>
    </>
  );
}

export default App;
