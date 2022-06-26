// import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const token = process.env.API_KEY;
check(token);

async function getValues(token) {
    const response = await fetch(`https://rooftop-career-switch.herokuapp.com/blocks?token=${token}`)
    const result = await response.json()
    const arrayDesordenado = result.data
    return arrayDesordenado;
}

async function check(token) {
    let array = await getValues(token);
    let arrayOrdenado = [];
    var requestsCount = 0;

    console.log("El array inicial es: ", array);
    console.log("Ordenando bloques...")
    
    for (let i = 0; i < array.length; i++) {        
        for(let j = 0; j < array.length; j++) {
            
            let response;

            if(arrayOrdenado.length == 0) {
                response = await fetch(`https://rooftop-career-switch.herokuapp.com/check?token=${token}`, {
                    method: "POST",
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(
                        {
                            "blocks": [
                                array[j],
                                array[j+1]
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
                                arrayOrdenado[arrayOrdenado.length-1],
                                array[j]
                            ]
                        }
                    )
                })
            }            
    
            let result = await response.json();

            if(result.message === true) {
                if(arrayOrdenado.length === 0) {
                    arrayOrdenado.push(array[j])
                    arrayOrdenado.push(array[j+1])
                }
                else{
                    arrayOrdenado.push(array[j])
                }
            }

            requestsCount = requestsCount + 1;
        }
        console.log(`Iteración: ${i+1}, Array ordenado: ${arrayOrdenado}`);
    }

    console.log("Cantidad de peticiones: ", requestsCount);
    console.log("El array ordenado es:", arrayOrdenado)

    const encodedString = arrayOrdenado.join("");

    let response = await fetch(`https://rooftop-career-switch.herokuapp.com/check?token=${token}`, {
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

    let result = await response.json();

    if(result.message === true) {
        console.log("Los bloques están ordenados correctamente.");
    }
    else {
        console.log("Los bloques no están ordenados correctamente.");
    }
    
    return arrayOrdenado;
}