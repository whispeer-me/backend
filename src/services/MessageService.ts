import { Pool } from "pg";
import { Message } from "../models/message";

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export class MessageService {
  async getMessageById(id: string): Promise<Message | null> {
    const query = "SELECT * FROM messages WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
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
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async increaseViewCount(id: string): Promise<void> {
    const query = `
      UPDATE messages
      SET view_count = view_count + 1
      WHERE id = $1;
    `;
    await pool.query(query, [id]);
  }

  async getStats(): Promise<{
    totalMessages: number;
    messagesExpiring: Message[];
  }> {
    // Query to get the total number of messages
    const totalQuery = "SELECT COUNT(*) FROM messages";
    const totalResult = await pool.query(totalQuery);
    const totalMessages = parseInt(totalResult.rows[0].count);

    // Query to get messages that are expiring in 24 hours
    const expiringQuery = `SELECT * FROM messages WHERE created_at > NOW() - INTERVAL '24 hours'`;
    const expiringResult = await pool.query(expiringQuery);
    const messagesExpiring = expiringResult.rows;

    return { totalMessages, messagesExpiring };
  }
}
