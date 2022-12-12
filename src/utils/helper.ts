export const fetchJson = async (url: string, options: Record<string, any>) => {
  try {
    const response = await fetch(url, options);
    const data = response.json().catch(() => {
      return {}; // handle unexpected throw err when .json() fail
    });
    if (response.ok) {
      return data;
    }
    const error: any = new Error(response.statusText);
    error.response = response;
    error.data = data;
    throw error;
  } catch (error: any) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
};

export function urlencode(str: string) {
  str = (str + "").toString();

  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
  return encodeURIComponent(str)
    .replace(/!/g, "%21")
    .replace(/'/g, "%27")
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/\*/g, "%2A")
    .replace(/%20/g, "+");
}

export function buildQueryString(
  queries: any,
  whiteList: Array<string>,
  bridgeSign = "?"
) {
  const queryString: Array<any> = [];
  const checkWhitelist = whiteList.length > 0 ? true : false;
  Object.keys(queries).forEach((prop: string) => {
    if (queries?.[prop]) {
      if (checkWhitelist) {
        if (whiteList.includes(prop)) {
          queryString.push(urlencode(prop) + "=" + urlencode(queries[prop]));
        }
      } else {
        queryString.push(urlencode(prop) + "=" + urlencode(queries[prop]));
      }
    }
  });

  return queryString.length > 0 ? `${bridgeSign}${queryString.join("&")}` : "";
}

export const handleResponse = (response: any) => {
  if (response.success === false) {
    return Promise.resolve({
      data: response.status_message,
      isError: true,
    });
  } else {
    return Promise.resolve({
      data: response,
      isError: false,
    });
  }
};
