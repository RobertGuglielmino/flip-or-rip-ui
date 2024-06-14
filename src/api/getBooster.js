async function getBoosterPack(set) {

    const url = "https://s8ib0k5c81.execute-api.us-east-1.amazonaws.com/prod"

    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "set": set
    }),
    });

    const result = await response.json();
    return result;
}

export default getBoosterPack;