const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { defaultMaxListeners } = require("stream");

// array to hold employee objects
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const createNewManager = () => {
  //   const newManager =
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
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Please enter Manager office number:",
      },
      //TODO: how do you do this with bracket object destruct or something notation e.g. { variable, variable}
    ])
    .then(function (data) {
      const manager = new Manager(data.managerName, data.managerID, data.managerEmail, data.managerOfficeNumber);
      employees.push(manager);
      createRestOfTeam();
    });
};

createNewManager();

///////////////////////Enter the rest of the team///////////////////////

// function createEmployee() {
//   inquirer.prompt([
//     {
//       type: "input",
//       name: "managerName",
//       message: "Please enter Manager name:",
//       // validate: (managerName) => {if (managerName) {return true;}return "You must enter a managerName!";},
//     },
//     {
//       type: "input",
//       name: "managerID",
//       message: "Please enter Manager ID number:",
//     },
//     {
//       type: "input",
//       name: "managerEmail",
//       message: "Please enter Manager e-mail address:",
//     },
//   ]);
// }

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
        //TODO: can i combine these? remove I'm done and treat any other input as default? I think so
        //TODO: add a final prompt for team name maybe
        default:
          writeHTMLDoc(render(employees));
      }
    });
}

//FIXME: these variables were for a cockamamie idea for DRY
function createEngineer(name, id, email) {
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

// createEngineer();

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

function writeHTMLDoc(renderData, teamName) {
  // what goes in the file:
  // const filename = teamName;
  const fileContent = renderData;

  // write the HTML file!

  // reference:
  // const OUTPUT_DIR = path.resolve(__dirname, "output");
  // const outputPath = path.join(OUTPUT_DIR, "team.html");

  // check to see if anticipated output folder exists already
  //TODO: is this right?
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log("I couldn't find the output directory so I tried to make one!");
    fs.mkdir(OUTPUT_DIR, (err) => {
      if (err) {
        throw err;
      }
    });
  }
  //will overwrite existing file if it already exists in output path
  fs.writeFile(outputPath, fileContent, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("Your team template HTML page has been successfully generated!");
  });
}

// const questions = [
//     {
//       type: "input",
//       name: "managerName",
//       message: "Please enter Manager name:",
//       // validate: (managerName) => {if (managerName) {return true;}return "You must enter a managerName!";},
//     },
//     {
//       type: "input",
//       name: "managerID",
//       message: "Please enter Manager ID number:",
//     },
//     {
//       type: "input",
//       name: "managerEmail",
//       message: "Please enter Manager e-mail address:",
//     },
//     {
//       type: "input",
//       name: "managerOfficeNumber",
//       message: "Please enter Manager office number:",
//     },
//   ];

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
