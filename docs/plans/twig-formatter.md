# Twig Language formatter port

Starting point: clean `master` at `ec49833`. Release target: `mblode.twig-language` 0.10.0, explicitly requested after the Twig Language 2 release.

## Outcome and compatibility

Give existing Twig Language users the source-preserving formatter already shipped in Twig Language 2 0.11.0. Keep this listing’s `html` language ID, `.twig` / `.html.twig` / `.html` associations, built-in HTML IntelliSense, grammar, language configuration, snippets and hover data. Keep the `twig-language.*` settings namespace and apply resource/language overrides for `[html]`. Raise the VS Code floor to 1.85 for the worker runtime, follow document indentation by default, and document deprecated PrettyDiff transformations.

## Implementation

Port the formatter, worker service, regression corpus, independent official Twig oracle, build tooling and CI from `mblode/vscode-twig-language-2` commit `3e8ce8881ac71c09c62919d0cecefe64dc46cfd7`. Keep engine files byte-identical to that tested implementation. Adapt only the extension identity, HTML provider registration, settings and integration tests. The [shared audit](https://github.com/mblode/vscode-twig-language-2/blob/2f3207c3bdc6f8f1d9893ff1b783f7e5e9024b38/docs/formatter-audit.md) already covers all 190 issues, 31 PRs, 526 comments and 45 Marketplace ratings/reviews across the three repositories. Reuse its evidence and preserve fixture provenance.

## Verification and release gates

1. Install from the lockfiles, run the full regression suite with the official Twig lexer/render oracle, build and audit dependencies.
2. Run real VS Code document, selection and save formatting with this extension’s identity and `[html]` settings, including built-in HTML support and all three filename patterns. Verify both VS Code 1.85.2 and current stable.
3. Package and inspect the VSIX. Verify original language assets and shared formatter source remain unchanged, then run the integration suite against the extracted package.
4. Commit and push, require Linux CI to pass, publish GitHub and Marketplace releases, and compare the public download to the tested package.

## Boundaries and recovery

The engine preserves ambiguous generated code and returns no edits for incomplete tokens. This port does not resolve grammar or IntelliSense feature requests or claim fixes for reports without reproducible source. Keep old releases available; users can disable formatting or install a prior version. Correct any subsequent regression through a new version without rewriting published history.

## Status

Port implemented. Verification and publication are pending.


## Expanded scope, 8 September 2026

The user requested Twig Language 1 fixes, consolidation, current VS Code practices and Pretty Formatter fixes. This extends the initial formatter-only boundary above. Twig Language 2 is the canonical implementation; Twig Language retains its `html` identity and namespace as a compatibility distribution. Neither listing is deleted or deprecated. Migration of existing installations is a separate Marketplace action: Microsoft documents an opt-in migration prompt, not an automatic merge of extension IDs or statistics.

Both Twig distributions share identical formatter code, HTML service adapter, grammar, snippets and language configuration. The separate Twig language now receives HTML completions and closing tags through Microsoft's bundled language service, using an offset-preserving projection that masks Twig regions. Legacy HTML mode continues using the native HTML service.

Acceptance: all formatter/oracle tests remain green; new TextMate tests use actual VS Code 1.85.2 embedded grammars; packaged extension tests cover HTML completion, closing tags, existing language identity, settings and format/save behavior. All published VSIX files must be tested in minimum and stable VS Code, built in CI and verified by public Marketplace download. Ambiguous reports without source and broader feature requests remain recorded as such in the audit. Browser-only hosting and arbitrary workspace plugins remain outside this release.

Current VS Code references: https://code.visualstudio.com/api/working-with-extensions/publishing-extension#deprecating-extensions ; https://code.visualstudio.com/api/extension-guides/workspace-trust ; https://code.visualstudio.com/api/extension-guides/virtual-workspaces ; https://code.visualstudio.com/api/language-extensions/embedded-languages .
