import { TimeUtils } from "../../src/utils/time.utils";

describe("TimeUtils", () => {
  describe("createExpireTimeMessage", () => {
    test("should return undefined if createdAt is undefined", () => {
      const result = TimeUtils.createExpireTimeMessage(undefined, new Date());
      expect(result).toBeUndefined();
    });

    test("should return the correct expire message when hours and minutes are left", () => {
      const createdAt = new Date(Date.UTC(2024, 0, 15, 0, 0, 0));
      const now = new Date(Date.UTC(2024, 0, 15, 21, 30, 0));

      const result = TimeUtils.createExpireTimeMessage(createdAt, now);
      expect(result).toBe("2 hours and 30 minutes");
    });

    test("should return the correct expire message when only hours are left", () => {
      const createdAt = new Date(Date.UTC(2024, 0, 15, 0, 0, 0));
      const now = new Date(Date.UTC(2024, 0, 15, 23, 0, 0));

      const result = TimeUtils.createExpireTimeMessage(createdAt, now);
      expect(result).toBe("1 hour");
    });

    test("should return the correct expire message when only minutes are left", () => {
      const createdAt = new Date(Date.UTC(2024, 0, 15, 0, 0, 0));
      const now = new Date(Date.UTC(2024, 0, 15, 23, 31, 0));

      const result = TimeUtils.createExpireTimeMessage(createdAt, now);
      expect(result).toBe("29 minutes");
    });

    test("should return an empty string when no hours or minutes are left", () => {
      const createdAt = new Date(Date.UTC(2024, 0, 15, 0, 0, 0));
      const now = new Date(Date.UTC(2024, 0, 16, 23, 0, 0));

      const result = TimeUtils.createExpireTimeMessage(createdAt, now);
      expect(result).toBe("");
    });
  });
});
