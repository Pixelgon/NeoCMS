'use client';
import { HeaderFull } from "@/components/header/headerFull";
import { Btn } from "@/components/layout/btn";
import Link from "next/link";

export default function NotFound() {
  return (
    <HeaderFull>
      <div className={'flex flex-col justify-center w-[75vw] max-w-[1000px] items-center select-none text-center'}>
        <h1 className={'leading-none text-[min(31vw,12rem)]'}>404</h1>
        <p className={'text-2xl text-[min(7vw,2.6rem)]'}><strong className={'text-pxlgn'}>Vision</strong> not found</p>
        <Btn href="/" className={'mt-8 text-xl'}>
          Zpět domů
        </Btn>
      </div>
    </HeaderFull>
  );
}