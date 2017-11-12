const vscode = require('vscode');
const prettydiff = require('./libs/prettydiff');

const prettyDiff = (document, range, options) => {
    if (range === null) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(
            document.lineCount - 1,
            document.lineAt(document.lineCount - 1).text.length
        );
        range = new vscode.Range(start, end);
    }

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
        methodchain: 'chain',
        html: true,
        Twig: true
    });

    result.push(vscode.TextEdit.replace(range, newText));
    return result
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
                    return prettyDiff(document, null, options);
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
                    let start = document.offsetAt(range.start);
                    let end = document.offsetAt(range.end);
                    return prettyDiff(
                        document,
                        new vscode.Range(start, end),
                        options
                    );
                }
            })
        );
    }
}

exports.activate = activate;
