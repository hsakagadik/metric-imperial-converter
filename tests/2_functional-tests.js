const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    test('Convert a valid input such as 10L: GET request to /api/convert', function(done){
        const response = {"initNum":10,"initUnit":"L","returnNum":2.6417217685798895,"returnUnit":"gal","string":"10 L converts to 2.6417217685798895 gal"};
        chai
        .request(server)
        .get("/api/convert?input=10L")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(response));
          done();
        });
    });

    test('Convert an invalid input such as 32g: GET request to /api/convert', function(done){
        const response = {"initNum":32,"initUnit":"invalid unit","string":"32 invalid unit converts to undefined undefined"};
        chai
        .request(server)
        .get("/api/convert?input=32g")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(response));
          done();
        });
    });

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert', function(done){
        const response = {"initNum":"invalid number","initUnit":"invalid unit","string":"invalid number invalid unit converts to undefined undefined"};
        chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(response));
          done();
        });
    });

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert', function(done){
        const response = {"initNum":"invalid number","initUnit":"invalid unit","string":"invalid number invalid unit converts to undefined undefined"};
        chai
        .request(server)
        .get("/api/convert?input=3/7.2/4kilomegagram")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(response));
          done();
        });
    });

    test('Convert with no number such as kg: GET request to /api/convert', function(done){
        const response = {"initNum":1,"initUnit":"invalid unit","string":"1 invalid unit converts to undefined undefined"};
        chai
        .request(server)
        .get("/api/convert?input=kg")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, JSON.stringify(response));
          done();
        });
    });
});
