#!/usr/bin/env node

import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const moduleDir = "./src/modules";

const options = [
  "Option API",
  "Composition API",
  "Composition API (Script Setup)",
  "JSX/TSX Style",
];

// Get all directories inside moduleDir
if (!fs.existsSync(moduleDir)) {
  console.warn(
    `The modules directory doesn't exist. Please create a Vue module first.`
  );
  process.exit(1);
}
const moduleDirectories = fs
  .readdirSync(moduleDir, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

const multiWordRegex = /^([A-Z][a-zA-Z0-9]*)+(\s[A-Z][a-zA-Z0-9]*)*$/;

inquirer
  .prompt([
    {
      type: "list",
      name: "selectedModuleDir",
      message: "Select a Vue module:",
      choices: moduleDirectories,
    },
    {
      type: "input",
      name: "componentName",
      message: "Enter the component name:",
      suffix: " (Use PascalCase and multi-word naming convention):",
      validate: function (input) {
        if (!input) {
          console.warn("Please enter a component name!");
          return false;
        } else if (multiWordRegex.test(input.trim())) {
          return true;
        }
        return "Please enter the Vue view name in both PascalCase and multi-word format";
      },
    },
    {
      type: "list",
      name: "apiStyle",
      message: "Select a view API style:",
      choices: [
        "Option API",
        "Composition API",
        "Composition API (Script Setup)",
        "JSX/TSX Style",
      ],
    },
  ])
  .then((answers) => {
    const selectedModuleDirPath = path.join(
      moduleDir,
      answers.selectedModuleDir
    );

    let viewFilePath = "";

    if (answers.apiStyle == options[3]) {
      viewFilePath = path.join(
        selectedModuleDirPath,
        "components",
        `${answers.componentName}.tsx`
      );
    } else {
      viewFilePath = path.join(
        selectedModuleDirPath,
        "components",
        `${answers.componentName}.vue`
      );
    }

    let vueViewContent = "";

    switch (answers.apiStyle) {
      case options[0]:
        vueViewContent = fs.readFileSync(
          path.resolve(__dirname, "templates", "OptionAPITemplate.txt"),
          "utf-8"
        );
        break;
      case options[1]:
        vueViewContent = fs.readFileSync(
          path.resolve(__dirname, "templates", "CompositionAPITemplate.txt"),
          "utf-8"
        );
        break;
      case options[2]:
        vueViewContent = fs.readFileSync(
          path.resolve(__dirname, "templates", "ScriptSetupAPITemplate.txt"),
          "utf-8"
        );
        break;
      case options[3]:
        vueViewContent = fs.readFileSync(
          path.resolve(__dirname, "templates", "TSXStyleTemplate.txt"),
          "utf-8"
        );
        vueViewContent = vueViewContent.replace(
          /_componentName_/g,
          answers.componentName
        );
        break;
      default:
        console.log(`Invalid API Style: ${apiStyle}`);
        return;
    }

    fs.mkdirSync(path.join(selectedModuleDirPath, "views"), {
      recursive: true,
    });

    fs.writeFileSync(viewFilePath, vueViewContent);

    console.log(`Component file created at: ${viewFilePath}`);
  });

export {};
