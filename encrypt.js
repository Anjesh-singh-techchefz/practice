
const crypto = require('crypto')
let md5 = require('js-md5');
md5 = text => crypto.createHash('md5').update(text).digest();
const securityKey = '7E242F657DC1FBD97E242F657DC1FBD9';

const name = "Anjesh Singh"
const fullName = name.split(' ');
const contactNumber = "9309165501" 
const password = `${fullName[0]}@${contactNumber.slice(-6)}`
console.log('password : ================================>>>>>>>>>>>>>>>>>>>>>>>',password)
 
//algorithm
const encrypt = (text, secretKey) => {
  const iv = Buffer.from(secretKey);
  secretKey = md5(secretKey);
  console.log('secretKey : ================================>>>>>>>>>>>>>>>>>>>>>>>',secretKey)
  console.log('secretKey.slice(0, 16) : ================================>>>>>>>>>>>>>>>>>>>>>>>',secretKey.slice(0, 16))
  secretKey = Buffer.concat([secretKey, secretKey.slice(0, 16)]);
  console.log('secretKey : ================================>>>>>>>>>>>>>>>>>>>>>>>',secretKey)
  const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, iv);
  const encrypted = cipher.update(text, 'utf8', 'base64');
  return encrypted + cipher.final('base64');
};


console.log(encrypt(password, securityKey));


  