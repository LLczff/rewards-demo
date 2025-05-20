import { NextPage } from "next";
import { CoinProps } from "@/types/props";
import { FaPaw } from "react-icons/fa";

const Coin: NextPage<CoinProps> = (props) => {
  return (
    <div
      className="rounded-full border-yellow-200 bg-amber-300 w-fit"
      style={{
        borderWidth: props.frameBorder || "4px",
        padding: props.framePadding || "4px",
      }}
    >
      <FaPaw className={`text-yellow-200`} size={props.size || 16} />
    </div>
  );
};

export default Coin;
