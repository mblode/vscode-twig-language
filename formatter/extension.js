// var vscode = require('vscode');
// var prettydiff = require('./libs/prettydiff');
// var fs = require('fs');

// function activate(context) {
//     vscode.languages.registerDocumentFormattingEditProvider('twig', {
//         provideDocumentFormattingEdits: function(document) {
//             var source = document.getText();
//             var args = {
//                 source: source,
//                 mode: 'beautify',
//                 lang: 'auto'
//             };
//             var output = prettydiff(args);
//             var path = document.uri.path;
//             fs.writeFile(path, output, err => {
//                 if (err) throw err;
//             });
//         }
//     });

// }
// exports.activate = activate;

const vscode = require('vscode');
// const minimatch = require('minimatch');
// const path = require('path');
const prettydiff = require('./libs/prettydiff');

const options = {
    _: {
      inchar: [
        "indent_with_tabs", "indent_char", function(indent_with_tabs, indent_char) {
          if (indent_with_tabs === true) {
            return "\t";
          } else {
            return indent_char;
          }
        }
      ],
      insize: [
        "indent_with_tabs", "indent_size", function(indent_with_tabs, indent_size) {
          if (indent_with_tabs === true) {
            return 1;
          } else {
            return indent_size;
          }
        }
      ],
      objsort: function(objsort) {
        return objsort || false;
      },
      preserve: [
        'preserve_newlines', function(preserve_newlines) {
          if (preserve_newlines === true) {
            return "all";
          } else {
            return "none";
          }
        }
      ],
      cssinsertlines: "newline_between_rules",
      comments: [
        "indent_comments", function(indent_comments) {
          if (indent_comments === false) {
            return "noindent";
          } else {
            return "indent";
          }
        }
      ],
      force: "force_indentation",
      quoteConvert: "convert_quotes",
      vertical: [
        'align_assignments', function(align_assignments) {
          if (align_assignments === true) {
            return "all";
          } else {
            return "none";
          }
        }
      ],
      wrap: "wrap_line_length",
      space: "space_after_anon_function",
      noleadzero: "no_lead_zero",
      endcomma: "end_with_comma",
      methodchain: [
        'break_chained_methods', function(break_chained_methods) {
          if (break_chained_methods === true) {
            return false;
          } else {
            return true;
          }
        }
      ],
      ternaryline: "preserve_ternary_lines",
      bracepadding: "space_in_paren"
    },
    CSV: true,
    Coldfusion: true,
    ERB: true,
    EJS: true,
    HTML: true,
    Handlebars: true,
    Mustache: true,
    Nunjucks: true,
    XML: true,
    SVG: true,
    Spacebars: true,
    JSX: true,
    JavaScript: true,
    CSS: true,
    SCSS: true,
    JSON: true,
    TSS: true,
    Twig: true,
    LESS: true,
    Swig: true,
    "UX Markup": true,
    Visualforce: true,
    "Riot.js": true,
    XTemplate: true,
    "Golang Template": true
  };

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
                    mode: 'beautify'
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
