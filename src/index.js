import { getToken, getValues, orderValues, check } from '../src/logic.js';
import * as dotenv from 'dotenv';

dotenv.config();

(async function main(){
    const email = process.env.EMAIL;
    const token = await getToken(email);
    const blocks = await getValues(token);
    const orderedBlocks = await orderValues(blocks, token);
    await check(orderedBlocks, token);
})();