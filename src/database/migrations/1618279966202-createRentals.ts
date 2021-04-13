import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createRentals1618279966202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "rentals",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true
                }, 
                {
                    name: "car_id",
                    type: "uuid"
                },
                {
                    name: "user_id",
                    type: "uuid"
                },
                {
                    name: "start_date",
                    type: "date",
                },
                {
                    name: "end_date",
                    type: "date",
                    isNullable: true
                },
                {
                    name: "expected_return_date",
                    type: "date"
                },
                {
                    name: "total",
                    type: "numeric",
                    isNullable: true
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }, 
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    name: "FKRentalCar",
                    referencedTableName: "cars",
                    referencedColumnNames: ["id"],
                    columnNames: ["car_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                },
                {
                    name: "FKRentalUser",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "SET NULL",
                    onUpdate: "SET NULL"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rentals");
    }

}
