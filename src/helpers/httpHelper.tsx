const requestWrapper = async (request: () => Promise<Response>) => {
  console.log('inside wrapper');

  try {
    console.log('try');

    const response = await request();
    console.log('got response');


    const data = await response.json();
    console.log('got data: ', response);

    if (response.ok) {
      console.log('good response');
      return data;
    }
    else {
      console.log('server error');

      return {error: data.message};
    }
  } catch (e) {
    console.log('error!');

      return {error: 'something went wrong'};
  }
}


export const get = async (url: string) => {
  console.log('inside get: ', url);

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