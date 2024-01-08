export interface Message {
  id: string;
  content: string;
  salt: string | undefined;
  iv: string | undefined;
  is_private: boolean;
  view_count?: number;
  created_at?: Date;
}
