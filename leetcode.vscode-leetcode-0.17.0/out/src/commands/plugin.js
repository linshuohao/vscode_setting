"use strict";
// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.
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
const leetCodeExecutor_1 = require("../leetCodeExecutor");
const shared_1 = require("../shared");
const uiUtils_1 = require("../utils/uiUtils");
const cache_1 = require("./cache");
function switchEndpoint() {
    return __awaiter(this, void 0, void 0, function* () {
        const isCnEnabled = getLeetCodeEndpoint() === shared_1.Endpoint.LeetCodeCN;
        const picks = [];
        picks.push({
            label: `${isCnEnabled ? "" : "$(check) "}LeetCode`,
            description: "leetcode.com",
            detail: `Enable LeetCode US`,
            value: shared_1.Endpoint.LeetCode,
        }, {
            label: `${isCnEnabled ? "$(check) " : ""}力扣`,
            description: "leetcode-cn.com",
            detail: `启用中国版 LeetCode`,
            value: shared_1.Endpoint.LeetCodeCN,
        });
        const choice = yield vscode.window.showQuickPick(picks);
        if (!choice || choice.value === getLeetCodeEndpoint()) {
            return;
        }
        const leetCodeConfig = vscode.workspace.getConfiguration("leetcode");
        try {
            const endpoint = choice.value;
            yield leetCodeExecutor_1.leetCodeExecutor.switchEndpoint(endpoint);
            yield leetCodeConfig.update("endpoint", endpoint, true /* UserSetting */);
            vscode.window.showInformationMessage(`Switched the endpoint to ${endpoint}`);
        }
        catch (error) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to switch endpoint. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
        try {
            yield vscode.commands.executeCommand("leetcode.signout");
            yield cache_1.deleteCache();
            yield uiUtils_1.promptForSignIn();
        }
        catch (error) {
            yield uiUtils_1.promptForOpenOutputChannel("Failed to sign in. Please open the output channel for details.", uiUtils_1.DialogType.error);
        }
    });
}
exports.switchEndpoint = switchEndpoint;
function getLeetCodeEndpoint() {
    const leetCodeConfig = vscode.workspace.getConfiguration("leetcode");
    return leetCodeConfig.get("endpoint", shared_1.Endpoint.LeetCode);
}
exports.getLeetCodeEndpoint = getLeetCodeEndpoint;
//# sourceMappingURL=plugin.js.map