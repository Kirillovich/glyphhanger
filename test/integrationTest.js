const assert = require( "assert" );
const GlyphHanger = require( "../src/GlyphHanger.js" );

describe( "Integration test", function() {

	it( "should have 3 distinct glyphs", function( done ) {
		this.timeout( 10000 );

		var gh = new GlyphHanger();
		gh.fetchUrls(["test/test.html"]).then(function(result) {
			assert.equal( gh.getUniversalSet().toString(), "abc" );

			done();
		});
	});

	it( "should have work with text-transform: uppercase", function( done ) {
		this.timeout( 10000 );

		var gh = new GlyphHanger();
		gh.fetchUrls(["test/uppercase.html"]).then(function(result) {
			// abc ^word => abcWORD => DORWabc
			assert.equal( gh.getUniversalSet().toString(), "DORWabc" );

			done();
		});
	});

	it( "should have work with text-transform: capitalize", function( done ) {
		this.timeout( 10000 );

		var gh = new GlyphHanger();
		gh.fetchUrls(["test/capitalize.html"]).then(function(result) {
			// abc ^word => abcWORDword => DORWabcdorw
			assert.equal( gh.getUniversalSet().toString(), "DORWabcdorw" );

			done();
		});
	});

	it( "should have work with onload and DOMContentLoaded content", function( done ) {
		this.timeout( 10000 );

		var gh = new GlyphHanger();
		gh.fetchUrls(["test/test-onload-content.html"]).then(function(result) {
			// abc ^word => abcWORDword => DORWabcdorw
			assert.equal( gh.getUniversalSet().toString(), "abcdefghi" );

			done();
		});
	});
});
