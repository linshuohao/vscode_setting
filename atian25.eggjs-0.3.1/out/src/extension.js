'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = require("./utils");
const EggConfig = require("./EggConfig");
// import * as EggTest from './EggTest';
const EggSnippet = require("./EggSnippet");
const EggDebugger = require("./EggDebugger");
const vscode_1 = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('vscode-eggjs is activate!');
        const cwd = vscode_1.workspace.rootPath;
        const config = vscode_1.workspace.getConfiguration('eggjs');
        if (!cwd)
            return;
        const framework = yield utils.getFramework(cwd);
        if (framework) {
            // load config sidebar only if at egg project
            yield context.workspaceState.update('eggjs.framework', framework);
            yield vscode_1.commands.executeCommand("setContext", "isEgg", true);
            yield EggConfig.init(context);
            yield EggDebugger.init(context);
        }
        yield EggSnippet.init(context);
        // EggTest.init(context);
        vscode_1.commands.registerCommand('extension.openFile', (filePath) => __awaiter(this, void 0, void 0, function* () {
            const doc = yield vscode_1.workspace.openTextDocument(vscode_1.Uri.file(filePath));
            yield vscode_1.window.showTextDocument(doc);
            if (vscode_1.window.activeTextEditor) {
                yield vscode_1.commands.executeCommand('workbench.files.action.collapseExplorerFolders');
                yield vscode_1.commands.executeCommand('workbench.files.action.showActiveFileInExplorer');
                yield vscode_1.commands.executeCommand('workbench.action.focusActiveEditorGroup');
            }
        }));
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map