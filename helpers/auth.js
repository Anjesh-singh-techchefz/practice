const crypto = require('crypto');

exports.hashPassword = password => {
  let hash = crypto.createHmac('sha256', 'AnjeshSecret')
  let update = hash.update(password)
  let digest = update.digest('hex')
  return digest
};


exports.comparePassword = (storepassword, receivedPassword) => {
  const hash = hashPassword(receivedPassword)
    if(hash == storepassword) return
};
