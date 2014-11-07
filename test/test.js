var Sms = require('../')
  , assert = require('assert')
  , moment = require('moment')

var sms = new Sms.SmsConnect({
  'login': 'foo',
  'password': 'bar'
});

var authData = sms.getAuthData()
console.log(authData);

describe("getAuthData", function() {

  it('should return login name', function(){
    assert.equal(authData.login, 'foo')
  })

  it('salt length', function(){
    assert.equal(authData.sul.length, 10)
  })

  it('hash length', function(){
    assert.equal(authData.hash.length, 32)
  })

  it('time property starting with current date', function(){
    assert.equal(authData.time.substring(0, 8), moment().format('YYYYMMDD'))
  })

})