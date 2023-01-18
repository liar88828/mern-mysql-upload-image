import {Sequelize} from 'sequelize'

export const db = new Sequelize('upload_db',
	'root',
	'',
	{
		host: 'localhost',
		dialect: "mysql"
	})

