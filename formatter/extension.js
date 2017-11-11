const vscode = require('vscode');
const prettydiff = require('./libs/prettydiff');

const dumpError = e => {
    if (e) console.log('beautify err:', e);
};

const beautifyDocRanges = (doc, ranges, type, formattingOptions) => {
    if (!doc) {
        vscode.window.showInformationMessage(
            "Beautify can't get the file information because the editor won't supply it. (File probably too large)"
        );
        throw '';
    }
    return Promise.resolve(type ? type : 'auto').then(config =>
        Promise.all(
            ranges.map(range =>
                prettydiff({
                    source: doc.getText(range),
                    lang: type,
                    mode: 'beautify',
                    langdefault: 'markup',
                    newline: true,
                    objsort: 'none',
                    unformatted: true,
                    wrap: 0
                })
            )
        )
    );
};

const documentEdit = (range, newText) => [
    vscode.TextEdit.replace(range, newText)
];

const fullRange = doc =>
    doc.validateRange(
        new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE)
    );

function fullEdit(type, doc, formattingOptions) {
    let name = doc.fileName;
    let base = vscode.workspace.rootPath || '';
    if (base && name.startsWith(base)) name = path.relative(base, name);

    const rng = fullRange(doc);
    return beautifyDocRanges(doc, [rng], type, formattingOptions).then(
        newText => documentEdit(rng, newText[0]),
        dumpError
    );
}

const applyEdits = (editor, ranges, edits) => {
    if (ranges.length !== edits.length) {
        console.log('FAILED:', ranges.length, edits.length, ':failed');
        vscode.window.showInformationMessage(
            "Beautify ranges didin't get back the right number of edits"
        );
        throw '';
    }
    return editor.edit(editorEdit => {
        for (let i = 0; i < ranges.length; i++) {
            editorEdit.replace(ranges[i], edits[i]);
        }
    });
};

function activate(context) {
    vscode.languages.registerDocumentFormattingEditProvider('twig', {
        provideDocumentFormattingEdits: function(document) {
            const active = vscode.window.activeTextEditor;
            if (!active || !active.document) return;

            const type = 'auto';
            let ranges = [];

            ranges = [fullRange(active.document)];

            if (ranges.length) {
                return beautifyDocRanges(active.document, ranges, type).then(
                    edits => applyEdits(active, ranges, edits),
                    dumpError
                );
            } else return Promise.resolve();
        }
    });
}

exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}
exports.deactivate = deactivate;
