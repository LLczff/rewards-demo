import { DealCard } from ".";

export type ClassNameProps = {
  className?: string;
};

export type CoinProps = {
  frameBorder?: string;
  framePadding?: string;
  size?: number;
};

export type CoinHeaderProps = {
  username: string;
  coin: number;
};

export type CarouselProps = {
  items: DealCard[];
};

export type CarouselSectionProps = CarouselProps & {
  title: string;
};

export type DescriptionProps = {
  description: string;
  termsAndCondition: string;
};

export type RedeemProps = {
  id: string;
};

export type DynamicRouteProps = {
  params: Promise<{ id: string }>;
};
