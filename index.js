var moment = require('moment')
  , md5 = require('MD5')
  , request = require('request')
  , parser = require('xml2json')
  , randomstring = require("randomstring")

var SmsConnect = function(settings) {
  
  this.apiScript = 'http://api.smsbrana.cz/smsconnect/http.php?'
  this.login = settings['login']
  this.password = settings['password']

  this.salt = function(length) {

    return randomstring.generate(length)

  }

  this.getAuthData = function() {

    if (this.login === null || this.password === null) {
      return null
    } else {
      var result = {}
      var salt = this.salt(10)
      var time = moment().format('YYYYMMDD') + 'T' + moment().format('HHmmss')

      result.login = this.login
      result.sul = salt
      result.time = time
      result.hash = md5(this.password + time + salt)
      return result
    }

  }

  this.inbox = function(cb) {

    var data  = this.getAuthData()
    data.action = 'inbox'

    var get = []
    for (var key in data) {
      get.push(key + '=' + data[key])
    }
    var url = this.apiScript + get.join('&')
    request(url, function (error, response, body) {
      if (error) cb(false)
      cb(parser.toJson(response.body))
    })
  }

  this.send = function(number, text, cb) {

    var data  = this.getAuthData()
    data.action = 'send_sms'
    data.number = number
    data.message = text

    var get = []
    for (var key in data) {
      get.push(key + '=' + data[key])
    }
    var url = this.apiScript + get.join('&')
    request(url, function (error, response, body) {
      if (error) cb(false)
      cb(parser.toJson(response.body))
    })

  }

}

exports.SmsConnect = SmsConnect;
