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
const path = require("path");
const is = require("is-type-of");
const getByPath = require("lodash.get");
const FileUtils_1 = require("./FileUtils");
const ASTUtils = require("egg-ast-utils");
const vscode = require("vscode");
const vscode_1 = require("vscode");
function init(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const cwd = vscode_1.workspace.rootPath;
        // monitor config files
        const fileCache = new FileUtils_1.FileCache('**/config/config.*.js', {
            parserFn: ASTUtils.parseConfig,
        });
        context.subscriptions.push(fileCache);
        const metaCache = new FileUtils_1.FileCache('**/run/application_config_meta.json', { json: true });
        context.subscriptions.push(metaCache);
        context.subscriptions.push(vscode.languages.registerDefinitionProvider('javascript', {
            provideDefinition(document, position) {
                return __awaiter(this, void 0, void 0, function* () {
                    const line = document.lineAt(position);
                    let lineSource = line.text;
                    let property;
                    try {
                        // pass the line to AST
                        // need to process invalid like `return app.config.xxx;`
                        // simplely find the blank space
                        const start = lineSource.lastIndexOf(' ', position.character) + 1;
                        const end = lineSource.indexOf(' ', position.character);
                        const source = lineSource.substring(start, end === -1 ? undefined : end);
                        property = ASTUtils.extractKeyword(source, position.character - start, 'config');
                    }
                    catch (err) {
                        console.warn('extractKeyword', lineSource, err);
                        // fallback to vscode way
                        // extract the closest word
                        const wordRange = document.getWordRangeAtPosition(position);
                        const word = document.getText(wordRange);
                        // extract the closest `config.xxx`, don't support `config.view['.nj']`
                        const part = line.text.substring(0, wordRange.end.character);
                        const m = part.match(new RegExp(`\\bconfig\\.((?:\\w+\\.)*${word})$`));
                        property = m && m[1];
                    }
                    if (property) {
                        const result = [];
                        // search from app config files
                        const files = yield fileCache.readFiles('**/config/config.*.js', 'node_modules');
                        for (const { content, uri } of files) {
                            result.push(...extractLocation(content, property, uri));
                            // search from meta
                            const cwd = vscode_1.workspace.getWorkspaceFolder(document.uri).uri.fsPath;
                            const meta = yield metaCache.readFile(vscode_1.Uri.file(path.join(cwd, 'run/application_config_meta.json')));
                            const filePath = getByPath(meta, property);
                            if (is.string(filePath) && !filePath.startsWith(path.join(cwd, 'config'))) {
                                const pluginUri = vscode_1.Uri.file(filePath);
                                const pluginContent = yield fileCache.readFile(pluginUri, false);
                                result.push(...extractLocation(pluginContent, property, pluginUri));
                            }
                        }
                        return result;
                    }
                });
            }
        }));
    });
}
exports.init = init;
function extractLocation(source, property, uri) {
    const result = [];
    const configNode = source.find(property);
    for (const node of configNode) {
        const { start, end } = node.node.loc;
        const range = new vscode_1.Range(new vscode_1.Position(start.line - 1, start.column), new vscode_1.Position(end.line - 1, end.column));
        const loc = new vscode_1.Location(uri, range);
        result.push(loc);
    }
    return result;
}
//# sourceMappingURL=EggConfig.js.map