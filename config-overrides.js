const path = require("path");
const paths = require("react-scripts/config/paths");

// 修改构建输出路径为 dist
paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
