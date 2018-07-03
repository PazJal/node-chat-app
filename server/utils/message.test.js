var expect = require('expect');
var {generateMessage} = require('./message')

describe('generateMessage' , () => {

  it('should generate the correct message object' , () => {
    var from = 'Paz';
    var text = 'Test text';
    var mesasgeObject = generateMessage(from , text);
    
    expect(mesasgeObject.from).toBe(from);
    expect(mesasgeObject.text).toBe(text);
    expect(mesasgeObject.createdAt).toBeA('number');

  });
});