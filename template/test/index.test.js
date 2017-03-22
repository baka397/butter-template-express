'use strict';
const nock = require('nock');
nock.enableNetConnect(); // 允许真实的网络连接
const app = require('../app');
const request = require('supertest');
let client = request(app);
describe('Common', function(){
    it('GET 404 Page', function (done) {
        client.get('/404/')
        .expect(404)
        .end(function(err){
            done(err);
        });
    });
});