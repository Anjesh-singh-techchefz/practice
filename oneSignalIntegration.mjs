import axios from 'axios';

export const pushNotification = async (page, segment, title, slug) => {
  let apiConfig = {
    method: 'post',
    url: process.env,
    headers: {
      Authorization: process.env,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      included_segments: [`${segment}`],
      app_id: process.env,
      contents: { en: 'content of new blog' },
      headings: { en: `${title}` },
      url: `${process.env.WEBSITE_URL}/${page}/${slug}`
    })
  };

  axios(apiConfig)
    .then(response => {
      console.log(response);
      if (response.status !== 200) console.log(`Unable to push notification`);

      console.log('Notification sent successfully');
    })
    .catch(err => console.log(`${err}`));
};
