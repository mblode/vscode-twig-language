const vscode = require("vscode");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
exports.run = async () => {
  const extension = vscode.extensions.getExtension("mblode.twig-language");
  assert(extension, "extension must be installed");
  await extension.activate();
  assert(extension.isActive);
  const root = vscode.workspace.workspaceFolders[0].uri.fsPath;
  async function open(name, source) {
    const file = path.join(root, name);
    await fs.writeFile(file, source);
    const doc = await vscode.workspace.openTextDocument(file);
    await vscode.window.showTextDocument(doc);
    assert.equal(doc.languageId, "html");
    return doc;
  }
  const config = vscode.workspace.getConfiguration("twig-language");
  const update = (key, value) =>
    config.update(key, value, vscode.ConfigurationTarget.Workspace);
  const htmlDefaults = { "editor.defaultFormatter": "mblode.twig-language" };
  await vscode.workspace.getConfiguration().update(
    "[html]", htmlDefaults, vscode.ConfigurationTarget.Workspace,
  );
  // The execute-provider test command falls through to another provider when
  // this one returns no edits. Isolate these assertions; test the real editor
  // command with both formatters enabled below.
  const htmlConfig = vscode.workspace.getConfiguration("html");
  await htmlConfig.update("format.enable", false, vscode.ConfigurationTarget.Workspace);
  const options = { tabSize: 2, insertSpaces: true };
  const edits = async (doc, opts = options) =>
    (await vscode.commands.executeCommand(
      "vscode.executeFormatDocumentProvider",
      doc.uri,
      opts,
    )) || [];
  const apply = async (doc, changes) => {
    const edit = new vscode.WorkspaceEdit();
    edit.set(doc.uri, changes);
    assert(await vscode.workspace.applyEdit(edit));
  };
  const source = "<div>\n{% if x %}\n<span>{{x}}</span>\n{% endif %}\n</div>\n";
  const doc = await open("document.twig", source);
  await apply(doc, await edits(doc));
  assert.equal(
    doc.getText(),
    "<div>\n  {% if x %}\n    <span>{{ x }}</span>\n  {% endif %}\n</div>\n",
  );
  assert.deepEqual(
    await edits(doc),
    [],
    "unchanged document must not receive replacements",
  );
  await update("indentStyle", "tab");
  await apply(doc, await edits(doc));
  assert(
    doc.getText().includes("\n\t\t<span>"),
    "settings changes must work without reload",
  );
  await update("formatting", false);
  assert.deepEqual(await edits(doc), []);
  await update("formatting", true);
  await update("indentStyle", "editor");
  await apply(doc, await edits(doc, { tabSize: 3, insertSpaces: true }));
  assert(
    doc.getText().includes("\n      <span>"),
    "current document options must win",
  );
  await vscode.workspace
    .getConfiguration()
    .update(
      "[html]",
      { ...htmlDefaults, "twig-language.tabSize": 4 },
      vscode.ConfigurationTarget.Workspace,
    );
  await apply(doc, await edits(doc));
  assert(
    doc.getText().includes("\n        <span>"),
    "language-scoped overrides must apply to the document",
  );
  await vscode.workspace
    .getConfiguration()
    .update("[html]", htmlDefaults, vscode.ConfigurationTarget.Workspace);
  await update("ignore", ["**/document.twig"]);
  assert.deepEqual(await edits(doc), []);
  await update("ignore", []);
  const selected = await open("selection.twig", source);
  const range = new vscode.Range(2, 0, 3, 0);
  const selection = await vscode.commands.executeCommand(
    "vscode.executeFormatRangeProvider",
    selected.uri,
    range,
    options,
  );
  assert(selection.length);
  assert(
    selection.every((e) => e.range.start.line === 2 && e.range.end.line === 2),
  );
  await apply(selected, selection);
  assert.equal(
    selected.getText(),
    "<div>\n{% if x %}\n    <span>{{ x }}</span>\n{% endif %}\n</div>\n",
  );
  const broken = await open("broken.twig", '<p title="{{ unfinished');
  assert.deepEqual(await edits(broken), []);
  assert.equal(broken.getText(), '<p title="{{ unfinished');
  const crlf = await open("windows.twig", "<script>const x=1;</script>\r\n");
  await apply(crlf, await edits(crlf));
  assert.equal(crlf.eol, vscode.EndOfLine.CRLF);
  assert(!/(?<!\r)\n/.test(crlf.getText()));
  const editorConfig = vscode.workspace.getConfiguration("editor");
  await editorConfig.update(
    "defaultFormatter",
    "mblode.twig-language",
    vscode.ConfigurationTarget.Workspace,
  );
  await editorConfig.update(
    "formatOnSave",
    true,
    vscode.ConfigurationTarget.Workspace,
  );
  await editorConfig.update("tabSize", 2, vscode.ConfigurationTarget.Workspace);
  await editorConfig.update(
    "insertSpaces",
    true,
    vscode.ConfigurationTarget.Workspace,
  );
  await editorConfig.update(
    "detectIndentation",
    false,
    vscode.ConfigurationTarget.Workspace,
  );
  const saving = await open("save.twig", "<p>{{value}}</p>");
  await apply(saving, [
    vscode.TextEdit.insert(new vscode.Position(0, 3), "{{other}}"),
  ]);
  assert(await saving.save());
  assert.equal(
    await fs.readFile(saving.uri.fsPath, "utf8"),
    "<p>{{ other }}{{ value }}</p>\n",
    "format on save must write formatted contents",
  );
  const hover = await open("hover.twig", "{{ value|batch(2) }}");
  const hovers = await vscode.commands.executeCommand(
    "vscode.executeHoverProvider",
    hover.uri,
    new vscode.Position(0, 10),
  );
  assert(hovers.length, "hover hints must remain available");
  for (const name of ["legacy.html.twig", "plain.html"]) {
    const html = await open(name, source);
    await apply(html, await edits(html));
    assert(html.getText().includes("    <span>{{ x }}</span>"), name);
  }
  const htmlSupport = vscode.extensions.getExtension("vscode.html-language-features");
  assert(htmlSupport, "built-in HTML support must be available");
  await htmlSupport.activate();
  const completionDoc = await open("completion.twig", '<div cl');
  const completions = await vscode.commands.executeCommand(
    "vscode.executeCompletionItemProvider",
    completionDoc.uri,
    new vscode.Position(0, 7),
  );
  assert(
    completions.items.some((item) => (typeof item.label === "string" ? item.label : item.label.label) === "class"),
    "Twig files must retain built-in HTML attribute completions",
  );
  await htmlConfig.update("format.enable", true, vscode.ConfigurationTarget.Workspace);
  const coexist = await open("coexist.twig", source);
  await update("formatting", false);
  await vscode.commands.executeCommand("editor.action.formatDocument");
  assert.equal(coexist.getText(), source, "selected disabled formatter must not fall through to HTML");
  await update("formatting", true);
  await vscode.commands.executeCommand("editor.action.formatDocument");
  assert(coexist.getText().includes("    <span>{{ x }}</span>"));
  console.log(
    "VS Code integration: activation, document/range/save formatting, live HTML settings, indentation, ignore, errors, CRLF, hover, file associations and HTML IntelliSense passed.",
  );
};
