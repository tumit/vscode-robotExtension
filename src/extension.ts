'use strict';

import * as vscode from 'vscode';
import {RobotCompletionProvider} from './RobotCompletionProvider';
import {VariableCompletionProvider} from './VariableCompletionProvider';
import {builtInCompletionProvider} from './builtInCompletionProvider';
import {RobotDefinitionProvider} from './RobotDefinitionProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log("robot extension is running");
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('robot', new builtInCompletionProvider(),"*", "["));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('robot', new VariableCompletionProvider(),"$"));
	context.subscriptions.push(vscode.languages.registerCompletionItemProvider('robot', new RobotCompletionProvider()));
	context.subscriptions.push(vscode.languages.registerDefinitionProvider('robot', new RobotDefinitionProvider()));
}

export function deactivate() {
	
}