const vscode = require('vscode');
const prettydiff = require('prettydiff2');

var snippetsArr = require('./hover/filters.json');
var functionsArr = require('./hover/functions.json');
var twigArr = require('./hover/twig.json');

function createHover(snippet) {
    var example = typeof snippet.example == 'undefined' ? '' : snippet.example;
    var description =
        typeof snippet.description == 'undefined' ? '' : snippet.description;
    return new vscode.Hover({
        language: 'twig',
        value: description + '\n\n' + example
    });
}

const prettyDiff = (document, range, options) => {
    const result = [];
    const content = document.getText(range);

    var newText = prettydiff({
        source: content,
        lang: 'twig',
        mode: 'beautify',
        insize: options.tabSize,
        newline: true,
        objsort: 'none',
        wrap: 0,
        methodchain: 'chain',
        bracepadding: false,
        space: false,
        endcomma: false
    });

    result.push(vscode.TextEdit.replace(range, newText));
    return result;
};

function activate(context) {
    const active = vscode.window.activeTextEditor;
    if (!active || !active.document) return;

    registerDocType('twig');

    function registerDocType(type) {
        context.subscriptions.push(
            vscode.languages.registerHoverProvider(type, {
                provideHover(document, position, token) {
                    var range = document.getWordRangeAtPosition(position);
                    var word = document.getText(range);

                    for (var snippet in snippetsArr) {
                        if (
                            snippetsArr[snippet].prefix == word ||
                            snippetsArr[snippet].hover == word
                        ) {
                            return createHover(snippetsArr[snippet]);
                        }
                    }

                    for (var snippet in functionsArr) {
                        if (
                            functionsArr[snippet].prefix == word ||
                            functionsArr[snippet].hover == word
                        ) {
                            return createHover(functionsArr[snippet]);
                        }
                    }

                    for (var snippet in twigArr) {
                        if (
                            twigArr[snippet].prefix == word ||
                            twigArr[snippet].hover == word
                        ) {
                            return createHover(twigArr[snippet]);
                        }
                    }
                }
            })
        );

        context.subscriptions.push(
            vscode.languages.registerDocumentFormattingEditProvider(type, {
                provideDocumentFormattingEdits: function(
                    document,
                    options,
                    token
                ) {
                    var start = new vscode.Position(0, 0);
                    var end = new vscode.Position(
                        document.lineCount - 1,
                        document.lineAt(document.lineCount - 1).text.length
                    );
                    const rng = new vscode.Range(start, end);
                    return prettyDiff(document, rng, options);
                }
            })
        );

        context.subscriptions.push(
            vscode.languages.registerDocumentRangeFormattingEditProvider(type, {
                provideDocumentRangeFormattingEdits: function(
                    document,
                    range,
                    options,
                    token
                ) {
                    let end = range.end;
                    if (end.character === 0) {
                        end = end.translate(-1, Number.MAX_VALUE);
                    } else {
                        end = end.translate(0, Number.MAX_VALUE);
                    }

                    const rng = new vscode.Range(
                        new vscode.Position(range.start.line, 0),
                        end
                    );

                    return prettyDiff(document, rng, options);
                }
            })
        );
    }
}

exports.activate = activate;
