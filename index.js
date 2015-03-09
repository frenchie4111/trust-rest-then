/**
 * Copyright of Mark One Lifestyle Inc.
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
                var finished = function( err ) {
                    if( err ) return reject( err );
                    resolve();
                };

                trust.call( trust, _arguments[ 0 ], _arguments[ 1 ], finished );
            } );
        };
    }
})();