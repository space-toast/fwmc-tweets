export interface Tweet {
  id: string;
  conversationId: string;
  name: string;
  username: string;
  userId: string;
  permanentUrl: string;
  text: string;
  timeParsed: Date;
  timestamp: number;
  inReplyToStatusId: string;
  createdAt: Date;
}