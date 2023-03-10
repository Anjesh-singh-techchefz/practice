const sdk = require('api')('@onesignal/v9.0#1g2uuailbwvyjvk');

sdk
  .createNotification(
    {
      included_segments: ['Subscribed Users'],
      contents: {
        en: 'English or Any Language Message',
        es: 'Spanish Message'
      },
      name: 'INTERNAL_CAMPAIGN_NAME'
    },
    {
      authorization: 'Basic YOUR_REST_API_KEY'
    }
  )
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));

//--------------------------------------------------------------------------------------------

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      Authorization: 'Basic YOUR_REST_API_KEY',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      included_segments: ['Subscribed Users'],
      contents: {
        en: 'English or Any Language Message',
        es: 'Spanish Message'
      },
      name: 'INTERNAL_CAMPAIGN_NAME'
    })
  };

  fetch('https://onesignal.com/api/v1/notifications', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));