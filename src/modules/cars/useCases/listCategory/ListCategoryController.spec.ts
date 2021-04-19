import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { app } from "../../../../app";
import { v4 as uuidV4} from 'uuid';
import { hash } from "bcryptjs";


let connection : Connection;

describe("Create category Controle", () => {

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

    it("Should be able to list all Categories", async () => {

        const responseToken = await request(app).post("/sessions").send({
            email: "admin@admin.com",
            password: "admin"
        });

        const { token } = responseToken.body;

        await request(app).post("/categories").send({
            name: "Category SuperTest",
            description: "Category SuperTest Description."
        }).set({
            Authorization: `Bearer ${token}`
        });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);

    });

});