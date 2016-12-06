# Transform Shortcut <a href="https://github.com/postcss/postcss"><img src="https://postcss.github.io/postcss/logo.svg" alt="PostCSS Logo" width="90" height="90" align="right"></a>

[![NPM Version][npm-img]][npm-url]
[![Build Status][cli-img]][cli-url]
[![Licensing][lic-image]][lic-url]
[![Changelog][log-image]][log-url]
[![Gitter Chat][git-image]][git-url]

[Transform Shortcut] lets you use shorthand transform properties in CSS, following the [CSS Transform Module Level 2 Specification].

```css
/* before */

.transform {
	transform: skewX(25deg);
	rotate: 180deg;
	scale: 2 2;
	translate: 10px 10px;
}

/* after */

.transform {
	transform: skewX(25deg) rotate3d(180deg,0,1) scale3d(2,2,1) translate3d(10px,10px,0px);
}

```

The `translate`, `rotate`, and `scale` properties allow authors to specify simple transforms independently, in a way that maps to typical user interface usage, rather than having to remember the order in transform that keeps the actions of `transform()`, `rotate()` and `scale()` independent and acting in screen coordinates.

The `rotate` property accepts an angle to rotate an element, and optionally an axis to rotate it around, specified as the X, Y, and Z lengths of an origin-anchored vector. If the axis is unspecified, it defaults to `0 0 1`, causing a "2d rotation" in the plane of the screen.

The `scale` property accepts 1-3 values, each specifying a scale along one axis, in order X, Y, then Z. Unspecified scales default to `1`.

The `translate` property accepts 1-3 values, each specifying a translation against one axis, in the order X, Y, then Z. Unspecified translations default to `0px`.

## Caveat

Once these new properties are supported natively, you can also use them to style transforms across multiple rules without overwriting a previous rule’s transforms. Unfortunately, I cannot predict how your CSS rules will be inherited without also knowing your DOM. Therefore, this particularly useful feature cannot be simulated at this time.

```css
.button {
	rotate: 45deg;
}

.button--warn {
	scale: 2;
}
```

## Usage

Add [Transform Shortcut] to your build tool:

```bash
npm install jonathantneal/postcss-transform-shortcut --save-dev
```

#### Node

```js
require('postcss-transform-shortcut').process(YOUR_CSS, { /* options */ });
```

#### PostCSS

Add [PostCSS] to your build tool:

```bash
npm install postcss --save-dev
```

Load [Transform Shortcut] as a PostCSS plugin:

```js
postcss([
	require('postcss-transform-shortcut')({ /* options */ })
]).process(YOUR_CSS, /* options */);
```

#### Gulp

Add [Gulp PostCSS] to your build tool:

```bash
npm install gulp-postcss --save-dev
```

Enable [Transform Shortcut] within your Gulpfile:

```js
var postcss = require('gulp-postcss');

gulp.task('css', function () {
	return gulp.src('./src/*.css').pipe(
		postcss([
			require('postcss-transform-shortcut')({ /* options */ })
		])
	).pipe(
		gulp.dest('.')
	);
});
```

#### Grunt

Add [Grunt PostCSS] to your build tool:

```bash
npm install grunt-postcss --save-dev
```

Enable [Transform Shortcut] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
	postcss: {
		options: {
			use: [
				require('postcss-transform-shortcut')({ /* options */ })
			]
		},
		dist: {
			src: '*.css'
		}
	}
});
```

[npm-url]: https://www.npmjs.com/package/postcss-transform-shortcut
[npm-img]: https://img.shields.io/npm/v/postcss-transform-shortcut.svg
[cli-url]: https://travis-ci.org/jonathantneal/postcss-transform-shortcut
[cli-img]: https://img.shields.io/travis/jonathantneal/postcss-transform-shortcut.svg
[lic-url]: LICENSE.md
[lic-image]: https://img.shields.io/npm/l/postcss-transform-shortcut.svg
[log-url]: CHANGELOG.md
[log-image]: https://img.shields.io/badge/changelog-md-blue.svg
[git-url]: https://gitter.im/postcss/postcss
[git-image]: https://img.shields.io/badge/chat-gitter-blue.svg

[Transform Shortcut]: https://github.com/jonathantneal/postcss-transform-shortcut
[PostCSS]: https://github.com/postcss/postcss
[Gulp PostCSS]: https://github.com/postcss/gulp-postcss
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss

[CSS Transform Module Level 2 Specification]: https://drafts.csswg.org/css-transforms-2/
