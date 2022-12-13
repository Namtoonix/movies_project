import { useEffect } from "react";

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
    throw error;
  } catch (error: any) {
    if (error.response) {
      return { success: false, message: error.response.statusText };
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
      data: response,
      isError: true,
    });
  } else {
    return Promise.resolve({
      data: response,
      isError: false,
    });
  }
};

export function formatNumber(value: any, includeDecimal = true, decimal = 2) {
  if (includeDecimal) {
    value = parseFloat(value).toFixed(decimal);
  }
  value += "";
  const list = value.split(".");
  const prefix = list[0].charAt(0) === "-" ? "-" : "";
  let num = prefix ? list[0].slice(1) : list[0];
  let result = "";
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  if (includeDecimal && parseInt(list[1]) > 0) {
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`;
  }

  return `${prefix}${result}`;
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideAlerter(ref: any, handle: Function) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        handle();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}
