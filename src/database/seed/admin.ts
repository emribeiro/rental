import { createConnection} from "typeorm";
import { v4 as uuidV4 } from "uuid";
import { hash} from "bcryptjs";


create().then(() => console.log("seed Created."));

async function create(){
    const connection = await createConnection()

    const id = uuidV4();
    const password = await hash("admin", 8);


    await connection.query(
        `INSERT INTO USERS(id,name, email, password, admin, created_at, driver_license)
         values ('${id}', 'admin', 'admin@admin.com', '${password}', true, 'now()', 'XXXXXXXX');
        `
    )

    await connection.close();
}