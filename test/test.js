var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
	postcss([ plugin(opts) ]).process(input).then(function (result) {
		expect(result.css).to.eql(output);

		expect(result.warnings()).to.be.empty;

		done();
	}).catch(function (error) {
		done(error);
	});
};

describe('postcss-transform-shortcut', function () {
	it('does rotate', function (done) {
		test('a {\n\trotate: 180deg;\n}', 'a {\n\ttransform: rotate(180deg,0,1);\n}', { }, done);
	});

	it('does scale', function (done) {
		test('a {\n\tscale: .5 .5;\n}', 'a {\n\ttransform: scale(.5,.5,1);\n}', { }, done);
	});

	it('does translate', function (done) {
		test('a {\n\ttranslate: 10px 10px;\n}', 'a {\n\ttransform: translate(10px,10px,0);\n}', { }, done);
	});

	it('does all three', function (done) {
		test('a {\n\trotate: 180deg;\n\tscale: .5 .5;\n\ttranslate: 10px 10px;\n}', 'a {\n\ttransform: rotate(180deg,0,1) scale(.5,.5,1) translate(10px,10px,0);\n}', { }, done);
	});

	it('does all three plus transform', function (done) {
		test('a {\n\ttransform: rotate(180deg);\n\trotate: 180deg;\n\tscale: .5 .5;\n\ttranslate: 10px 10px;\n}', 'a {\n\ttransform: rotate(180deg);\n\ttransform: rotate(180deg,0,1) scale(.5,.5,1) translate(10px,10px,0);\n}', { }, done);
	});
});
