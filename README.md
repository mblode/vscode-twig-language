<div align="center">

# Twig Language

**Syntax highlighting, 110 snippets, hover documentation, and Twig formatting for Twig templates**

Twig Language keeps VS Code’s HTML language mode and IntelliSense for Twig files. It now uses the same formatter as [Twig Language 2](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language-2), which uses a separate `twig` language mode. Choose one extension for your workspace.

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=mblode.twig-language">
    <img src="https://vsmarketplacebadges.dev/version-short/mblode.twig-language.svg?style=flat&colorA=000000&colorB=000000" />
  </a>
  <a href="https://github.com/mblode/vscode-twig-language/blob/master/LICENSE.md">
    <img src="https://img.shields.io/github/license/mblode/vscode-twig-language?style=flat&colorA=000000&colorB=000000" />
  </a>
</p>

</div>

## Install

```bash
ext install mblode.twig-language
```

Paste that into Quick Open (`cmd+P`), or search "Twig Language" in the Extensions panel.

## Quickstart

Open a `.twig` file. Highlighting and hover apply straight away. Type a snippet prefix and press tab, so `entries` becomes:

```twig
{% for entry in craft.entries
	.section("news")
	.limit(10)
	.all()
%}
	<a href="{{ entry.url }}">{{ entry.title }}</a>
{% endfor %}
```

## Snippets

110 of them, all in [`src/snippets/snippets.json`](src/snippets/snippets.json):

- **Twig tags:** `if`, `for`, `block`, `embed`, `filter`, `macro`, `set`, `use`, `include`, `autoescape`, `verbatim`, and every closing form.
- **Craft CMS queries:** `entries`, `assets`, `categories`, `tags`, `users`, and `feed`, each with a loop body, plus `cache`, `nav`, `paginate`, `switch`, and `redirect`.
- **Forms:** `formlogin`, `formuserregistration`, `formuserprofile`, `formforgotpassword`, `formsetpassword`, `formsearch`, and `formsearchresults`, each a complete Craft form.
- **Helpers:** `csrf`, `head`, `endbody`, the `craft.app.request` getters, and the maths filters (`ceil`, `floor`, `round`, `min`, `max`, `random`, `shuffle`).

## Hover

Hold the cursor over Twig code to get its documentation: 33 filters, 15 functions, and 28 language constructs. Turn it off with `twig-language.hover`.

## Formatting

Version 0.10 replaces PrettyDiff with a formatter built for Twig and HTML. Run **Format Document**, **Format Selection**, or enable format on save:

```json
"[html]": {
  "editor.defaultFormatter": "mblode.twig-language",
  "editor.formatOnSave": true,
  "editor.insertSpaces": true,
  "editor.tabSize": 2
}
```

Twig expressions are recognized before HTML attributes, so comparisons and nested quotes stay intact. Formatting preserves attribute case and order, inline text boundaries, string contents, comments, whitespace trim markers, and raw/verbatim/pre/textarea bodies. HTML and Twig nesting are tracked separately to support conditional HTML wrappers. Selection formatting uses the surrounding document's indentation and edits only complete selected lines.

JavaScript and CSS in `script`/`style` elements use bundled Prettier when safely parseable. Twig-generated code that cannot be parsed independently, custom `js`/`css`/`scss` blocks, data scripts, and multiline Twig expressions stay unchanged. No PHP, Rust, project dependencies, or Prettier configuration is required. Workspace Prettier plugins and Tailwind class sorting are not loaded.

Existing line breaks and blank lines are retained; inline elements and text are not expanded or reflowed. Leading line indentation can change rendered whitespace, especially with CSS `white-space` rules or captured template output. Keep exact-whitespace sections inside an ignore region:

```twig
{# twig-ignore-start #}
  content to keep exactly as written
{# twig-ignore-end #}
```

HTML comment markers and paired `prettier-ignore-start/end` and legacy `parse-ignore-start/end` markers also work. Unclosed tokens return no edits and a short status message, with details in the **Twig Language** Output channel. Formatting runs in a cancellable worker with a 2 MiB document limit.

## Configuration

Settings apply immediately and support workspace, folder, and `[html]` overrides.

