const sinon = require('sinon');
const expect = require('chai').expect;
const virtualDOM = require('virtual-dom');

const AmaraDOM = require('../dist/amara-plugin-dom');

describe('AmaraDOMPlugin', function() {

    let dispatch;

    beforeEach(function setup() {
        dispatch = sinon.spy();
    });

    it('returns handler factory', function() {
        expect(AmaraDOM).to.be.a('function');
    });

    it('handler factory returns handler', function() {
        expect(AmaraDOM(virtualDOM)).to.be.a('function');
    });

    describe('handler', function() {

        beforeEach(function setup() {
            this.handler = AmaraDOM(virtualDOM)(dispatch);
        });

    });

});
