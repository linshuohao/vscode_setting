'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
function init(context) {
    const cwd = vscode.workspace.rootPath;
    // register snippet
    context.subscriptions.push(vscode_1.debug.registerDebugConfigurationProvider('Egg', {
        provideDebugConfigurations(folder, token) {
            return [
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Egg Debug",
                    "runtimeExecutable": "npm",
                    "runtimeArgs": ["run", "debug", "--", "--inspect-brk"],
                    "console": "integratedTerminal",
                    "restart": true,
                    "protocol": "auto",
                    "port": 9229,
                    "autoAttachChildProcesses": true
                },
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Egg Test",
                    "runtimeExecutable": "npm",
                    "runtimeArgs": ["run", "test-local", "--", "--inspect-brk"],
                    "protocol": "auto",
                    "port": 9229,
                    "autoAttachChildProcesses": true
                },
                {
                    "type": "node",
                    "request": "attach",
                    "name": "Egg Attach to remote",
                    "localRoot": "${workspaceRoot}",
                    "remoteRoot": "/usr/src/app",
                    "address": "localhost",
                    "protocol": "auto",
                    "port": 9999
                }
            ];
        },
    }));
    // const agentConfig: DebugConfiguration = {
    //   "type": "node",
    //   "request": "attach",
    //   "name": "Egg Agent",
    //   "restart": true,
    //   "protocol": "inspector",
    //   "port": 5800
    // };
    // const workerConfig: DebugConfiguration = {
    //   "type": "node",
    //   "request": "attach",
    //   "name": "Egg Worker",
    //   "restart": true,
    //   "protocol": "inspector",
    //   "port": 9999
    // };
    // debug.onDidStartDebugSession(e => {
    //   console.log('onDidStartDebugSession: %s, %j', e.name, e);
    //   if (e.name === 'Egg Debug with brk') {
    //     const folder = workspace.workspaceFolders[0];
    //     debug.startDebugging(folder, agentConfig).then(() => debug.startDebugging(folder, workerConfig));
    //   }
    // });
}
exports.init = init;
//# sourceMappingURL=EggDebugger.js.map