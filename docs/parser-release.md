# Shared parser release

Canonical implementation and evaluation: https://github.com/mblode/vscode-twig-language-2/blob/master/docs/plans/lossless-parser.md

## Release status, 8 September 2026

Version 0.10.1 is published on [GitHub](https://github.com/mblode/vscode-twig-language/releases/tag/v0.10.1). [Linux CI](https://github.com/mblode/vscode-twig-language/actions/runs/34177697932) passed. Across the three distributions, 962 unit/regression tests passed with no skips; the native Twig checks passed and all six extracted-package runs passed on VS Code 1.85.2 and stable 1.136.1. Every CI-packaged file matches the locally tested artifact. Local VSIX SHA-256: `679c3d8e7057d5a33969caaba84ba8fa2eea2c9df5f92fdc0b4957ba0c167da2`.

Marketplace and Open VSX publication of this patch remain pending. Chrome rejected the package picker because file URL access is disabled for its browser extension. No Marketplace upload was submitted. The previous Marketplace/Open VSX release remains live. Bulk issue and review replies remain stopped.
