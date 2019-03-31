import vscode from 'vscode'
import prettydiff from 'prettydiff'
import pattern from './format/pattern'
import { defaults, rules } from './format/config'

import snippetsArr from './hover/filters.json'
import functionsArr from './hover/functions.json'
import twigArr from './hover/twig.json'

const twigConfig = vscode.workspace.getConfiguration('twig-language');

function createHover(snippet, type) {
    const example =
        typeof snippet.example == 'undefined' ? '' : snippet.example;
    const description =
        typeof snippet.description == 'undefined' ? '' : snippet.description;
    return new vscode.Hover({
        language: type,
        value: description + '\n\n' + example
    });
}

const blocks = (code, open, name, source, close) => {
    const config = Object.assign({}, defaults, rules[name], { source })
    const pretty = prettydiff.mode(config)
    return pattern.ignore(`${open.trim()}\n\n${pretty.trim()}\n\n${close.trim()}`)
}

const prettyDiff = (document, range) => {
    const result = [];
    const contents = document.getText(range)
    const source = contents.replace(pattern.matches(), blocks)
    const assign = Object.assign({}, defaults, rules.html, { source })
    const output = prettydiff.mode(assign).replace(pattern.ignored, '')
    result.push(vscode.TextEdit.replace(range, output.trim()));
    return result
};

function activate(context) {
    const active = vscode.window.activeTextEditor;
    if (!active || !active.document) return;

    registerDocType('html');

    function registerDocType(type) {
        if (twigConfig.hover === true) {
            context.subscriptions.push(
                vscode.languages.registerHoverProvider(type, {
                    provideHover(document, position) {
                        const range = document.getWordRangeAtPosition(position);
                        const word = document.getText(range);

                        for (const snippet in snippetsArr) {
                            if (
                                snippetsArr[snippet].prefix == word ||
                                snippetsArr[snippet].hover == word
                            ) {
                                return createHover(snippetsArr[snippet], type);
                            }
                        }

                        for (const snippet in functionsArr) {
                            if (
                                functionsArr[snippet].prefix == word ||
                                functionsArr[snippet].hover == word
                            ) {
                                return createHover(functionsArr[snippet], type);
                            }
                        }

                        for (const snippet in twigArr) {
                            if (
                                twigArr[snippet].prefix == word ||
                                twigArr[snippet].hover == word
                            ) {
                                return createHover(twigArr[snippet], type);
                            }
                        }
                    }
                })
            );
        }

        if (twigConfig.formatting === true) {
            context.subscriptions.push(
                vscode.languages.registerDocumentFormattingEditProvider(type, {
                    provideDocumentFormattingEdits: function (
                        document
                    ) {
                        const start = new vscode.Position(0, 0);
                        const end = new vscode.Position(
                            document.lineCount - 1,
                            document.lineAt(document.lineCount - 1).text.length
                        );
                        const rng = new vscode.Range(start, end);
                        return prettyDiff(document, rng);
                    }
                })
            );

            context.subscriptions.push(
                vscode.languages.registerDocumentRangeFormattingEditProvider(
                    type,
                    {
                        provideDocumentRangeFormattingEdits: function (
                            document,
                            range
                        ) {
                            return prettyDiff(document, range);
                        }
                    }
                )
            );
        }
    }
}

exports.activate = activate;
