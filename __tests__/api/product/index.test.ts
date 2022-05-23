import loginHandler from '../../../pages/api/login';
import productHandler from "../../../pages/api/product"
import http from 'http';
import supertest from 'supertest';
import { env } from 'process';
import { createRefreshToken, createTestServer, deleteRefreshToken } from '../../utils/apitest'
import fs from 'fs'


jest.setTimeout(10e3);
describe('/api/product', () => {
    let loginServer: http.Server;
    let productServer: http.Server;
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
        productServer = createTestServer(productHandler);
        console.debug(productServer)
    });

    afterEach(() => {
        productServer.close()
    });

    test('get product data with query _id=1', async () => {
        const result = await supertest(productServer)
            .get('/api/product')
            .query({ _id: 1 })
            .expect(200)
            .expect('Content-Type', /json/)
        expect(result.body.result.metadata.totalnum).toEqual(1)
    })

    // test("get product data with query ")

    test("post product with right data", async () => {
        const imageAsBase64 = fs.readFileSync('../../image/berries-ga5888843a_1920.jpg', 'base64')
        console.debug(imageAsBase64)
    })
})