import {getConnection} from 'typeorm';

// TODO: We should not use this method. It has a bug. Check with Petro for alternative.
export async function ensureConnection() {
  const connection = getConnection();
  if (!connection.isConnected) {
    await connection.connect();
  }
}
