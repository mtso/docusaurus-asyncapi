"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const clsx_1 = __importDefault(require("clsx"));
const Link_1 = __importDefault(require("@docusaurus/Link"));
const useDocusaurusContext_1 = __importDefault(require("@docusaurus/useDocusaurusContext"));
const Layout_1 = __importDefault(require("@theme/Layout"));
const HomepageFeatures_1 = __importDefault(require("@site/src/components/HomepageFeatures"));
const index_module_css_1 = __importDefault(require("./index.module.css"));
function HomepageHeader() {
    const { siteConfig } = (0, useDocusaurusContext_1.default)();
    return (react_1.default.createElement("header", { className: (0, clsx_1.default)('hero hero--primary', index_module_css_1.default.heroBanner) },
        react_1.default.createElement("div", { className: "container" },
            react_1.default.createElement("h1", { className: "hero__title" }, siteConfig.title),
            react_1.default.createElement("p", { className: "hero__subtitle" }, siteConfig.tagline),
            react_1.default.createElement("div", { className: index_module_css_1.default.buttons },
                react_1.default.createElement(Link_1.default, { className: "button button--secondary button--lg", to: "/docs/intro" }, "Docusaurus Tutorial - 5min \u23F1\uFE0F")))));
}
function Home() {
    const { siteConfig } = (0, useDocusaurusContext_1.default)();
    return (react_1.default.createElement(Layout_1.default, { title: `Hello from ${siteConfig.title}`, description: "Description will go into a meta tag in <head />" },
        react_1.default.createElement(HomepageHeader, null),
        react_1.default.createElement("main", null,
            react_1.default.createElement(HomepageFeatures_1.default, null))));
}
exports.default = Home;
