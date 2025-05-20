// Server
import { getData, getUser } from "@/app/actions";
import { cookies } from "next/headers";
// Components
import Hero from "@/components/rewards/Hero";
import SearchBar from "@/components/SearchBar";
import Category from "@/components/rewards/Category";
import CarouselSection from "@/components/rewards/CarouselSection";
// Types
import { User, DealCard } from "@/types";

const DEAL_TITLES = ["Popular Deal", "Latest Deal"];

async function Rewards() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user");
  const [user, ...deals]: [User, DealCard[], DealCard[]] = await Promise.all([
    getData(`/user/${userId?.value}`),
    getData("/deal/popular"),
    getData("/deal/latest"),
  ]);

  const suggestDeals = deals.map((deal, idx) => ({
    title: DEAL_TITLES[idx],
    data: deal,
  }));

  // const latest

  return (
    <main className="main-container bg-white">
      <Hero username={user.username} coin={user.pawCoin} />
      <section className="px-2 py-4">
        <SearchBar />
      </section>
      <Category />
      {suggestDeals.map((deal, idx) => (
        <CarouselSection key={idx} title={deal.title} items={deal.data} />
      ))}
    </main>
  );
}

export default Rewards;
