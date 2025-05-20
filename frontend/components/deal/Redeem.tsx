"use client";

import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { NextPage } from "next";
import { RedeemProps } from "@/types/props";
import Image from "next/image";
import { redeemDeal } from "@/app/actions";
import Loading from "../Loading";

const Redeem: NextPage<RedeemProps> = ({ id }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [showQr, setShowQr] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowQr(false);
  };

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await redeemDeal(id);
      setShowQr(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed flex bottom-0 rounded-t-lg shadow-2xl w-full p-2 justify-center">
        <Button
          variant="contained"
          sx={{ width: "100%", maxWidth: "30rem" }}
          onClick={handleOpen}
        >
          Redeem
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <div
          className={`absolute top-1/2 left-1/2 flex flex-col justify-center -translate-1/2 bg-white rounded-lg min-w-[40rem] min-h-[200px]  ${
            showQr ? "p-2 aspect-square" : "p-2 pt-4"
          }`}
        >
          {isLoading ? (
            <Loading />
          ) : showQr ? (
            <Image
              src="/qr.png"
              width={500}
              height={500}
              alt="QRCode"
              className="mx-auto"
            />
          ) : (
            <>
              <h4 className="text-black font-medium text-xl text-center mb-4 h-full flex-1 flex justify-center items-center">
                Redeem this deal?
              </h4>
              <div className="flex w-full gap-1">
                <Button
                  variant="outlined"
                  sx={{ flex: 1 }}
                  onClick={handleClose}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  sx={{ flex: 1 }}
                  onClick={handleAccept}
                >
                  Yes
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default Redeem;
