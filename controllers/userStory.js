const lineByLine = require('n-readlines');
const fs = require("fs");
const invoiceList = new lineByLine(__dirname + '/input_user_story.txt')

function getNumber(liner) {
    return new Promise(function (resolve, reject) {
        let digits = {
            " _ | ||_|": 0,
            "     |  |": 1,
            " _  _||_ ": 2,
            " _  _| _|": 3,
            "   |_|  |": 4,
            " _ |_  _|": 5,
            " _ |_ |_|": 6,
            " _   |  |": 7,
            " _ |_||_|": 8,
            " _ |_|  |": 9,
            " _ |_| _|": 9,
        }

        let line;
        let lineNumber = 0;
        let lines = []
        let number = [];
        let result = "";
        while (line = liner.next()) {
            lines[lineNumber] = line.toString('ascii');
            lineNumber++;
            // console.log(lineNumber++)
            if (lineNumber > 2) {
                for (let i = 0; i < lines.length; i++) {
                    for (let j = 0; j < lines[i].length / 3; j++) {
                        if (!number[j]) number[j] = '';
                        number[j] = number[j] + lines[i].substr(j * 3, 3);
                    }
                }
                let numberLine = '';
                // console.log(number.length)
                for (let i = 0; i < number.length-1; i++) {
                    numberLine = numberLine + digits[number[i]];
                }
                numberLine = numberLine + "\n"
                result = result + numberLine;
                line = liner.next();
                lineNumber = 0;
                lines = []
                number = [];
            }
        }
        //if end of file reached, return the parsed numbers 
        if (liner.eofReached === true) {
            resolve(result);
        }
    });
}

class UserStory {

    parseInvoiceNumbers(req, res, next) {
        getNumber(invoiceList)
            .then(result => {
                // console.log("Invoice Number", result);
                fs.writeFile('output_user_story_1.txt', result, function (err, data) {
                    if (err) {
                        return res.status(200).json({
                            result: "fail",
                            msg: "Something went wrong"
                        });
                    } else {
                        return res.status(200).json({
                            result: "success",
                            msg: "Result Saved in File output_user_story_1.txt successfully"
                        });
                    }
                });
            });
    }
}

module.exports = new UserStory();