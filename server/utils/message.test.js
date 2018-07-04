var expect = require('expect');
var {generateMessage , generateLocationMessage} = require('./message')

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


describe('generateLocationMessage' , () =>{
  it('should generate correct location object', () => {
    var from = 'Paz';
    var lat = 25;
    var lon = 24;
    var locationObject = generateLocationMessage(from , lat, lon);
    
    expect(locationObject.from).toBe(from);
    expect(locationObject.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);
    expect(locationObject.createdAt).toBeA('number');
  });
});