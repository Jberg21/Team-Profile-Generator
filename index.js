const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const Engineertemp = require("./srcTemps/Engineertemp");
const generatePage = require("./srcTemps/generatePage");
const Interntemp = require("./srcTemps/Interntemp");
const Managertemp = require("./srcTemps/Managertemp");

const employees = []

function addMember() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter employees name."
        },
        {
            type: "input",
            name: "id",
            message: "Enter employees id."
        },
        {
            type: "input",
            name: "email",
            message: "Enter employees email address."
        },
        {
            type: "list",
            name: "role",
            message: "Select the employees Role.",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        }])
        .then(function ({ name, id, email, role }) {
            let roleDetails = "";
            if (role === "Engineer") {
                roleDetails = "github username"
            } else if (role === "Intern") {
                roleDetails = "school name"
            } else {
                roleDetails = "office phone number"
            }
            inquirer.prompt([
                {
                    type: "input",
                    name: "roleDetails",
                    message: `Enter team members ${roleDetails}`
                },
                {
                    type: "confirm",
                    name: "addMore",
                    message: "Would you like to add more team members?"
                }
            ])
            .then(function (data) {
                let allData = { ...data, name, id, email, role }
                htmlRender(allData)

                if (data.addMore) {
                    addMember()
                } else {
                    let finalHtml = generatePage(employees)

                    fs.writeFileSync(path.resolve("./dist/finalHtml.html"), finalHtml)
                }
            })
        })
}

function htmlRender (data){
    switch (data.role){
        case "Engineer": employees.push(Engineertemp(data)); break;
        case "Intern": employees.push(Interntemp(data)); break;
        case "Manager": employees.push(Managertemp(data)); break;

        default:
            break;
    }
}

addMember ();
