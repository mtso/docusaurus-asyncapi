import { LoadContext } from "@docusaurus/types"
import type { PluginOptions } from "docusaurus-plugin-asyncapi";
import { ConfigInterface } from "@asyncapi/react-component"

export interface PresetOptions {
  id?: string;
  debug?: boolean;
  specs: PluginOptions[];
  config?: Partial<ConfigInterface>;
}

export default function preset(
  _context: LoadContext,
  presetOpts: PresetOptions = {
    specs: [],
  },
) {
  const { debug = false, specs, config } = presetOpts;

  const id = presetOpts.id ? `-${presetOpts.id}` : "";
  const themeId = `theme-asyncapi${id}`;

  let specsArray: PluginOptions[] = [];
  if (Array.isArray(specs)) {
    specsArray = specs;
  } else if (specs) {
    specsArray = [specs];
  }

  return {
    themes: [
      [
        require.resolve("docusaurus-theme-asyncapi"),
        {
          id: themeId,
        },
      ],
    ],
    plugins: [
      ...specsArray.map((opts, index) =>
        ([
          require.resolve("docusaurus-plugin-asyncapi"),
          {
            ...opts,
            themeId,
            id: opts.id || `plugin-asyncapi${id}-${index}`,
            debug,
            config,
          },
        ]),
      ),
    ],
  };
}
