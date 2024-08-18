import { FC, PropsWithChildren } from "react";

export const Modal: FC<PropsWithChildren> = ({children}) => {
  

  return (
    <>
      <div className={'fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100] flex justify-center items-center'}>
        <dialog className={'bg-prim p-4 rounded-3xl'}>
          {children}
        </dialog>
      </div>
    </>
  );
}