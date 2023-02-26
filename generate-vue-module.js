#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = [
  "Option API",
  "Composition API",
  "Composition API (Script Setup)",
  "JSX/TSX Style",
];

const generateModule = async () => {
  const multiWordRegex = /^([A-Z][a-zA-Z0-9]*)+(\s[A-Z][a-zA-Z0-9]*)*$/;

  const { moduleName, apiStyle } = await inquirer.prompt([
    {
      type: "input",
      name: "moduleName",
      message: "Enter the Vue Module Name",
      suffix: " (Use PascalCase and multi-word naming convention):",
      validate: function (input) {
        if (!input) {
          console.warn("Please enter a module name!");
          return false;
        } else if (multiWordRegex.test(input.trim())) {
          return true;
        }
        return "Please enter the Vue module name in both PascalCase and multi-word format";
      },
    },
    {
      type: "list",
      name: "apiStyle",
      message: "API Styles:",
      choices: options,
    },
  ]);

  const modulesPath = path.resolve(process.cwd(), "src", "modules");
  if (!fs.existsSync(modulesPath)) {
    fs.mkdirSync(modulesPath, { recursive: true });
  }

  const modulePath = path.resolve(process.cwd(), "src", "modules", moduleName);
  fs.mkdirSync(modulePath);
  fs.mkdirSync(path.resolve(modulePath, "assets"));
  fs.mkdirSync(path.resolve(modulePath, "components"));
  fs.mkdirSync(path.resolve(modulePath, "services"));
  fs.mkdirSync(path.resolve(modulePath, "utils"));
  fs.mkdirSync(path.resolve(modulePath, "views"));

  let vueModuleContent = "";

  switch (apiStyle) {
    case options[0]:
      vueModuleContent = fs.readFileSync(
        path.resolve(__dirname, "templates", "OptionAPITemplate.txt"),
        "utf-8"
      );
      break;
    case options[1]:
      vueModuleContent = fs.readFileSync(
        path.resolve(__dirname, "templates", "CompositionAPITemplate.txt"),
        "utf-8"
      );
      break;
    case options[2]:
      vueModuleContent = fs.readFileSync(
        path.resolve(__dirname, "templates", "ScriptSetupAPITemplate.txt"),
        "utf-8"
      );
      break;
    case options[3]:
      vueModuleContent = fs.readFileSync(
        path.resolve(__dirname, "templates", "TSXStyleTemplate.txt"),
        "utf-8"
      );
      vueModuleContent = vueModuleContent.replace(
        /_componentName_/g,
        moduleName
      );
      break;
    default:
      console.log(`Invalid API Style: ${apiStyle}`);
      return;
  }

  let routerFileContent = ``;

  if (apiStyle == options[3]) {
    fs.writeFileSync(
      path.resolve(modulePath, `${moduleName}.tsx`),
      vueModuleContent
    );
    routerFileContent = fs.readFileSync(
      path.resolve(__dirname, "templates", "routerTemplate.txt"),
      "utf-8"
    );

    let mainModuleImportLine = `const { ${moduleName}Component } = await import("./${moduleName}");\nconst Parent = ${moduleName}Component;\n// const { Child1Component } = await import("./Child1Component");\n//const Child1 = Child1Component;\n//const { Child2Component } = await import("./Child2Component");\n//const Child2 = Child2Component;`;

    routerFileContent = routerFileContent.replace(
      /_ModuleImport_/g,
      mainModuleImportLine
    );

    routerFileContent = routerFileContent.replace(/_moduleName_/g, moduleName);
  } else {
    fs.writeFileSync(
      path.resolve(modulePath, `${moduleName}.vue`),
      vueModuleContent
    );

    routerFileContent = fs.readFileSync(
      path.resolve(__dirname, "templates", "routerTemplate.txt"),
      "utf-8"
    );

    let mainModuleImportLine = `const Module = () => import("./${moduleName}.vue");\n// const Parent = () => import("./your_module_component.vue");\n// const Child1 = () => import("./views/Child1Component.vue");\n// const Child2 = () => import("./views/Child2Component.vue");`;

    routerFileContent = routerFileContent.replace(
      /_ModuleImport_/g,
      mainModuleImportLine
    );

    routerFileContent = routerFileContent.replace(/_moduleName_/g, moduleName);
  }

  const indexFileContent = `import router from "./router";\nconst moduleName = "${moduleName}";\nexport { moduleName, router };`;

  fs.writeFileSync(path.resolve(modulePath, "index.ts"), indexFileContent);
  fs.writeFileSync(path.resolve(modulePath, "router.ts"), routerFileContent);

  console.log(
    `Generated module '${moduleName}' with API style '${apiStyle}' at ${modulePath}`
  );
};

generateModule();

export {};
