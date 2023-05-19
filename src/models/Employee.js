// Egy cég modeljét valosítja meg (végül nem lett használva)
export class Employee {
  name;
  email;
  jobTitle;
  age;
  cvUrl;

  constructor(name, email, jobTitle, age, cvUrl) {
    this.name = name;
    this.email = email;
    this.jobTitle = jobTitle;
    this.age = age;
    this.cvUrl = cvUrl;
  }
}
