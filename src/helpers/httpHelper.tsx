const requestWrapper = async (request: () => Promise<Response>) => {

  try {
    const response = await request();

    const data = await response.json();

    if (response.ok) {
      return data;
    }
    else {
      return {error: data.message};
    }
  } catch (e) {
      return {error: 'something went wrong'};
  }
}


export const get = async (url: string) => {
    return requestWrapper(() => fetch(url));
}

export const post = async (url: string, payload: object) => {
  return requestWrapper(() => fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })); 
}

export const put = async (url: string, payload: object) => {
  return requestWrapper(() => fetch(url, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })); 
}