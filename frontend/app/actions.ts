"use server";

import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { BASE_API_URL } from "@/constants";
import { User, ErrorMessage, HistoryTab, CoinHistory } from "@/types";

export async function getData(path: string): Promise<any> {
  try {
    const res = await fetch(BASE_API_URL + path);
    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error(ErrorMessage.FetchFailed);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessage.FetchFailed);
  }
}

async function extractUserId() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user");
  return userId ? userId.value : null;
}

export async function getUser() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get("user");
    if (!userId) throw new Error(ErrorMessage.NotFound);

    const user: User = await getData(`/user/${userId.value}`);

    return user;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessage.FetchFailed);
  }
}

export async function getHistory(filter: HistoryTab) {
  try {
    const userId = await extractUserId();
    if (!userId) throw new Error(ErrorMessage.NotFound);

    const history: CoinHistory[] = await getData(
      `/user/${userId}/coin?filter=${filter}`
    );

    return history;
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessage.FetchFailed);
  }
}

export async function redeemDeal(dealId: string) {
  try {
    const userId = await extractUserId();
    if (!userId) throw new Error(ErrorMessage.NotFound);

    const res = await fetch(BASE_API_URL + "/transaction", {
      method: "POST",
      headers: {
        "Content-Type": " application/json",
      },
      body: JSON.stringify({ userId, dealId }),
    });
    if (!res.ok) {
      throw new Error("Update transaction failed");
    }
  } catch (error) {
    console.error(error);
    throw new Error(ErrorMessage.ServerError);
  }
}
