import path from 'path';

export default function theme(context, options) {
  return {
    name: 'docusaurus-theme-asyncapi',
    getThemePath() {
      return path.join(__dirname, '..', 'dist-jsx', 'theme');
    },
    getTypeScriptThemePath() {
      return path.join(__dirname, '..', 'src', 'theme');
    },
  };
}
