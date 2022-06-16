import loginHandler from '../../../pages/api/login';
import userHandler from "../../../pages/api/user";
import http from 'http';
import supertest from 'supertest';
import { env } from 'process';
import { createRefreshToken, createTestServer, deleteRefreshToken } from '../../utils/apitest'


jest.setTimeout(10e3);
describe('/api/user', () => {
    let loginServer: http.Server;
    let userServer: http.Server;
    let user_refresh_token: string;
    let admin_refresh_token: string;
    beforeAll(async () => {
        loginServer = createTestServer(loginHandler);
        user_refresh_token = await createRefreshToken(loginServer, env.USER_ID, env.USER_PASSWORD, false)
        admin_refresh_token = await createRefreshToken(loginServer, env.ADMIN_ID, env.ADMIN_PASSWORD, false)
    });

    afterAll(async () => {
        await deleteRefreshToken(loginServer, user_refresh_token)
        await deleteRefreshToken(loginServer, admin_refresh_token)
        loginServer.close()
    })

    beforeEach(() => {
        userServer = createTestServer(userHandler);
    });

    afterEach(() => {
        userServer.close()
    });
    describe("get user data without admin role", () => {
        test("searching already exist id", async () => {
            const res = await supertest(userServer)
                .get('/api/user')
                .query({ id: env.USER_ID })
                .expect(200)
                .expect('Content-Type', /json/)
            expect(res.body.result).toEqual([{}])
        })

        test("searching not exist id", async () => {
            const res = await supertest(userServer)
                .get('/api/user')
                .query({ id: "a" })
                .expect(200)
                .expect('Content-Type', /json/)
            expect(res.body.result).toEqual([])
        })

        test("searching with required query", async () => {
            const res = await supertest(userServer)
                .get('/api/user')
                .query({ _id: 1, required: ["gender"] })
                .expect(400)
                .expect('Content-Type', /json/)
            // expect(res.body.error).toEqual("123")
        })
    });

    describe("get user data with admin role", () => {
        test("searching with required query", async () => {
            const res = await supertest(userServer)
                .get('/api/user')
                .set('Cookie', [`refresh_token=${admin_refresh_token}`])
                .query({ _id: 1, required: ["gender"] })
                .expect(200)
                .expect('Content-Type', /json/)
            expect(res.body.result).toEqual([{ gender: "male" }])
        })
    })

    describe("get user data with user role", () => {
        test("searching with required query2", async () => {
            const res = await supertest(userServer)
                .get('/api/user')
                .set('Cookie', [`refresh_token=${user_refresh_token}`])
                .query({ _id: 1, required: ["gender"] })
                .expect(400)
                .expect('Content-Type', /json/)
        })
    })
})
