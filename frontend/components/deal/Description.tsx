"use client";

import { useState, useEffect } from "react";
import { DescriptionTab } from "@/types";
import { Tabs, Tab } from "@mui/material";
import { DescriptionProps } from "@/types/props";
import { NextPage } from "next";

const Description: NextPage<DescriptionProps> = (props) => {
  const [tabValue, setTabValue] = useState<DescriptionTab>(
    DescriptionTab.Detail
  );

  const handleTabChange = (
    e: React.SyntheticEvent,
    newValue: DescriptionTab
  ) => {
    e.preventDefault();
    setTabValue(newValue);
  };

  return (
    <section>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ maxWidth: "50rem", marginX: "auto" }}
      >
        <Tab label="Details" value={DescriptionTab.Detail} />
        <Tab label="Terms and Conditions" value={DescriptionTab.TNC} />
      </Tabs>
      <div className="text-black px-2 pt-3 pb-16">
        <p>{props[tabValue]}</p>
      </div>
    </section>
  );
};

export default Description;
