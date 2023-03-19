# Setting up dev-tools

## Install pre-commit

https://pre-commit.com/#installation
Pre-commit requires python3.8+

In addition to options linked in `pre-commit's` documentation you can use `pipx` (Python's
equivalent of npx), to get it checkout: https://pypa.github.io/pipx/

## Setup hooks:

Run `pre-commit install` in the root of the project.

If you don't do that, someone will apply the rules adding unrelated changes eventually. :)

## What now?

You are ready to go! Every time you commit, checks from `.pre-commit-config.yaml` will run,
warning you of potential errors!

## Potential workflow disturbances.

Whether you do a commit from CLI or via some ui (ex. Webstorm) you might see the commit failed
to end successfully.
That means a `pre-commit` hook had run and failed the check.
At this moment `pre-commit` could have applied an autofix
(ex. prettier or linter could have handle the error).

If the autofixes went smoothly automatic you can confidently reapply the instruction - apply a
commit with the same message as before or click a button in your ui. When some fixes couldn't be
applied (ex. more complex linter rules) - go ahead and fix them, `pre-commit` errors should point you
well enough about what you need to change. After that, commit again (taking into consideration
the autofix circumstance when you need to apply the commit again).

Thank you for contributing!
