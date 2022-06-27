import { getToken, getValues, orderValues, check } from '../src/logic';

describe('Career Switch Challenge.', () => {

    test('Debe obtener un token para el email dado.', async () => {
        const token = await getToken("usuario@gmail.com");
        expect(token).toBeDefined();
    });

    test('Debe obtener un array de bloques para el token dado.', async () => {
        const result = await getValues("b93ac073-eae4-405d-b4ef-bb82e0036a1d");
        expect(result).toBeDefined();
        expect(result).not.toHaveLength(0);
    });

    test('Debe devolver un array de bloques ordenados.', async () => {
        const result = await orderValues(["f319", "3720", "4e3e", "46ec", "c7df", "c1c7", "80fd", "c4ea"], "b93ac073-eae4-405d-b4ef-bb82e0036a1d");
        const expected = ["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"];
        expect(result).toEqual(expected);
    }, 90000);

    test('Debe confirmar que los bloques fueron ordenados correctamente.', async () => {
        const result = await check(["f319", "46ec", "c1c7", "3720", "c7df", "c4ea", "4e3e", "80fd"], "b93ac073-eae4-405d-b4ef-bb82e0036a1d");
        expect(result).toBe(true);
    });

});