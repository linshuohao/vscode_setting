"use strict";
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
const path = require("path");
class TreeItem extends vscode.TreeItem {
    constructor(label, leaf = false, iconPath) {
        super(label, leaf ? vscode.TreeItemCollapsibleState.None : vscode.TreeItemCollapsibleState.Collapsed);
        this.label = label;
        this.leaf = leaf;
        this.iconPath = iconPath;
        // this.contextValue = 'dependency';
    }
    getChildren() {
        return __awaiter(this, void 0, void 0, function* () { return []; });
    }
    ;
}
exports.TreeItem = TreeItem;
class FileTreeItem extends TreeItem {
    constructor(label, path, iconPath) {
        super(label, true);
        this.label = label;
        this.path = path;
        this.iconPath = iconPath;
        // TODO: only expand one
        this.command = {
            command: 'extension.openFile',
            title: '',
            arguments: [path],
        };
    }
}
exports.FileTreeItem = FileTreeItem;
class UrlTreeItem extends TreeItem {
    constructor(label, url, iconPath) {
        super(label, true);
        this.label = label;
        this.url = url;
        this.iconPath = iconPath;
        this.command = {
            command: 'vscode.open',
            title: '',
            arguments: [vscode.Uri.parse(url)],
        };
    }
}
exports.UrlTreeItem = UrlTreeItem;
exports.ICON = {
    REFRESH: {
        light: path.join(__dirname, '../../resources/light/refresh.svg'),
        dark: path.join(__dirname, '../../resources/dark/refresh.svg'),
    },
    NPM: {
        light: path.join(__dirname, '../../resources/light/npm.svg'),
        dark: path.join(__dirname, '../../resources/dark/npm.svg'),
    },
    HOME: {
        light: path.join(__dirname, '../../resources/light/home.svg'),
        dark: path.join(__dirname, '../../resources/dark/home.svg'),
    },
    README: {
        light: path.join(__dirname, '../../resources/light/markdown.svg'),
        dark: path.join(__dirname, '../../resources/dark/markdown.svg'),
    },
    DEPENDENCY: {
        light: path.join(__dirname, '../../resources/light/dependency.svg'),
        dark: path.join(__dirname, '../../resources/dark/dependency.svg'),
    },
    DOCUMENT: {
        light: path.join(__dirname, '../../resources/light/document.svg'),
        dark: path.join(__dirname, '../../resources/dark/document.svg'),
    },
    NUMBER: {
        light: path.join(__dirname, '../../resources/light/number.svg'),
        dark: path.join(__dirname, '../../resources/dark/number.svg'),
    },
    STRING: {
        light: path.join(__dirname, '../../resources/light/string.svg'),
        dark: path.join(__dirname, '../../resources/dark/string.svg'),
    },
    BOOLEAN: {
        light: path.join(__dirname, '../../resources/light/boolean.svg'),
        dark: path.join(__dirname, '../../resources/dark/boolean.svg'),
    },
    ARRAY: {
        light: path.join(__dirname, '../../resources/light/array.svg'),
        dark: path.join(__dirname, '../../resources/dark/array.svg'),
    },
    JSON: {
        light: path.join(__dirname, '../../resources/light/json.svg'),
        dark: path.join(__dirname, '../../resources/dark/json.svg'),
    },
};
//# sourceMappingURL=TreeItem.js.map