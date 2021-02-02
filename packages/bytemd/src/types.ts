import type { Processor } from 'unified';
import type { Schema } from 'hast-util-sanitize';
import type { VFile } from 'vfile';
import type { Editor, EditorConfiguration } from 'codemirror';
import type { EditorUtils } from './editor';
import type { Root as MdastRoot } from 'mdast';
import type { Root as HastRoot } from 'hast';

export interface EditorContext {
  /**
   * CodeMirror editor instance
   */
  editor: Editor;
  /**
   * Root element, `$('.bytemd')`
   */
  $el: HTMLElement;
  /**
   * Utilities for Editor
   */
  utils: EditorUtils;
}

export interface ViewerContext {
  /**
   * Root element of the Viewer, `$('.markdown-body')`
   */
  $el: HTMLElement;
  vfile: VFile;
  html: string;
  mdast: MdastRoot;
  hast: HastRoot;
}

export interface BytemdToolbarItem {
  /**
   * Tooltip of toolbar item
   */
  tooltip?: string;
  /**
   * Toolbar Icon (16x16), could be <img> or inline svg
   */
  icon: string;
  /**
   * Toolbar icon click handler
   */
  onClick(context: EditorContext): void;
}

export interface BytemdPlugin {
  /**
   * Customize Markdown parse by remark plugins:
   *
   * https://github.com/remarkjs/remark/blob/main/doc/plugins.md
   */
  remark?: (p: Processor) => Processor;
  /**
   * Customize HTML parse by rehype plugins:
   *
   * https://github.com/rehypejs/rehype/blob/main/doc/plugins.md
   */
  rehype?: (p: Processor) => Processor;
  /**
   * Register toolbar items
   */
  toolbar?: Record<string, BytemdToolbarItem>;
  /**
   * Side effect for editor, triggers when plugin list changes
   */
  editorEffect?(context: EditorContext): void | (() => void);
  /**
   * Side effect for viewer, triggers when HTML or plugin list changes
   */
  viewerEffect?(context: ViewerContext): void | (() => void);
}

export interface EditorProps extends ViewerProps {
  /**
   * Editor display mode
   *
   * - split: edit on the left and preview on the right
   * - tab: click tabs to switch between edit and preview
   */
  mode?: 'split' | 'tab';
  /**
   * Debounce time (ms) for preview
   */
  previewDebounce?: number;
  /**
   * Editor placeholder
   */
  placeholder?: string;
  /**
   * CodeMirror editor config
   *
   * https://codemirror.net/doc/manual.html#config
   */
  editorConfig?: Omit<EditorConfiguration, 'value' | 'mode' | 'placeholder'>;
}

export interface ViewerProps {
  /**
   * Markdown text
   */
  value: string;
  /**
   * ByteMD plugin list
   */
  plugins?: BytemdPlugin[];
  /**
   * Sanitize strategy: Defaults to GitHub style sanitation with class names allowed
   *
   * https://github.com/syntax-tree/hast-util-sanitize/blob/main/lib/github.json
   *
   * If you want further customization, pass a function to mutate sanitize schema.
   */
  sanitize?:
    | {
        /**
         * Allow inline styles. Default: `false`
         */
        allowStyle?: boolean;
      }
    | ((schema: Schema) => Schema);
}
