/** @type {import('tailwindcss').Config} */
const fs = require("fs");
const path = require("path");
const componentFiles = [
  "./src/components/Dashboard/CategoryList.js",
  "./src/components/Dashboard/BookList.js",
];
const getAllJSFile = (currentPath) => {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    if (file.slice(-3) == ".js") {
      componentFiles.push(currentPath + "/" + file);
    }
    if (!path.extname(file).length) {
      getAllJSFile(currentPath + "/" + file);
    }
  }
};
getAllJSFile("./src");

module.exports = {
  content: componentFiles,
  theme: {
    extend: {
      colors: {
        orange: {
          100: "#FFEDD5",
        },
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
