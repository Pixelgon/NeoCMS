import Image from "next/image";
import Block from "@/components/block/block";
import { Card } from "@/components/layout/card";

interface BlockCardProps {
  id: string;
  iconPath?: string;
  delay?: number;
  sec?: boolean;
  className?: string;
}

export default function BlockCard({
  id,
  iconPath,
  delay,
  sec,
  className,
}: BlockCardProps) {
  return (
    <Card delay={delay} sec={sec} className={className}>
      <div className="relative flex w-full items-center justify-center gap-2">
        {iconPath ? (
          <Image
            alt=""
            src={iconPath}
            width={0}
            height={0}
            className="!relative max-h-full w-auto"
          />
        ) : null}
        <Block id={`${id}_title`} />
      </div>
      <Block id={`${id}_desc`} />
    </Card>
  );
}
