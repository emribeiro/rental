import * as UserRepository from "./UserRepository"
// @ponicode
describe("findById", () => {
    let inst: any

    beforeEach(() => {
        inst = new UserRepository.UserRepository()
    })

    test("0", async () => {
        await inst.findById("bc23a9d531064583ace8f67dad60f6bb")
    })

    test("1", async () => {
        await inst.findById("fake_project")
    })

    test("2", async () => {
        await inst.findById(-5.48)
    })

    test("3", async () => {
        await inst.findById("03ea49f8-1d96-4cd0-b279-0684e3eec3a9")
    })

    test("4", async () => {
        await inst.findById(0)
    })

    test("5", async () => {
        await inst.findById(Infinity)
    })
})

// @ponicode
describe("create", () => {
    let inst: any

    beforeEach(() => {
        inst = new UserRepository.UserRepository()
    })

    test("0", async () => {
        await inst.create({ name: "dummyName", password: "!Lov3MyPianoPony", email: "user1+user2@mycompany.com", driver_license: "2019-07-01", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", avatar: "https://cdn.fakercloud.com/avatars/zvchkelly_128.jpg" })
    })

    test("1", async () => {
        await inst.create({ name: "/dummy_name", password: "!Lov3MyPianoPony", email: "TestUpperCase@Example.com", driver_license: "2020-06-01", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", avatar: "https://cdn.fakercloud.com/avatars/ky_128.jpg" })
    })

    test("2", async () => {
        await inst.create({ name: "dummy_name", password: "!Lov3MyPianoPony", email: "email@Google.com", driver_license: "2019-10-01-preview", id: "03ea49f8-1d96-4cd0-b279-0684e3eec3a9", avatar: "https://cdn.fakercloud.com/avatars/ky_128.jpg" })
    })

    test("3", async () => {
        await inst.create({ name: "dummyName", password: "!ush3r", email: "TestUpperCase@Example.com", driver_license: "2019-06-01", id: "7289708e-b17a-477c-8a77-9ab575c4b4d8", avatar: "https://cdn.fakercloud.com/avatars/ky_128.jpg" })
    })

    test("4", async () => {
        await inst.create({ name: "dummyname", password: "!Lov3MyPianoPony", email: "something@example.com", driver_license: "2020-06-01", id: "a85a8e6b-348b-4011-a1ec-1e78e9620782", avatar: "https://cdn.fakercloud.com/avatars/joannefournier_128.jpg" })
    })

    test("5", async () => {
        await inst.create({ name: "", password: "", email: "", driver_license: "", id: "", avatar: "" })
    })
})
