const vscode = require('vscode');
const prettydiff = require('./libs/prettydiff');

const prettyDiff = (document, range, options) => {
    const result = [];
    const content = document.getText(range);

    var newText = prettydiff({
        source: content,
        lang: 'auto',
        mode: 'beautify',
        langdefault: 'markup',
        newline: true,
        objsort: 'none',
        unformatted: true,
        wrap: 0,
        insize: options.tabSize,
        methodchain: 'chain',
        html: true,
        Twig: true
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
                    const rng = new vscode.Range(
                        0,
                        0,
                        Number.MAX_VALUE,
                        Number.MAX_VALUE
                    );
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
