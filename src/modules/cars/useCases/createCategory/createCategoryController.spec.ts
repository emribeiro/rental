import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";
import { v4 as uuidV4} from 'uuid';
import { hash } from "bcryptjs";


let connection : Connection;

describe("Create category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidV4();
        const password = await hash("admin", 8);


        await connection.query(
            `INSERT INTO USERS(id,name, email, password, admin, created_at, driver_license)
            values ('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXXXX');
            `
        )
            });

    afterAll( async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to create a new category", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category SuperTest Description."
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);

    });

    it("should not be able to create a category with name exists", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        const response = await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category SuperTest Description."
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response2 = await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category SuperTest Description."
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response2.status).toBe(400);

    });
});