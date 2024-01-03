export interface Message {
  id: string;
  content: string;
  salt: string | undefined;
  iv: string | undefined;
  isPrivate: boolean;
  viewCount: number;
  createdAt: Date;
}
