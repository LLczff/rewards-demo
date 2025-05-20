import { getData, getHistory } from "@/app/actions";
import { truncateString, formatDate } from "@/utils";
import { Deal } from "@/types";
import Coin from "@/components/Coin";
import Image from "next/image";

async function Search() {
  // const deals: Deal[] = await getData("/deal?limit=20");
  const deals: Deal[] = [];

  return (
    <main className="main-container bg-white">
      <section className="flex flex-col gap-2 px-2 py-4 min-h-screen">
        <h3 className="text-secondary text-3xl font-semibold text-center">
          This feature is incomplete
        </h3>
        {deals.map((deal, idx) => (
          <div
            key={idx}
            className="flex shadow-md rounded-lg border-2 border-primary-light items-center"
          >
            <div className="relative h-24 aspect-square rounded-l-lg">
              <Image
                priority
                fill
                src={deal.image}
                alt={deal.title}
                className="object-cover rounded-l-lg"
              />
            </div>
            <div className="px-3 py-2">
              <h3 className="text-lg font-semibold text-gray-700 text-nowrap overflow-x-hidden">
                {truncateString(deal.title, 20)}
              </h3>
              <div className="flex gap-1 text-amber-500 font-medium text-sm items-center">
                <Coin />
                {deal.cost} coins
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Search;
