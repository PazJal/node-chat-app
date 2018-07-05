const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString' , () => {
  it('should reject non-string values.' ,() => {
    var testString = 123;
    var testResult = isRealString(testString);
    expect(testResult).toBe(false);
  });

  it('should rejectstring with only white spaces.' , () => {
    var testString = '    ';
    var testResult = isRealString(testString);
    expect(testResult).toBe(false);
  });
  it('should allow string with non space characters' , () => {
    var testString = ' A  B ';
    var testResult = isRealString(testString);
    expect(testResult).toBe(true);
  });
});
