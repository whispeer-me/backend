export interface Message {  
  id: string;
  content: string;
  isPrivate: boolean;
  viewCount: number;
  createdAt: Date;
}
