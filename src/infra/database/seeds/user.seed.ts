import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';

export default class CreateUsers implements Seeder {
	run = async (_: Factory, connection: Connection): Promise<void> => {
		const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
		const hashPassword = bcrypt.hashSync('admin', salt);

		await connection
			.createQueryBuilder()
			.insert()
			.into(User)
			.values([
				{
					name: 'Admin',
					email: 'admin@admin.com',
					password: hashPassword,
					isActive: true,
					isAdmin: true,
				},
			])
			.execute();
	};
}
