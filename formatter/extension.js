const vscode = require('vscode');
const prettydiff = require('prettydiff2');

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
        wrap: 250,
        methodchain: 'chain',
        bracepadding: false,
        space: false,
        endcomma: false,

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
            vscode.languages.registerDocumentFormattingEditProvider(type, {
                provideDocumentFormattingEdits: function(
                    document,
                    options,
                    token
                ) {
                    var start = new vscode.Position(0, 0);
                    var end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
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
