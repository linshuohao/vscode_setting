"use strict";
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const settingUtils_1 = require("../utils/settingUtils");
class CustomCodeLensProvider {
    constructor() {
        this.onDidChangeCodeLensesEmitter = new vscode.EventEmitter();
    }
    get onDidChangeCodeLenses() {
        return this.onDidChangeCodeLensesEmitter.event;
    }
    refresh() {
        this.onDidChangeCodeLensesEmitter.fire();
    }
    provideCodeLenses(document) {
        const shortcuts = settingUtils_1.getEditorShortcuts();
        if (!shortcuts) {
            return;
        }
        const content = document.getText();
        const matchResult = content.match(/@lc app=.* id=.* lang=.*/);
        if (!matchResult) {
            return undefined;
        }
        let codeLensLine = document.lineCount - 1;
        for (let i = document.lineCount - 1; i >= 0; i--) {
            const lineContent = document.lineAt(i).text;
            if (lineContent.indexOf("@lc code=end") >= 0) {
                codeLensLine = i;
                break;
            }
        }
        const range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);
        const codeLens = [];
        if (shortcuts.indexOf("submit") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Submit",
                command: "leetcode.submitSolution",
                arguments: [document.uri],
            }));
        }
        if (shortcuts.indexOf("test") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Test",
                command: "leetcode.testSolution",
                arguments: [document.uri],
            }));
        }
        if (shortcuts.indexOf("solution") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Solution",
                command: "leetcode.showSolution",
                arguments: [document.uri],
            }));
        }
        if (shortcuts.indexOf("description") >= 0) {
            codeLens.push(new vscode.CodeLens(range, {
                title: "Description",
                command: "leetcode.previewProblem",
                arguments: [document.uri],
            }));
        }
        return codeLens;
    }
}
exports.CustomCodeLensProvider = CustomCodeLensProvider;
//# sourceMappingURL=CustomCodeLensProvider.js.map