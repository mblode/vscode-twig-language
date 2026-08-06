<div align="center">

# Twig Language

**Syntax highlighting, 110 snippets, hover documentation, and Pretty Diff formatting for Twig templates**

Version 1, superseded by [Twig Language 2](https://marketplace.visualstudio.com/items?itemName=mblode.twig-language-2). Install that instead unless you specifically want the HTML Intellisense this version adds.

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=mblode.twig-language">
    <img src="https://img.shields.io/visual-studio-marketplace/v/mblode.twig-language?style=flat&colorA=000000&colorB=000000" />
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

Paste that into Quick Open (`cmd+P`), or search "Twig Language" in the Extensions panel. For the maintained version, install `mblode.twig-language-2` instead.

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

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `twig-language.hover` | `true` | Show documentation for the Twig symbol under the cursor. |
| `twig-language.formatting` | `true` | Register the Pretty Diff document formatter. |
| `twig-language.indentStyle` | `tab` | Indent with `tab` or `space`. |
| `twig-language.quoteConvert` | `none` | Convert attribute and string quotes to `single` or `double`. |

Another 35 Pretty Diff options sit under the same prefix, covering brace style, attribute indentation, comment handling, and wrap width.

## Notes

- This version registers the `html` language id with a `twig` alias, so it claims `.twig`, `.html`, and `.html.twig`. Twig Language 2 drops that, which is why it stops fighting VS Code over file associations.
- Formatting runs on Pretty Diff 101.2.6, whose last upstream release was September 2019.
- Requires VS Code 1.30 or newer.

## License

MIT

---

Crafted by [<img src="https://blode.co/avatar-circle.png" width="20" align="top" />](https://blode.co) [Matthew Blode](https://blode.co)
