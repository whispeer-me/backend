import { Request, Response } from "express";
import { apiConfig } from "../api/config";
import { Todo } from "../models/todo";
import TodoService from "../services/todo.service";
import BaseController from "./base.controller";

export default class TodoController extends BaseController {
  private todoService: TodoService;

  constructor() {
    super();
    this.todoService = new TodoService(apiConfig);
  }

  getTodos = async (_: Request, res: Response) => {
    try {
      const todos: Todo[] = await this.todoService.getTodos();
      return this.success(res, todos);
    } catch (error) {
      return this.error(res, error as Error);
    }
  };
}
