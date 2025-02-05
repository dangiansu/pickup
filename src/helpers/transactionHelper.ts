import sequelize from '../config/database';

/**
 * Executes the given callback function within a transaction.
 * @param callback - The function that performs operations within the transaction.
 * @returns The result of the callback if the transaction succeeds.
 * @throws Rolls back the transaction and rethrows the error if the callback fails.
 */
export async function executeTransaction<T>(
  callback: (transaction: any) => Promise<T>
): Promise<T> {
  const transaction = await sequelize.transaction();
  try {
    const result = await callback(transaction); // Execute the callback with the transaction
    await transaction.commit(); // Commit the transaction
    return result; // Return the callback's result
  } catch (error) {
    await transaction.rollback(); // Rollback the transaction on error
    throw error; // Rethrow the error for handling by the caller
  }
}
