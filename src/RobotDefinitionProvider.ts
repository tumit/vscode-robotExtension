'use strict';

import vscode = require('vscode');
import {ResourceProvider} from './ResourceProvider';
import {KeywordProvider} from './KeywordProvider';
import {File} from './File';
import {Util} from './Util';

export class RobotDefinitionProvider implements vscode.DefinitionProvider{

    public provideDefinition(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken):vscode.ProviderResult<vscode.Definition>{
        return Promise.resolve(RobotDefinitionProvider.definitionProvider(document, position));
    }

    private static definitionProvider(document: vscode.TextDocument, position: vscode.Position):vscode.ProviderResult<vscode.Definition>{
        let key = KeywordProvider.getKeywordByPosition(document, position);
        if(key != null){
            if(key.length == 2){
                return RobotDefinitionProvider.includedKeywordDefinition(document, key[0], key[1]);
            }
            else{
                return RobotDefinitionProvider.localKeywordDefinition(document, key[0]);
            }
        }
        return null;
    }

    private static localKeywordDefinition(document: vscode.TextDocument, keyword:string):vscode.ProviderResult<vscode.Definition>{
        let result;
        try{
            let lineNumber = KeywordProvider.getKeywordPosition(new File(document.fileName), keyword);
            result = new vscode.Location(vscode.Uri.file(document.fileName), new vscode.Position(lineNumber, 0));
        }
        catch(e){
            console.log(e);
        }
        finally{
            return result
        }
    }

    private static includedKeywordDefinition(document: vscode.TextDocument, file:string, keyword:string):vscode.ProviderResult<vscode.Definition>{
        let result;
        try{
            let resource = ResourceProvider.getResourceByName(file, document);
            let lineNumber = KeywordProvider.getKeywordPosition(resource, keyword);
            result = new vscode.Location(vscode.Uri.file(resource.path), new vscode.Position(lineNumber, 0));
        }
        catch(e){
            console.log(e);
        }
        finally{
            return result
        }
    }
    
}