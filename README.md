# PostCSS Transform Shortcut [![Build Status][ci-img]][ci]

<img align="right" width="135" height="95" src="http://postcss.github.io/postcss/logo-leftp.png" title="Philosopher’s stone, logo of PostCSS">

[PostCSS Transform Shortcut] is a [PostCSS] plugin that allows you to use shorthand transform properties in CSS.

It is based on a [W3C mailing list thread](https://lists.w3.org/Archives/Public/www-style/2014Jul/0315.html).

```css
/* before */

.transform {
    rotate: 180deg;
    scale: 0.5;
    translate: 10px 10px;
}

/* after */

.transform {
    transform: rotate(180deg) scale(0.5) translate(10px,10px);
}

```

### Translate

`translate` `<length>` `{1,3}`: Specifies a translation in the X, Y, and Z axises, respectively. Missing values default to 0.

### Rotate

`rotate` `<angle> <number>{3}? <'transform-origin'>?`: Specifies a rotation along a given axis from a given origin. An omitted axis defaults to 0,0,1; an omitted origin defaults to 'transform-origin's initial value.

### Scale

`translate` `<number>{1,3} <'transform-origin'>?`: Specifies a scale in the X, Y, and Z axises, respectively, from a given origin. Missing values default to 1; an omitted origin default
to 'transform-origin's initial value.

## Usage

You just need to follow these two steps to use [PostCSS Transform Shortcut]:

1. Add [PostCSS] to your build tool.
2. Add [PostCSS Transform Shortcut] as a PostCSS process.

```sh
npm install postcss-transform-shortcut --save-dev
```

### Node

```js
require( 'postcss-transform-shortcut' )().process( your_css );
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
[PostCSS]: https://github.com/postcss/postcss
[PostCSS Transform Shortcut]: https://github.com/jonathantneal/postcss-transform-shortcut
