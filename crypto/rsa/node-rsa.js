var NodeRSA = require('node-rsa');
var key = new NodeRSA({b: 1024});
console.log(key)
var text = 'Hello RSA!';
var encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
var decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);
console.log(key.exportKey('pkcs8-public-der').toString('hex'))
console.log('------------------------------------------------')
console.log(key.exportKey('pkcs1-der').toString('hex'))