const chai = require('chai');
const server = require("../app.js");
const chaiHttp = require('chai-http');
const fs = require("fs")
chai.use(chaiHttp);
chai.should();

// Test cases for parseInvoiceNumbers
describe('parse invoice numbers', function () {
	it('successfully write the result in file', function (done) {
		chai.request(server).get('/parseInvoiceNumbers').end(function (err, res) {
			let object = res.body;
			object.result.should.equal('success');
			object.msg.should.equal('Result Saved in File output_user_story_1.txt successfully');
			done();
		});
	});

	setTimeout(function () {
		it('write the correct output to file', function (done) {
			chai.request(server).get('/parseInvoiceNumbers').end(function (err, res) {
				var currentDir = '..';
				currentDir = currentDir.substring(0, currentDir.lastIndexOf("/"));
				fs.readFile(currentDir + 'output_user_story_1.txt', 'utf8', function (err, data) {
					if (err) {
						return console.log(err);
					}
					var result = data.split("\n");
					result[1].should.equal('650408454');
					done();
				});
			});
		});
	});
});