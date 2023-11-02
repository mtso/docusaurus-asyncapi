import React from "react";
import { usePluginData } from "@docusaurus/useGlobalData";
import AsyncApiComponent from "@asyncapi/react-component/browser";
import Layout from "@theme/Layout";
import "@asyncapi/react-component/styles/default.css";
import { ConfigInterface } from "@asyncapi/react-component";

interface PluginData {
  asyncapiSpec?: string;
}

interface AsyncApiDocProps {
  config: Partial<ConfigInterface>;
  // TODO: refactor to omit knowledge of plugin in theme.
  plugin: {
    id: string;
    themeId: string;
    title?: string;
    description?: string;
  };
}

export default function AsyncApiDoc({ config, plugin }: AsyncApiDocProps) {
  const pluginData = usePluginData('docusaurus-plugin-asyncapi', plugin.id) as PluginData;
  const asyncapiSpec = pluginData.asyncapiSpec;
  const { title, description } = plugin;

  return (
    <Layout title={title} description={description}>
      <AsyncApiComponent schema={asyncapiSpec} config={config} />
    </Layout>
  )
}