| Setting | Default | Description |
|---|---|---|
| `twig-language.hover` | `true` | Show Twig hover hints. |
| `twig-language.formatting` | `true` | Enable document and selection formatting. |
| `twig-language.indentStyle` | `editor` | Follow the current document, or override with `space` / `tab`. |
| `twig-language.tabSize` | `0` | Indent width; `0` follows the current document. |
| `twig-language.wrap` | `0` | Preferred HTML attribute width; `0` preserves wrapping. Embedded code uses 80 when unset. |
| `twig-language.forceAttribute` | `false` | Put each HTML attribute on its own line. |
| `twig-language.spaceClose` | `false` | Add a space before `/>`. |
| `twig-language.newLine` | `true` | Add a final newline after a complete tag; preserve literal text tails. |
| `twig-language.embeddedFormatting` | `true` | Format supported JavaScript/CSS bodies with Prettier. |
| `twig-language.ignore` | `[]` | File globs to skip, such as `**/vendor/**`. Supports `*`, `**`, and `?`. |
| `twig-language.formatTimeout` | `5000` | Maximum worker time in milliseconds, from 100 to 30000. |

### Migrating from 0.9.4

VS Code 1.85 or newer is required. Indentation now follows the document by default. Explicit `indentStyle` and `tabSize` overrides still work. EditorConfig support comes through extensions that set the document's indentation options.

PrettyDiff-only settings remain recognized as deprecated configuration keys but no longer transform code: `braceLine`, `bracePadding`, `braceStyle`, `braces`, `commentLine`, `comments`, `compressedCss`, `correct`, `cssInsertLines`, `elseLine`, `endComma`, `forceIndent`, `formatArray`, `formatObject`, `functionName`, `indentLevel`, `methodChain`, `neverFlatten`, `noCaseIndent`, `noLeadZero`, `objectSort`, `preserve`, `preserveComment`, `quoteConvert`, `space`, `tagMerge`, `tagSort`, `ternaryLine`, `unformatted`, `variableList`, and `vertical`.

Formatting never sorts attributes or tags, converts Twig quotes, merges HTML elements, or repairs missing syntax. Supported embedded languages use Prettier defaults. Use `formatting: false`, file globs, or paired ignore regions to opt out.

## Language mode and HTML support

This extension keeps its existing `html` language ID and associations for `.twig`, `.html.twig`, and `.html`, so VS Code’s HTML completion and Emmet remain available. Its formatter is available for documents in HTML mode, including plain HTML. Use **Format Document With… → Configure Default Formatter → Twig Language**, or the `[html]` configuration above, to select it when other formatters are installed. The same setting applies to all HTML-mode documents.

Use `twig-language.*` settings for this listing. Twig Language 2 uses `twig-language-2.*` and `[twig]`; its settings do not configure this extension. Existing syntax highlighting, snippets, hover data and language configuration are retained.

## Development

```sh
npm ci
composer install --working-dir=test/php
npm test
npm run test:oracle
npm run build
npm run test:extension
npm run package
```

Node 22+ is used for development tooling. PHP 8.2+ and Composer are needed only for the independent Twig lexer/render tests. `npm test` runs those tests when installed; `test:oracle` requires them. The extension has no PHP runtime dependency. `VSCODE_VERSION=stable npm run test:extension` checks the current VS Code release; the default checks the minimum supported version. `TWIG_EXTENSION_PATH` can point to an extracted VSIX for the same integration suite.

The [release plan](docs/plans/twig-formatter.md) records the port and verification. The shared [formatter audit](https://github.com/mblode/vscode-twig-language-2/blob/2f3207c3bdc6f8f1d9893ff1b783f7e5e9024b38/docs/formatter-audit.md) covers all issues, pull requests, comments and Marketplace reviews from both Twig extensions and Pretty Formatter. Regression fixtures retain their original report URLs.

## License

MIT

---

Crafted by [Matthew Blode](https://blode.co)

## Language compatibility

Both Twig extensions now use the same formatter, grammar, language configuration and snippets. Twig Language 2 keeps the dedicated `twig` language ID and adds bundled Microsoft HTML completion, hover and automatic closing tags. Twig Language keeps the `html` language ID and native VS Code HTML IntelliSense. The extension IDs and setting namespaces remain compatible with existing installations. Choose one Twig extension as the default formatter for its language mode.

Highlighting regressions cover escaped quotes, compact `?:` operators, `default` without arguments, custom HTML elements, verbatim content, and embedded CSS/JS/SCSS boundaries. Invalid snippet language scopes and the malformed Craft assets query were corrected.

The extensions run in desktop and remote Node extension hosts (VS Code 1.85 or newer). They support untrusted and virtual workspaces without executing workspace code or loading project formatter plugins. A browser-only extension host is not currently provided.
