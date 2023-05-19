// Egy cég modeljét valosítja meg (végül nem lett használva)

export class Company {
  name;
  email;
  numberOfEmployees;
  description;

  constructor(name, email, numberOfEmployees, description) {
    this.name = name;
    this.email = email;
    this.numberOfEmployees = numberOfEmployees;
    this.description = description;
  }
}
