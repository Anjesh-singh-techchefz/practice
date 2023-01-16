import httpContext from 'express-http-context';

/* It's a class that creates a response object */
export default class ResponseObject {
  /**
   * It creates a new Error object with the given code, message, success and data
   * @param [code=500] - The HTTP status code.
   * @param [message=An error occurred, try again after some time] - The message to be displayed to the
   * user.
   * @param [success=false] - boolean, if the request was successful or not
   * @param [data] - The data that you want to return to the user.
   */
  constructor(
    code = 500,
    message = 'An error occurred, try again after some time',
    success = false,
    data = {}
  ) {
    this.code = code;
    this.message = message;
    this.data = data;
    this.success = success;
  }

  /**
   * It creates a JSON object with the following properties:
   * request_id: The request ID of the current request.
   * timestamp: The current time in the format of "MM/DD/YYYY HH:MM:SS".
   * code: The error code.
   * message: The error message.
   * data: The data that was returned by the API.
   * success: A boolean value indicating whether the request was successful or not
   * @param params - The parameters that you want to pass to the response.
   * @returns The return object is a JSON object that contains the following:
   */
  create(params) {
    let request_id = httpContext.get('requestId');

    return {
      request_id,
      timestamp: new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata'
      }),
      code: this.code,
      message: this.message,
      data: this.data,
      success: this.success,
      ...params
    };
  }
}
