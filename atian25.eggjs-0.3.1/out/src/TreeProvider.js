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
const vscode_1 = require("vscode");
class TreeProvider {
    constructor(baseDir) {
        this.baseDir = baseDir;
        this.emitter = new vscode_1.EventEmitter();
        this.onDidChangeTreeData = this.emitter.event;
    }
    refresh(data) {
        this.emitter.fire(data);
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return __awaiter(this, void 0, void 0, function* () {
            if (element) {
                return element.getChildren();
            }
            else {
                this.rootNodes = yield this.getRootNodes();
                return this.rootNodes;
            }
        });
    }
}
exports.default = TreeProvider;
//# sourceMappingURL=TreeProvider.js.map