import { MessageService } from "../../../services/MessageService";
import { Message } from "../../../models/message";
import { IDatabasePool } from "../../../db/IDatabasePool";

describe("MessageService", () => {
  let messageService: MessageService;
  let mockPool: IDatabasePool;

  beforeEach(() => {
    mockPool = {
      query: jest.fn() as jest.Mock<
        Promise<{ rows: any[]; rowCount: number | null }>
      >,
    };
    messageService = new MessageService(mockPool);
  });
  test("getMessageById should return a message for a valid ID", async () => {
    const testId = "123abc";
    const mockMessage: Message = {
      id: testId,
      content: "Hello, World!",
      salt: "salt",
      iv: "iv",
      is_private: true,
      view_count: 0,
      created_at: new Date(),
    };
    (mockPool.query as jest.Mock).mockResolvedValue({
      rows: [mockMessage],
      rowCount: 1,
    });

    const message = await messageService.getMessageById(testId);
    expect(message).toEqual(mockMessage);
    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [testId]);
  });

  test("getMessageById should return null for an invalid ID", async () => {
    (mockPool.query as jest.Mock).mockResolvedValue({ rows: [], rowCount: 0 });

    const message = await messageService.getMessageById("invalid-id");
    expect(message).toBeNull();
    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), [
      "invalid-id",
    ]);
  });
});
