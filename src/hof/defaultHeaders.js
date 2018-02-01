export const DEFAULT_HEADERS = {
  "Content-Type": "application/json"
};

/**
 * This higher-order fetch creates a fetch which has some default headers
 * defined in DEFAULT_HEADERS
 */
export const defaultHeadersHOF = fetch => (input, init = {}) => {
  let initWithDefaultHeaders = Object.assign({}, init, {
    headers: mergeWithDefaultHeaders(init.headers, DEFAULT_HEADERS)
  });
  return fetch(input, initWithDefaultHeaders);
};

export function mergeWithDefaultHeaders(initHeaders = {}, defaultHeaders) {
  let headerObj;
  if (initHeaders instanceof Headers) {
    headerObj = initHeaders
      .entries()
      //convert array of entries into object:
      .reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {});
  } else {
    headerObj = initHeaders;
  }

  return {
    ...defaultHeaders,
    ...headerObj
  };
}
