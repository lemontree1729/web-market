import handler from '../../../pages/api/login';
import http from 'http';
import { apiResolver } from 'next/dist/server/api-utils/node';
import supertest from 'supertest';
import { env } from 'process';

jest.setTimeout(10e3);

describe('/api/login', () => {
    let server: http.Server;
    beforeEach(async () => {
        const requestHandler = (request: http.IncomingMessage, response: http.ServerResponse) =>
            apiResolver(request, response, undefined, handler, undefined, true);
        server = http.createServer(requestHandler);
    });
    afterEach(() => server.close());

    let refresh_token: string
    test('login with right id and password', async () => {
        const result = await supertest(server)
            .post('/api/login')
            .send({ id: env.TEST_ID, password: env.TEST_PASSWORD, fingerprint: "test", persistent: false })
            .expect(200)
            .expect('Content-Type', /json/)
        expect(result.body.result).toEqual("admin")
        refresh_token = result.headers["set-cookie"][1].split(";")[0].split("refresh_token=")[1]
        // console.log(result.headers)
    })

    test('login with wrong id or password', async () => {
        const result = await supertest(server)
            .post('/api/login')
            .send({ id: "a", password: "a", fingerprint: "test", persistent: false })
            .expect(400)
            .expect('Content-Type', /json/)
        expect(result.body.error.message).toEqual("not a valid id or password")
    })

    test('logout with right refresh token', async () => {
        const result = await supertest(server)
            .delete('/api/login')
            .set('Cookie', [`refresh_token=${refresh_token}`])
            .expect(200)
            .expect('Content-Type', /json/)
        expect(result.body.result).toEqual("logout successful")
    })

    test('logout with wrong refresh token', async () => {
        const result = await supertest(server)
            .delete('/api/login')
            .set('Cookie', [`refresh_token=1234`])
            .expect(400)
            .expect('Content-Type', /json/)
        expect(result.body.error.message).toEqual("logout failed")
    })

    test('logout without refresh token', async () => {
        const result = await supertest(server)
            .delete('/api/login')
            .expect(200)
            .expect('Content-Type', /json/)
        expect(result.body.result).toEqual("not logged in yet")
    })
});