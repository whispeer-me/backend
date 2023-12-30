import { AxiosResponse } from "axios";
import Api from "../api";
import { Todo } from "../models/todo";

class TodoService extends Api {
  private endpoint = "/todos";

  getTodos = async (): Promise<Todo[]> => {
    try {
      const response = await this.get<Todo[], AxiosResponse<Todo[]>>(
        this.endpoint
      );
      if (response.status !== 200) {
        throw new Error(`Unexpected status: ${response.status}`);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

export default TodoService;
