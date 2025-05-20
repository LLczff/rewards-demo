import Coin from "../Coin";
import { NextPage } from "next";
import { CoinHeaderProps } from "@/types/props";

const Hero: NextPage<CoinHeaderProps> = ({ username, coin }) => {
  return (
    <section className="flex flex-col bg-primary items-center pb-5 rounded-b-2xl">
      <div className="mb-2">
        <Coin frameBorder="8px" framePadding="8px" size={32} />
      </div>
      <h2 className="text-xl text-secondary font-semibold">{username}</h2>
      <p className="font-medium">
        {coin} Coin{coin > 0 ? "s" : ""}
      </p>
    </section>
  );
};

export default Hero;
