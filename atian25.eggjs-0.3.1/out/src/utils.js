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
const path = require("path");
const mz_1 = require("mz");
const semver = require("semver");
function getFramework(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgInfo = require(path.join(cwd, 'package.json'));
        const framework = pkgInfo.egg && pkgInfo.egg.framework;
        if (framework)
            return framework;
        const webnames = vscode.workspace.getConfiguration('eggjs').framework.concat([
            '@ali/larva',
            '@ali/nut',
            '@ali/begg',
            'chair',
            '@ali/egg',
            'egg',
        ]);
        for (const name of webnames) {
            const dirpath = path.join(cwd, 'node_modules', name);
            if (yield mz_1.fs.exists(dirpath)) {
                return name;
            }
        }
    });
}
exports.getFramework = getFramework;
function isLegacyNode(cwd) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkgInfo = require(path.join(cwd, 'package.json'));
        const install = pkgInfo.engines && (pkgInfo.engines['install-alinode'] || pkgInfo.engines['install-node']);
        if (install) {
            return !semver.satisfies('7.6.0', install);
        }
    });
}
exports.isLegacyNode = isLegacyNode;
//# sourceMappingURL=utils.js.map