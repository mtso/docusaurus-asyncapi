import { normalizeUrl } from "@docusaurus/utils";
import refParser from "@apidevtools/json-schema-ref-parser";
import YAML from "yaml";
import fs from "fs/promises";
import path from "path";
import { LoadContext } from "@docusaurus/types";
import { ConfigInterface } from "@asyncapi/react-component";

export interface PluginOptions {
  themeId: string;
  id: string;
  spec: string;
  route: string;
  config?: Partial<ConfigInterface>;
  debug?: boolean;
}

export default function plugin(
  context: LoadContext,
  options: PluginOptions,
) {
  const { baseUrl } = context.siteConfig;
  const { id, themeId, spec, route, config, debug } = options;

  return {
    name: "docusaurus-plugin-asyncapi",
    async loadContent() {
      // TODO: Parse/validate spec.
      const specPath = path.resolve(spec);

      const bundled = await refParser.bundle(specPath, {
        dereference: {
          circular: "ignore",
        },
      });

      // TODO: Use parser to get title and description.
      let title, description;
      try {
        const metadata = await fs.readFile(specPath);
        const document = YAML.parse(metadata.toString());
        title = document?.info?.title;
        description = document?.info?.description;
      } catch (err) {
        console.warn("Failed to parse title/description", err);
      }

      return {
        title,
        description,
        asyncapiSpec: YAML.stringify(bundled),
      };
    },
    async contentLoaded({ content, actions }) {
      const { createData, addRoute, setGlobalData } = actions;

      setGlobalData({
        asyncapiSpec: content.asyncapiSpec,
      });

      const data = {
        id,
        themeId,
        title: content.title,
        description: content.description,
      };
      if (debug) {
        console.log(data);
      }
      const pluginData = await createData(`asyncapi-plugin-${id}.json`, JSON.stringify(data));
      const configData = await createData(`asyncapi-config-${id}.json`, JSON.stringify(config || {}));
      const modules = {
        plugin: pluginData,
        config: configData,
      };

      addRoute({
        modules,
        component: "@theme/AsyncApiDoc",
        path: normalizeUrl([ baseUrl, route ])
      });
    },
    getPathsToWatch() {
      return [
        path.resolve(spec),
      ];
    },
  };
}
