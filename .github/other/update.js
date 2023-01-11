const fs = require("fs");
const path = process.argv[2];
const name = process.argv[3];
const email = process.argv[4];
const dataList = JSON.parse(fs.readFileSync(path, "utf-8"));
const deal = (obj, path = "") => {
  if (path !== "" && !fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  if (typeof obj === "string") {
    fs.writeFileSync(path + "/index.md", obj);
  } else if (typeof obj === "object") {
    for (const key in obj) {
      deal(obj[key], path === "" ? key : path + "/" + key);
    }
  }
};
for (const data of dataList) {
  if (data.name === name || data.email === email) {
    deal(data.data);
    break;
  }
}
