import { IDatabasePool } from "../db/IDatabasePool";
import { Message } from "../models/message";

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
    const query = `
      INSERT INTO messages (id, content, iv, salt, is_private)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      messageData.id,
      messageData.content,
      messageData.iv,
      messageData.salt,
      messageData.is_private,
    ];
    const { rows } = await this.pool.query(query, values);
    return rows[0];
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
    messagesExpiring: Message[];
  }> {
    // Query to get the total number of messages
    const totalQuery = "SELECT COUNT(*) FROM messages";
    const totalResult = await this.pool.query(totalQuery);
    const totalMessages = parseInt(totalResult.rows[0].count);

    // Query to get messages that are expiring in 24 hours
    const expiringQuery = `SELECT * FROM messages WHERE created_at > NOW() - INTERVAL '24 hours'`;
    const expiringResult = await this.pool.query(expiringQuery);
    const messagesExpiring = expiringResult.rows;

    return { totalMessages, messagesExpiring };
  }
}
