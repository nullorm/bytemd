import type { BytemdToolbarItem, EditorProps } from './types';
import { icons } from './icons';

const builtinMap: Record<string, BytemdToolbarItem> = {
  heading: {
    tooltip: 'Heading',
    icon: icons.heading,
    onClick({ utils }) {
      utils.replaceLines((lines) => lines.map((line) => '# ' + line));
    },
  },
  bold: {
    tooltip: 'Bold',
    icon: icons.bold,
    onClick({ utils }) {
      utils.wrapText('**');
    },
  },
  italic: {
    tooltip: 'Italic',
    icon: icons.italic,
    onClick({ utils }) {
      utils.wrapText('*');
    },
  },
  quote: {
    tooltip: 'Blockquote',
    icon: icons.quote,
    onClick({ utils }) {
      utils.replaceLines((lines) => lines.map((line) => '> ' + line));
    },
  },
  link: {
    tooltip: 'Link',
    icon: icons.link,
    onClick({ editor, utils }) {
      if (editor.somethingSelected()) {
        utils.wrapText('[', '](url)');
        const cursor = editor.getCursor();
        editor.setSelection(
          { line: cursor.line, ch: cursor.ch + 2 },
          { line: cursor.line, ch: cursor.ch + 5 }
        );
      } else {
        utils.wrapText('[', '](url)');
      }
    },
  },
  code: {
    tooltip: 'Code',
    icon: icons.code,
    onClick({ utils }) {
      utils.wrapText('`');
    },
  },
  codeBlock: {
    tooltip: 'Code block',
    icon: icons.codeBlock,
    onClick({ editor, utils }) {
      const { startLine } = utils.appendBlock('```js\n```');
      editor.setSelection(
        { line: startLine, ch: 3 },
        { line: startLine, ch: 5 }
      );
    },
  },
  ol: {
    tooltip: 'Ordered list',
    icon: icons.ol,
    onClick({ utils }) {
      utils.replaceLines((lines) =>
        lines.map((line, i) => `${i + 1}. ${line}`)
      );
    },
  },
  ul: {
    tooltip: 'Unordered list',
    icon: icons.ul,
    onClick({ utils }) {
      utils.replaceLines((lines) => lines.map((line) => '- ' + line));
    },
  },
  hr: {
    tooltip: 'Horizontal rule',
    icon: icons.hr,
    onClick({ utils }) {
      utils.appendBlock('---');
    },
  },
};

// TODO:
export function getItemMap(plugins: EditorProps['plugins']) {
  const map = { ...builtinMap };
  plugins?.forEach((p) => {
    Object.assign(map, p.toolbar);
  });
  return map;
}
