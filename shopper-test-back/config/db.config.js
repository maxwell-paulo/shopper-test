import mysql from 'mysql2/promise';

export async function connect( ) {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });

  try {
    await connection.connect();
    console.log('Conexão bem sucedida!');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }

  return connection;
}
