import fetch from 'node-fetch';

export async function getToken(email) {
    const response = await fetch(`https://rooftop-career-switch.herokuapp.com/token?email=${email}`);
    const result = await response.json();
    const token = result.token;
    return token;
}

export async function getValues(token) {
    const response = await fetch(`https://rooftop-career-switch.herokuapp.com/blocks?token=${token}`);
    const result = await response.json();
    const blocks = result.data;
    return blocks;
}

export async function orderValues(blocks, token) {
    let orderedBlocks = [];
    var requestsCount = 0;

    console.log("El array inicial es: ", blocks);
    console.log("Ordenando bloques...");

    for (let i = 0; i < blocks.length; i++) {        
        for(let j = 0; j < blocks.length; j++) {
            
            let response;

            if(orderedBlocks.length == 0) {
                response = await fetch(`https://rooftop-career-switch.herokuapp.com/check?token=${token}`, {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "blocks": [
                                blocks[j],
                                blocks[j+1]
                            ]
                        }
                    )
                })
            }
            else {
                response = await fetch(`https://rooftop-career-switch.herokuapp.com/check?token=${token}`, {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "blocks": [
                                orderedBlocks[orderedBlocks.length-1],
                                blocks[j]
                            ]
                        }
                    )
                })
            }            
    
            let result = await response.json();

            if(result.message === true) {
                if(orderedBlocks.length == 0) {
                    orderedBlocks.push(blocks[j]);
                    orderedBlocks.push(blocks[j+1]);
                }
                else{
                    orderedBlocks.push(blocks[j]);
                }
            }

            requestsCount = requestsCount + 1;
        }
        console.log(`Iteración: ${i+1}, Array ordenado: ${orderedBlocks}`);
    }

    console.log("Cantidad de peticiones: ", requestsCount);
    console.log("El array ordenado es:", orderedBlocks);

    return orderedBlocks;
}

export async function check(orderedBlocks, token) {

    const encodedString = orderedBlocks.join("");

    const response = await fetch(`https://rooftop-career-switch.herokuapp.com/check?token=${token}`, {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                "encoded": encodedString
            }
        )
    })

    const result = await response.json();

    if(result.message != true) {
        console.log("Los bloques no están ordenados correctamente.");
        return false;
    }

    console.log("Los bloques están ordenados correctamente.");
    return true;
}