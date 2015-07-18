# PostCSS Transform Shortcut [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS Transform Shortcut] is a [PostCSS] plugin that allows you to use shorthand transform properties in CSS, following the [CSS Transform Module Level 2 Specification](http://drafts.csswg.org/css-transforms-2/).

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

You just need to follow these two steps to use [PostCSS Transform Shortcut]:

1. Add [PostCSS] to your build tool.
2. Add [PostCSS Transform Shortcut] as a PostCSS process.

```sh
npm install postcss-transform-shortcut --save-dev
```

### Node

```js
require('postcss-transform-shortcut')().process(your_css);
```

### Grunt

Add [Grunt PostCSS] to your build tool:

```sh
npm install postcss-transform-shortcut --save-dev
```

Enable [PostCSS Transform Shortcut] within your Gruntfile:

```js
grunt.loadNpmTasks('grunt-postcss');

grunt.initConfig({
    postcss: {
        options: {
            processors: [
                require('postcss-transform-shortcut')({ /* options */ })
            ]
        },
        dist: {
            src: 'css/*.css'
        }
    }
});
```

[ci]: https://travis-ci.org/jonathantneal/postcss-transform-shortcut
[ci-img]: https://travis-ci.org/jonathantneal/postcss-transform-shortcut.svg
[Grunt PostCSS]: https://github.com/nDmitry/grunt-postcss
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Transform Shortcut]: https://github.com/jonathantneal/postcss-transform-shortcut
