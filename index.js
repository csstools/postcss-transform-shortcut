var postcss = require('postcss');

module.exports = postcss.plugin('postcss-transform-shortcut', function (opts) {
	opts = opts || {};

	var matchDecl = /^(rotate|scale|translate)$/i;

	var defaults = {
		rotate: [0, 0, 1],
		scale: [1, 1, 1],
		translate: [0, 0, 0]
	};

	return function (css) {
		css.eachRule(function (rule) {
			var transformDecl;
			var transformDeclValues = [];

			rule.nodes.slice(0).forEach(function (decl) {
				if (decl.type === 'decl' && matchDecl.test(decl.prop)) {
					transformDecl = transformDecl || decl.cloneBefore({
						prop: 'transform',
						value: ''
					});

					var value = defaults[decl.prop].slice(0);
					var values = postcss.list.space(decl.value);

					value.splice.apply(value, [0, values.length].concat(values));

					var name = decl.prop + (values > 2 ? '3d' : '');

					transformDeclValues.push(name + '(' + value.join(',') + ')');

					decl.removeSelf();
				}
			});

			transformDecl.value = transformDeclValues.join(' ');
		});
	};
});

module.exports.process = function (css, opts) {
	var processed = postcss([module.exports(opts)]).process(css, opts);

	return opts && opts.map && !opts.map.inline ? processed : processed.css;
};
