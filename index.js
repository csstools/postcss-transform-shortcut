var postcss = require('postcss');

module.exports = postcss.plugin('postcss-transform-shortcut', function (opts) {
	opts = opts || {};

	var defaults = {
		rotate:    [0, 0, 1],
		scale:     [1, 1, 1],
		translate: ['0px', '0px', '0px']
	};

	var splice = Array.prototype.splice;

	return function (css) {
		css.walkRules(function (rule) {
			var transform;
			var transformValues = [];
			var index = -1;
			var node;

			while (node = rule.nodes[++index]) {
				if (!transform && node.prop === 'transform') {
					transform = node;

					transformValues = postcss.list.space(node.value);
				} else if (/^(rotate|scale|translate)$/.test(node.prop)) {
					transform = transform || node.cloneBefore({
						prop: 'transform'
					});

					var oldValues = postcss.list.space(node.value);
					var newValues = defaults[node.prop].slice(0);

					splice.apply(newValues, [0, oldValues.length].concat(oldValues));

					transformValues.push(node.prop + '3d(' + newValues.join(',') + ')');

					node.remove();

					--index;
				}
			}

			transform.value = transformValues.join(' ');
		});
	};
});
