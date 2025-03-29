import { DataSource } from 'typeorm'; // Import your entities
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
    type: 'postgres',  // Adjust this according to your DB
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'widget',
    synchronize: true,
    logging: true,
    entities: [User],  // Ensure your entities are here
    migrations: ['migration/**/*.ts'],  // Path to migrations
    subscribers: [],
});