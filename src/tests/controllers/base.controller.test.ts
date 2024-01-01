import { Response } from "express";
import BaseController from "../../controllers/base.controller";

describe("BaseController", () => {
  let baseController: BaseController;
  let res: Response;

  beforeEach(() => {
    baseController = new BaseController();
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("success should send 200 status and data", () => {
    const data = { message: "Success" };

    baseController.success(res, data);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({ data });
  });

  test("notfound should send 404 status and default message if no message is provided", () => {
    baseController.notfound(res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      data: { message: "Not Found" },
    });
  });

  test("notfound should send 404 status and provided message", () => {
    const message = "Custom Not Found";

    baseController.notfound(res, message);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      data: { message },
    });
  });

  test("error should send 500 status, log the error, and send default message if no message is provided", () => {
    const error = new Error("Test Error");

    baseController.error(res, error);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      data: { message: "Error occured and logged." },
    });
  });

  test("error should send 500 status, log the error, and send provided message", () => {
    const error = new Error("Test Error");
    const message = "Custom Error Message";

    baseController.error(res, error, message);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      data: { message },
    });
  });
});
