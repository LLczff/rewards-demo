export enum ErrorMessage {
  NotFound = "data not found",
  FetchFailed = "failed to fetch data",
  ServerError = "unknown error occur",
}

export type User = {
  _id: string;
  username: string;
  pawCoin: number;
};

export type DealCard = {
  _id: string;
  title: string;
  image: string;
  cost: number;
};

export enum HistoryTab {
  Received = "received",
  Spent = "spent",
}

export type CoinHistory = {
  _id: string;
  description: string;
  amount: number;
  createdAt: Date;
};

export type Deal = DealCard & {
  description: string;
  termsAndCondition: string;
  placeId: {
    location: string;
  };
  expiryDate: Date;
};

export enum DescriptionTab {
  Detail = "description",
  TNC = "termsAndCondition",
}
