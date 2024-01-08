import { IDatabasePool } from "../db/IDatabasePool";
import { Message } from "../models/message";
import { IDGenerator } from "../utils/id.generator";

export class MessageService {
  private pool: IDatabasePool;

  constructor(pool: IDatabasePool) {
    this.pool = pool;
  }

  async getMessageById(id: string): Promise<Message | null> {
    const query =
      "SELECT * FROM messages WHERE id = $1 and created_at > NOW() - INTERVAL '24 hours'";
    const { rows } = await this.pool.query(query, [id]);
    return rows.length ? rows[0] : null;
  }

  async createMessage(messageData: Message): Promise<Message> {
    let id = await this.createUniqueIdForMessage();
    const query = `
      INSERT INTO messages (id, content, iv, salt, is_private)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      id,
      messageData.content,
      messageData.iv,
      messageData.salt,
      messageData.is_private,
    ];
    const { rows } = await this.pool.query(query, values);
    return rows[0];
  }

  async createUniqueIdForMessage(attempt = 0): Promise<String> {
    let id = IDGenerator.generate(8);
    const query = `INSERT INTO archived_ids (id) VALUES ($1)`;

    try {
      await this.pool.query(query, [id]);
      return id;
    } catch (err) {
      if (err instanceof Error) {
        let pgUniqueViolationErrorCode = "23505";
        const pgError = err as any; // Cast to 'any' or a more specific error type if you have one
        if (pgError.code === pgUniqueViolationErrorCode) {
          // Check if the error is a unique violation
          if (attempt < 10) {
            // If the maximum number of attempts has not been reached, try again
            return this.createUniqueIdForMessage(attempt + 1);
          } else {
            // If the maximum number of attempts has been reached, handle the error
            throw new Error("Failed to generate a unique ID after 10 attempts");
          }
        } else {
          // If the error is not a unique violation, rethrow it or handle it as needed
          throw err;
        }
      } else {
        // If 'err' is not an instance of Error, handle or rethrow as needed
        throw new Error("An unknown error occurred");
      }
    }
  }

  async increaseViewCount(id: string): Promise<void> {
    const query = `
      UPDATE messages
      SET view_count = view_count + 1
      WHERE id = $1;
    `;
    await this.pool.query(query, [id]);
  }

  async getStats(): Promise<{
    totalMessages: number;
    messagesExpiring: number;
  }> {
    const getTotalCount = async (tableName: string): Promise<number> => {
      const query = `SELECT COUNT(*) FROM ${tableName}`;
      const result = await this.pool.query(query);
      return parseInt(result.rows[0].count);
    };

    const totalMessages = await getTotalCount("archived_ids");
    const messagesExpiring = await getTotalCount("messages");

    return { totalMessages, messagesExpiring };
  }
}
