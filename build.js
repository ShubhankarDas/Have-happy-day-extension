const fs = require("fs");
const archiver = require("archiver");
const version = require("./manifest.json")["version"];

const archive = archiver("zip");
const filename = `${Date.now()}_${version}.zip`;
const output = fs.createWriteStream(`${__dirname}/builds/${filename}`);

const filesToAdd = [
  {
    path: `${__dirname}/logo-19.png`,
    name: "logo-19.png",
  },
  {
    path: `${__dirname}/logo-38.png`,
    name: "logo-38.png",
  },
  {
    path: `${__dirname}/logo-48.png`,
    name: "logo-48.png",
  },
  {
    path: `${__dirname}/logo-90.png`,
    name: "logo-90.png",
  },
  {
    path: `${__dirname}/logo-128.png`,
    name: "logo-128.png",
  },
  {
    path: `${__dirname}/index.html`,
    name: "index.html",
  },
  {
    path: `${__dirname}/manifest.json`,
    name: "manifest.json",
  },
  {
    path: `${__dirname}/script.js`,
    name: "script.js",
  },
  {
    path: `${__dirname}/styles.css`,
    name: "styles.css",
  },
];

output.on("close", function () {
  console.log(archive.pointer() + " total bytes");
  console.log(`Build is ready - ${filename}`);
});

archive.on("error", function (err) {
  throw err;
});

archive.pipe(output);

filesToAdd.forEach((file) => {
  archive.append(fs.createReadStream(file.path), { name: file.name });
});

archive.finalize();
