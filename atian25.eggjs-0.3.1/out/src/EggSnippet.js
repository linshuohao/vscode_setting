'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const common_tags_1 = require("common-tags");
const vscode_1 = require("vscode");
function init(context) {
    const cwd = vscode.workspace.rootPath;
    // get config
    let config = vscode_1.workspace.getConfiguration('eggjs.snippet');
    vscode_1.workspace.onDidChangeConfiguration(() => {
        config = vscode_1.workspace.getConfiguration('eggjs.snippet');
    });
    // get framework name
    const framework = context.workspaceState.get('eggjs.framework', 'egg');
    // preset of snippets
    const snippets = {
        service: `
      'use strict';

      const Service = require('${framework}').Service;

      class \${TM_FILE_CLASS}Service extends Service {
        \${TM_STYLE_FN} \${2:echo}() {
          $0
        }
      }

      module.exports = \${TM_FILE_CLASS}Service;
    `,
        controller: `
      'use strict';

      const Controller = require('${framework}').Controller;

      class \${TM_FILE_CLASS}Controller extends Controller {
        \${TM_STYLE_FN} \${2:echo}() {
          $0
        }
      }

      module.exports = \${TM_FILE_CLASS}Controller;
    `
    };
    // register snippet
    context.subscriptions.push(vscode.languages.registerCompletionItemProvider(['javascript'], {
        provideCompletionItems() {
            return Object.keys(snippets).map(key => new SnippetCompletionItem(`egg ${key}`, common_tags_1.stripIndent `${snippets[key]}` + '\n'));
        },
        resolveCompletionItem(item, token) {
            //FIXME: hacky, replace fn style
            const snippet = item.insertText;
            snippet.value = snippet.value.replace(/\$\{TM_STYLE_FN}/g, config.fnStyle || '${1|async,*|}');
            return item;
        }
    }));
}
exports.init = init;
class SnippetCompletionItem extends vscode_1.CompletionItem {
    constructor(label, snippet, locals) {
        super(label, vscode_1.CompletionItemKind.Snippet);
        this.insertText = new SnippetString(snippet, locals);
    }
}
exports.SnippetCompletionItem = SnippetCompletionItem;
class SnippetString extends vscode.SnippetString {
    constructor(value, locals = {}) {
        // preset variable
        locals = Object.assign({}, {
            TM_FILE_CLASS: 'TM_FILENAME_BASE/(.*)/${1:/capitalize}/',
        }, locals);
        // replace
        let snippet = value;
        for (const key of Object.keys(locals)) {
            snippet = snippet.replace(new RegExp(key, 'g'), locals[key]);
        }
        super(snippet);
    }
}
exports.SnippetString = SnippetString;
//# sourceMappingURL=EggSnippet.js.map