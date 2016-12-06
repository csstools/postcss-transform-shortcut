// tooling
const postcss = require('postcss');

// transform defaults
const defaults = {
	rotate:    [0, 0, 1, '0deg'],
	scale:     [1, 1, 1],
	translate: [0, 0, 0]
};

// plugin
module.exports = postcss.plugin('postcss-transform-shortcut', () => {
	return (css) => {
		// each each rule
		css.walkRules((rule) => {
			// recent transform declaration
			let transform;

			// recent transform values
			let values = [];

			rule.nodes.slice(0).forEach((decl) => {
				// whether the declaration is a transform
				if (decl.prop === 'transform') {
					// reset recent transform declaration
					transform = decl;

					// reset recent transform values
					values = postcss.list.space(decl.value);
				} else if (/^(rotate|scale|translate)?$/.test(decl.prop)) {
					// whether a transform declaration does not exist
					if (!transform) {
						// recent transform declaration is a modified clone of the shorthand
						transform = decl.cloneBefore({
							prop: 'transform'
						});
					}

					// new values from defaults
					const newValues = defaults[decl.prop].slice(0);

					// current values from the current property
					const currentValues = postcss.list.space(decl.value);

					// whether the property is rotate with one value
					if (decl.prop === 'rotate' && currentValues.length === 1) {
						// update the values
						newValues.splice(-1, 1, ...currentValues);
					} else {
						// update the values
						newValues.splice(0, currentValues.length, ...currentValues);
					}

					// push the shorthand to transform values
					values.push(decl.prop + '3d(' + newValues.join(',') + ')');

					// remove the shorthand
					decl.remove();
				}
			});

			// whether there are transform values
			if (values.length) {
				// assign the transform values
				transform.value = values.join(' ');
			}
		});
	};
});
