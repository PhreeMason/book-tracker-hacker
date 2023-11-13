// Users Table
export interface User {
  id: number;
  username: string;
}

// Books Table
export interface Book {
  id: number;
  title: string;
  author: string;
  totalPages: number;
}

// UserBooks Table
export interface UserBook {
  id: number;
  userId: number;
  bookId: number;
  startDate: Date;
  endDate: Date;
}

// ReadingSchedule Table
export interface ReadingSchedule {
  id: number;
  userBookId: number;
  date: Date;
  pagesToRead: number;
}

// Progress Table
export interface Progress {
  id: number;
  userBookId: number;
  date: Date;
  pagesRead: number;
}

// Notifications Table
export interface Notification {
  id: number;
  userId: number;
  type: string;
  message: string;
  scheduledTime: Date;
}