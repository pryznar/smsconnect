var moment = require('moment');
var md5 = require('MD5')
var request = require('superagent')

var SmsConnect = function(settings) {
  
  this.apiScript = 'http://api.smsbrana.cz/smsconnect/http.php?'
  this.login = settings['login']
  this.password = settings['password']

  this.salt = function(length) {

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  this.getAuthData = function() {
    if (this.login === null || this.password === null) {
      return null
    } else {
      var result = {}
      var salt = this.salt(10)
      var time = moment().format('YYYYMMDD') + 'T' + moment().format('Hmmss')

      result.login = this.login
      result.sul = salt
      result.time = time
      result.hash = md5(this.password + time + salt)
      return result
    }
  }

  var _getAnswer = function(data) {

    return data

  }

  this.inbox = function(cb) {

    var data  = this.getAuthData()
    data.action = 'inbox'

    var get = []
    for (var key in data) {
      get.push(key + '=' + data[key])
    }
    var url = this.apiScript + get.join('&')
    console.log(get)

    request
    .get('http://api.smsbrana.cz/smsconnect/http.php')
    .end(function(err, response) {
      cb(response)
    })
  }

}

exports.SmsConnect = SmsConnect;