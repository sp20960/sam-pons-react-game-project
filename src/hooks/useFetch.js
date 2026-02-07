export async function useFetch(url, headers){
  try {
    const response = await fetch(url);
    const result = await response.json();

    if(result){
      return result
    }

    return response;
  } catch (error) {
    console.log(error)
  }
}