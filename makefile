migrate-run:
    npx typeorm-ts-node-commonjs migration:run -d src/data-source.ts



migrate:
	typeorm migration:create migration/UserTable


npx typeorm migration:generate -d src/user/user.entity -d src/data-source.ts


typeorm migration:npx ts-node generate migration/UserTable -d src/data-source.ts