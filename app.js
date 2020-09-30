const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array to hold employee objects
const employees = [];

const createNewManager = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "managerName",
        message: "Please enter Manager name:",
        // validate: (managerName) => {if (managerName) {return true;}return "You must enter a managerName!";},
      },
      {
        type: "input",
        name: "managerID",
        message: "Please enter Manager ID number:",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Please enter Manager e-mail address:",
        // @.com
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter Manager office number:",
      },
    ])
    .then(function (data) {
      const { managerName, managerID, managerEmail, managerOfficeNumber } = data;
      const manager = new Manager(managerName, managerID, managerEmail, managerOfficeNumber);
      employees.push(manager);
      createRestOfTeam();
    });
};

createNewManager();

function createRestOfTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "newMemberRole",
        message: "Please choose another team member to add:",
        // validate: (managerName) => {if (managerName) {return true;}return "You must enter a managerName!";},
        choices: ["Engineer", "Intern", "I'm done!"],
      },
    ])
    .then((data) => {
      switch (data.newMemberRole) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        default:
          writeHTMLDoc(render(employees));
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "engineerName",
        message: "Please enter Engineer name:",
        // validate: (managerName) => {if (managerName) {return true;}return "You must enter a managerName!";},
      },
      {
        type: "input",
        name: "engineerID",
        message: "Please enter Engineer ID number:",
      },
      {
        type: "input",
        name: "engineerEmail",
        message: "Please enter Engineer e-mail address:",
      },
      {
        type: "input",
        name: "engineerGitHub",
        message: "Please enter Engineer GitHub username:",
      },
    ])
    .then(function (data) {
      const engineer = new Engineer(data.engineerName, data.engineerID, data.engineerEmail, data.engineerGitHub);
      employees.push(engineer);
      createRestOfTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "internName",
        message: "Please enter Intern name:",
        // validate: (managerName) => {if (managerName) {return true;}return "You must enter a managerName!";},
      },
      {
        type: "input",
        name: "internID",
        message: "Please enter Intern ID number:",
      },
      {
        type: "input",
        name: "internEmail",
        message: "Please enter Intern e-mail address:",
      },
      {
        type: "input",
        name: "internSchool",
        message: "Please enter Intern school:",
      },
    ])
    .then(function (data) {
      const intern = new Intern(data.internName, data.internID, data.internEmail, data.internSchool);
      employees.push(intern);
      createRestOfTeam();
    });
}

function writeHTMLDoc(renderData) {
  const fileContent = renderData;

  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log("I couldn't find the output directory so I tried to make one!");
    fs.mkdir(OUTPUT_DIR, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  fs.writeFile(outputPath, fileContent, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your team template HTML page has been successfully generated!");
  });
}
