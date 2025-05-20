"use client";

import { useEffect, useState } from "react";
import { Tabs, Tab } from "@mui/material";
import { HistoryTab, CoinHistory } from "@/types";
import { getHistory } from "@/app/actions";
import { truncateString, formatDate } from "@/utils";
import Loading from "@/components/Loading";
import { TbFolderOff } from "react-icons/tb";

function History() {
  const [tabValue, setTabValue] = useState<HistoryTab>(HistoryTab.Received);
  const [records, setRecords] = useState<CoinHistory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleTabChange = (e: React.SyntheticEvent, newValue: HistoryTab) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  useEffect(() => {
    async function fetchHistory() {
      const data = await getHistory(tabValue);
      return data;
    }

    setIsLoading(true);

    fetchHistory()
      .then((data) => setRecords(data))
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  }, [tabValue]);

  const renderTransaction = (amount: number) => {
    return amount >= 0 ? (
      <div className="text-green-500 font-medium text-end flex-1">
        +{amount}
      </div>
    ) : (
      <div className="text-red-500 font-medium text-end flex-1">{amount}</div>
    );
  };

  return (
    <main className="main-container bg-white">
      <div className="bg-primary">
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
          sx={{
            bgcolor: "primary.main",
            maxWidth: "50rem",
            marginX: "auto",
          }}
        >
          <Tab label="Received" value={HistoryTab.Received} />
          <Tab label="Spent" value={HistoryTab.Spent} />
        </Tabs>
      </div>
      {isLoading ? (
        <section className="flex min-h-screen items-center justify-center">
          <Loading />
        </section>
      ) : (
        <>
          {records.length > 0 ? (
            <section className="flex flex-col gap-2 px-2 py-4 min-h-screen items-center">
              {records.map((record, idx) => (
                <div
                  key={idx}
                  className="flex shadow-md rounded-lg px-3 py-2 border-2 border-primary-light items-center max-w-[50rem] w-full"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      {truncateString(record.description, 30)}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {formatDate(record.createdAt, "th-TH", true)}
                    </p>
                  </div>
                  {renderTransaction(record.amount)}
                </div>
              ))}
            </section>
          ) : (
            <section className="flex items-center justify-center min-h-screen">
              <TbFolderOff className="text-primary text-8xl" />
            </section>
          )}
        </>
      )}
    </main>
  );
}

export default History;
