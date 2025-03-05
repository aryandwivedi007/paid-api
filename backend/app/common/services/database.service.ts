import { DataSource } from 'typeorm';
import { User } from '../../user/user.schema';
import { ApiModule } from '../../api-module/api-module.schema';
import { ApiUsage } from '../../api-usage/api-usage.schema';
import { Payment } from '../../payment/payment.schema';


export const AppDataSource = new DataSource({
  type: 'mysql',  
  driver: require('mysql2'), 
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'mysqlroot',
  database: 'api',
  entities: [User,ApiModule,ApiUsage,Payment],
  synchronize: true,
  logging: false,
  extra: {
    authPlugin: 'caching_sha2_password',  // Ensure correct authentication plugin is used
  },
});

AppDataSource.initialize()
  .then(() => console.log('Database Connected!'))
  .catch((err) => console.error('Database Connection Error:', err));