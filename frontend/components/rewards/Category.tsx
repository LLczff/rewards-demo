import { FaHotel } from "react-icons/fa";
import { FaBasketShopping } from "react-icons/fa6";
import { GiKnifeFork, GiHealthNormal } from "react-icons/gi";
import Link from "next/link";

const CATEGORIES = [
  {
    title: "Accommodation",
    icon: <FaHotel color="#6dcc60" />,
    href: "/deal",
  },
  {
    title: "Shopping",
    icon: <FaBasketShopping color="#6ed3df" />,
    href: "/deal",
  },
  {
    title: "Health",
    icon: <GiHealthNormal color="#e14d4d" />,
    href: "/deal",
  },
  { title: "Food", icon: <GiKnifeFork color="#ee9457" />, href: "/deal" },
];

const Category = () => {
  return (
    <section className="p-4">
      <ul className="grid grid-cols-2 place-items-center gap-6 xs:grid-cols-4 max-w-[50rem] mx-auto">
        {CATEGORIES.map((category, idx) => (
          <li key={idx} className="cursor-pointer">
            <Link
              href={category.href}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-4xl bg-primary-light w-fit aspect-square rounded-full p-3">
                {category.icon}
              </div>
              <span className="font-semibold text-slate-600">
                {category.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Category;
