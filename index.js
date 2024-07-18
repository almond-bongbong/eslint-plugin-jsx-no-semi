module.exports = {
	rules: {
		// Define a new custom ESLint rule named 'no-semicolons'
		'no-semicolons': {
			meta: {
				type: 'problem', // This rule identifies potential problems in code
				docs: {
					description: 'Disallow semicolons in JSX elements except inside expression containers',
					category: 'Possible Errors', // Categorize the rule under 'Possible Errors'
					recommended: false // This rule is not recommended by default
				},
				schema: [] // No options are needed for this rule
			},
			create(context) {
				// Create a Set to keep track of reported nodes to avoid duplicate reports
				const reportedNodes = new Set();
				// Regular expression to match lines ending with a semicolon
				const semicolonPattern = /;$/;

				// Function to check for semicolons in the given text and report if found
				function checkForSemicolons(text, node) {
					// Split the text into individual lines
					const lines = text.split('\n');
					lines.forEach((line, index) => {
						const trimmedLine = line.trim();
						// Check if the trimmed line ends with a semicolon
						if (semicolonPattern.test(trimmedLine)) {
							// Define the location of the semicolon in the code
							const loc = {
								start: {
									line: node.loc.start.line + index,
									column: line.indexOf(';')
								},
								end: {
									line: node.loc.start.line + index,
									column: line.indexOf(';') + 1
								}
							};
							// Report the semicolon if this line has not been reported yet
							if (!reportedNodes.has(loc.start.line)) {
								context.report({
									node,
									message: 'Semicolons are not allowed directly in JSX elements.',
									loc
								});
								// Add the line to the Set of reported nodes
								reportedNodes.add(loc.start.line);
							}
						}
					});
				}

				// Function to recursively check nodes for semicolons
				function checkNode(node) {
					// Check if the node is a JSX element or fragment
					if (node.type === 'JSXElement' || node.type === 'JSXFragment') {
						// Iterate over the children of the JSX element/fragment
						node.children.forEach((child) => {
							// If the child is a JSX text node, check for semicolons
							if (child.type === 'JSXText') {
								checkForSemicolons(child.value, child);
							}
							// If the child is another JSX element or fragment, recursively check it
							else if (child.type === 'JSXElement' || child.type === 'JSXFragment') {
								checkNode(child);
							}
						});
					}
				}

				// Return the visitor functions for JSX elements and fragments
				return {
					JSXElement(node) {
						checkNode(node); // Check the JSX element node
					},
					JSXFragment(node) {
						checkNode(node); // Check the JSX fragment node
					}
				};
			}
		}
	}
}; 
