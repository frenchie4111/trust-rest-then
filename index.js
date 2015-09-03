/**
 * MIT
 *
 * Authors:
 *     - Mike Lyons (m@mkone.co)
 */

(function() {
    'use strict';

    var trust_lib = require( 'trust-rest' ),
        q = require( 'q' );

    module.exports = function( url ) {
        var trust = trust_lib( url );

        return function() {
            var _this = this,
                _arguments = arguments;

            return q.Promise( function( resolve, reject ) {
                var return_value;

                var finished = function( err ) {
                    if( err ) return reject( err );
                    resolve( return_value );
                };

                var old_after_handler = _arguments[ 1 ].after_handler;

                _arguments[ 1 ].after_handler = function( err, res, done ) {
                    if( err ) return done( err );

                    return_value = res.body;

                    if( old_after_handler ) {
                        old_after_handler( err, res, done );
                    } else {
                        done();
                    }
                };

                trust.call( trust, _arguments[ 0 ], _arguments[ 1 ], finished );
            } );
        };
    }
})();