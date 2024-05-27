module.exports = {
  rules: {
    'no-semicolons': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow semicolons in JSX elements except inside expression containers',
          category: 'Possible Errors',
          recommended: false,
        },
        schema: [],
      },
      create(context) {
        return {
          JSXElement(node) {
            const sourceCode = context.getSourceCode();
            const text = sourceCode.getText(node);

            // Function to check for semicolons directly within JSX elements
            function checkForSemicolons(text) {
              const lines = text.split('\n');
              lines.forEach((line, index) => {
                const trimmedLine = line.trim();
                if (trimmedLine.endsWith(';')) {
                  const loc = {
                    start: { line: node.loc.start.line + index, column: line.indexOf(';') },
                    end: { line: node.loc.start.line + index, column: line.indexOf(';') + 1 },
                  };
                  context.report({
                    node,
                    message: 'Semicolons are not allowed directly in JSX elements.',
                    loc: loc,
                  });
                }
              });
            }

            // Check the children of the JSXElement for semicolons
            node.children.forEach((child) => {
              if (child.type === 'JSXText') {
                checkForSemicolons(child.value);
              }
            });
          },
        };
      },
    },
  },
};
