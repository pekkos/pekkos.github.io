# Style linting with stylelint in Atom Editor

Set up style linting uring [stylelint](http://stylelint.io)



## Install Atom packages

### Linter package
In Atom preferences/install, search for [linter](https://atom.io/packages/linter) and install the package.

Go to preferences/packages, and configure settings for the linter package.
'Lint as you type' setting is recommended.


### Stylelint package
In Atom preferences/install, search for [linter-stylelint](https://atom.io/packages/linter) and install the package.

Go to preferences/packages, and configure settings for the linter-stylelint package.

Make sure you check the 'Disable when no config file is found', and uncheck 'Use standard'



## Usage
Stylelint uses the .stylelintrc configuration file, in order to look for formatting error in the code. Errors will be visible in the Atom console.

To temporarily disable linting within a file, use the disable commend and the rule to ignore:
    `/* stylelint-disable [rule] */`
and add a disable reason in a following comment. Stop disabling stylelint like so:
    `/* stylelint-enable [rule] */`

Defined rules can be found in the file .stylelintrc, and in the console error message.

### Example

    `.class {
        display: block;

        /* stylelint-disable declaration-block-no-duplicate-properties */
        /* Some browsers don't understand calc() */
        width: 58px;
        width: calc(3em + 8px);
        /* stylelint-enable declaration-block-no-duplicate-properties */

        height: 100%;
      }`
