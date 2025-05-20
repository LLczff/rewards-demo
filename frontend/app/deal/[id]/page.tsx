import { getData } from "@/app/actions";
import Image from "next/image";
import { Deal } from "@/types";
import { MdLocationOn } from "react-icons/md";
import { IoCalendar } from "react-icons/io5";
import { formatDate } from "@/utils";
import Coin from "@/components/Coin";
import Description from "@/components/deal/Description";
import Redeem from "@/components/deal/Redeem";
import { DynamicRouteProps } from "@/types/props";

export async function generateStaticParams() {
  return [
    { id: "68295ac2fc13ae2bc72851be" },
    { id: "68295ac2fc13ae2bc72851bf" },
    { id: "68295ac2fc13ae2bc72851c0" },
  ];
  // if (process.env.DOCKER_BUILD === "true")
  const res = await fetch("http://host.docker.internal:8000/deal");
  const deals: Deal[] = await res.json();

  return deals.map((deal) => ({
    id: deal._id,
  }));
}

async function DealPage({ params }: DynamicRouteProps) {
  const { id } = await params;
  const deal: Deal = await getData(`/deal/${id}`);

  return (
    <main className="main-container bg-white">
      <section className="max-w-[50rem] mx-auto">
        <div className="w-full aspect-square relative mb-3 ">
          <Image
            priority
            src={deal.image}
            fill
            alt={deal.title}
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 px-2 mb-2">
          <h3 className="text-secondary font-bold text-3xl">{deal.title}</h3>
          <div className="flex gap-1 items-center">
            <Coin />
            <span className="text-amber-500 font-medium text-lg">
              {deal.cost} Coins
            </span>
          </div>
          <p className="flex gap-1">
            <MdLocationOn className="text-primary text-xl" />
            <span className="text-gray-600 text-sm">
              {deal.placeId.location}
            </span>
          </p>
          <p className="flex gap-2">
            <IoCalendar className="text-slate-400 text-lg" />
            <span className="text-gray-600 text-sm">
              Until {formatDate(deal.expiryDate)}
            </span>
          </p>
        </div>
        <Description
          description={deal.description}
          termsAndCondition={deal.termsAndCondition}
        />
      </section>
      <Redeem id={deal._id} />
    </main>
  );
}

export default DealPage;
