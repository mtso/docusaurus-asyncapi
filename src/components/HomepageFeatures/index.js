"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const styles_module_css_1 = __importDefault(require("./styles.module.css"));
const FeatureList = [
    {
        title: 'Easy to Use',
        Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
        description: (react_1.default.createElement(react_1.default.Fragment, null, "Docusaurus was designed from the ground up to be easily installed and used to get your website up and running quickly.")),
    },
    {
        title: 'Focus on What Matters',
        Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
        description: (react_1.default.createElement(react_1.default.Fragment, null,
            "Docusaurus lets you focus on your docs, and we'll do the chores. Go ahead and move your docs into the ",
            react_1.default.createElement("code", null, "docs"),
            " directory.")),
    },
    {
        title: 'Powered by React',
        Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
        description: (react_1.default.createElement(react_1.default.Fragment, null, "Extend or customize your website layout by reusing React. Docusaurus can be extended while reusing the same header and footer.")),
    },
];
function Feature({ title, Svg, description }) {
    return (react_1.default.createElement("div", { className: (0, clsx_1.default)('col col--4') },
        react_1.default.createElement("div", { className: "text--center" },
            react_1.default.createElement(Svg, { className: styles_module_css_1.default.featureSvg, role: "img" })),
        react_1.default.createElement("div", { className: "text--center padding-horiz--md" },
            react_1.default.createElement("h3", null, title),
            react_1.default.createElement("p", null, description))));
}
function HomepageFeatures() {
    return (react_1.default.createElement("section", { className: styles_module_css_1.default.features },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("div", { className: "row" }, FeatureList.map((props, idx) => (react_1.default.createElement(Feature, { key: idx, ...props })))))));
}
exports.default = HomepageFeatures;
