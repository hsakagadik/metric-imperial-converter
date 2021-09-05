const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('convertHandler should correctly read a whole number input', function(){
        assert.isNumber(convertHandler.getNum('10.3l'), 'getNum should retrieve a whole number');
    });

    test('convertHandler should correctly read a decimal number input', function(){
        let num = convertHandler.getNum('5km');
        assert(num % 1 === 0, 'getNum should retrieve a decimal number');
    });

    test('convertHandler should correctly read a fractional input', function(){
        assert.isNumber(convertHandler.getNum('3/4gal'), 'getNum should retrieve a fractional number');
    });

    test('convertHandler should correctly read a fractional input with a decimal', function(){
        assert.isNumber(convertHandler.getNum('5.4/3lbs'), 'getNum should retrieve a fractional number');
    });

    test('convertHandler should correctly return an error on a double-fraction', function(){
        assert.strictEqual(convertHandler.getNum('3/2/3mi'), 'invalid number', 'getNum should throw an invalid number error');
    });

    test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function(){
        assert.strictEqual(convertHandler.getNum('lbs'), 1, 'getNum should set 1 as default numerical value');
    });

    test('convertHandler should correctly read each valid input unit', function(){
        const units = ["gal", "l", "mi", "km", "lbs", "kg"];
        units.forEach(unit => {
            const value = '1' + unit;
            assert.isString(convertHandler.getUnit(value), `getUnit should read the valid ${unit} unit`);
        });
    });

    test('convertHandler should correctly return an error for an invalid input unit', function(){
        assert.strictEqual(convertHandler.getUnit('3.4pp'), 'invalid unit', 'getUnit should throw an invalid unit error');
    });

    test('convertHandler should return the correct return unit for each valid input unit', function(){
        const ref = {
            "gal": "L",
            "l": "gal",
            "mi": "km",
            "km": "mi",
            "lbs": "kg",
            "kg": "lbs"
        };
        const units = ["gal", "l", "mi", "km", "lbs", "kg"];
        units.forEach(unit => {
            assert.strictEqual(convertHandler.getReturnUnit(unit), ref[unit], `getReturnUnit should retrieve the valid ${unit} unit convertion`);
        });
    });
    
    test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function(){
        const ref = {
            "gal": "gallon",
            "l": "liters",
            "mi": "miles",
            "km": "kilometers",
            "lbs": "pounds",
            "kg": "kilograms"
          };
        const units = ["gal", "l", "mi", "km", "lbs", "kg"];
        units.forEach(unit => {
            assert.strictEqual(convertHandler.spellOutUnit(unit), ref[unit], `spellOutUnit should retrieve the valid ${unit} spelled-out string`);
        });
    });

    test('convertHandler should correctly convert gal to L.', function(){
        assert.strictEqual(convertHandler.convert(1,'gal'), 3.78541, `converter should return the valid gal to L convertion`);
    });

    test('convertHandler should correctly convert L to gal.', function(){
        assert.strictEqual(convertHandler.convert(1,'L'), 0.26417, `converter should return the valid L to gal convertion`);
    });

    test('convertHandler should correctly convert mi to km.', function(){
        assert.strictEqual(convertHandler.convert(1,'mi'), 1.60934, `converter should return the valid mi to km convertion`);
    });

    test('convertHandler should correctly convert km to mi.', function(){
        assert.strictEqual(convertHandler.convert(1,'km'), 0.62137, `converter should return the valid km to mi convertion`);
    });

    test('convertHandler should correctly convert lbs to kg.', function(){
        assert.strictEqual(convertHandler.convert(1,'lbs'), 0.45359, `converter should return the valid lbs to kg convertion`);
    });

    test('convertHandler should correctly convert kg to lbs.', function(){
        assert.strictEqual(convertHandler.convert(1,'kg'), 2.20462, `converter should return the valid kg to lbs convertion`);
    });

});