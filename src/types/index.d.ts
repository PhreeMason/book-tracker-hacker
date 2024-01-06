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
  bookId: number; 0
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

export type GoogleBooksApiResponse = {
  kind: string;
  totalItems: number;
  items: Array<{
    kind: string;
    id: string;
    etag: string;
    selfLink: string;
    volumeInfo: {
      title: string;
      authors: string[];
      publisher: string;
      publishedDate: string;
      description: string;
      readingModes: {
        text: boolean;
        image: boolean;
      };
      maturityRating: string;
      allowAnonLogging: boolean;
      contentVersion: string;
      panelizationSummary: {
        containsEpubBubbles: boolean;
        containsImageBubbles: boolean;
      };
      imageLinks: {
        smallThumbnail: string;
        thumbnail: string;
      };
      previewLink: string;
      infoLink: string;
      canonicalVolumeLink: string;
    };
    saleInfo: {
      country: string;
      listPrice?: {
        amount: number;
        currencyCode: string;
      };
      retailPrice?: {
        amount: number;
        currencyCode: string;
      };
      buyLink?: string;
      offers?: Array<{
        finskyOfferType: number;
        listPrice: {
          amountInMicros: number;
          currencyCode: string;
        };
        retailPrice: {
          amountInMicros: number;
          currencyCode: string;
        };
        giftable: boolean;
      }>;
    };
    accessInfo: {
      country: string;
      epub: {
        isAvailable: boolean;
        acsTokenLink: string;
      };
      pdf: {
        isAvailable: boolean;
        acsTokenLink: string;
      };
      accessViewStatus: string;
    };
    searchInfo?: {
      textSnippet: string;
    };
  }>;
};

export type GoogleBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    readingModes: {
      text: boolean;
      image: boolean;
    };
    maturityRating: string;
    allowAnonLogging: boolean;
    contentVersion: string;
    panelizationSummary: {
      containsEpubBubbles: boolean;
      containsImageBubbles: boolean;
    };
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
  }
}