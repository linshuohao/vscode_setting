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
const vscode = require("vscode");
const mz_1 = require("mz");
class FileCache extends vscode.Disposable {
    constructor(pattern, options) {
        super(() => {
            this.watcher.dispose();
            this.cache.clear();
        });
        this.pattern = pattern;
        this.options = options;
        this.cache = new Map();
        // normalize parserFn
        if (!options.parserFn) {
            if (options.json) {
                options.parserFn = content => JSON.parse(content);
            }
        }
        this.watcher = vscode.workspace.createFileSystemWatcher(pattern, true);
        this.watcher.onDidDelete(uri => this.cache.delete(uri));
        this.watcher.onDidChange((uri) => __awaiter(this, void 0, void 0, function* () {
            if (this.cache.has(uri)) {
                const content = yield this.loadFile(uri);
                this.cache.set(uri, content);
            }
        }));
    }
    readFile(uri, noCache) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!noCache && this.cache.has(uri)) {
                return this.cache.get(uri);
            }
            const content = yield this.loadFile(uri);
            if (!noCache)
                this.cache.set(uri, content);
            return content;
        });
    }
    readFiles(include, exclude) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield vscode.workspace.findFiles(include, exclude);
            const result = [];
            for (const uri of files) {
                const content = yield this.readFile(uri);
                result.push({ uri, content });
            }
            return result;
        });
    }
    loadFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield mz_1.fs.readFile(uri.fsPath, 'utf-8');
            return this.options.parserFn ? this.options.parserFn(content, uri) : content;
        });
    }
}
exports.FileCache = FileCache;
//# sourceMappingURL=FileUtils.js.map