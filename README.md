SmsConnect
==========

Send and receive SMS with node.js (for Czech Republic)

[Registration](http://www.smsbrana.cz/registrace.html)

## Installation

	npm install smsconnect

## Usage

### Initializtaion

```javascript
var Sms = require('smsconnect')
sms = new Sms.SmsConnect({
  'login': '<your_login>',
  'password': '<your_password>'
})
```

### Inbox

```javascript
sms.inbox(function(data) {
  console.log(data);
});
```

### Send SMS

```javascript
sms.send('<phone_number>', '<text_sms>', function(result) {
	console.log(result);
})
```

## License

  MIT
