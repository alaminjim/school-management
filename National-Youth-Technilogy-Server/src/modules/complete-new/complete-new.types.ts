export interface CreateCompleteNewInput {
  title: string;
  text: string;
  date: string;
  pdfUrl: string;
}

export interface UpdateCompleteNewInput {
  text?: string;
  date?: string;
  pdfUrl?: string;
}