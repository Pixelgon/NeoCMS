import Image from "next/image";
import { Btn } from "@/components/layout/btn";
import BlockCard from "@/components/layout/blockCard";
import { Section } from "@/components/layout/section";
import { Metadata } from "next";
import HeaderLogo from "@/components/header/headerLogo";
import * as motion from "@/lib/motion";
import GetLastTwoProjects from "@/utils/project/getLastTwoProjects";
import ProjectHM from "@/components/project/projectHM";
import Block from "@/components/block/block";

export const metadata: Metadata = {
  title: "Pixelgon - Your vision, our code",
  description:
    "Digitální parťák pro vaše projekty. Navrhujeme a vyvíjíme weby, aplikace a digitální řešení, která nejsou jen vizuálně přívětivá, ale efektivní a jedinečná.",
  keywords: [
    "web design",
    "app development",
    "digitální řešení",
    "progresivní webové aplikace",
    "e-commerce",
    "Pixelgon",
  ],
};

export default async function Home() {
  const lastProjects = await GetLastTwoProjects();

  return (
    <>
      <main>
        <HeaderLogo href={"#intro"}>
          <div className={"absolute left-[-10000px]"}>Pixelgon</div>
          <div className={"absolute left-[-10000px]"}>
            Your vision, our code
          </div>
          <div
            className={
              " w-full"
            }
          ></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-reg lg:gap-8 w-full">
            <BlockCard
              id="web"
              iconPath="/images/icons/web.svg"
              sec
              className="sm:col-span-2 sm:justify-self-center sm:w-[calc((100%_-_max(1.5rem,2svw))_/_2)] lg:col-span-1 lg:w-full"
            />
            <BlockCard
              id="design"
              iconPath="/images/icons/design.svg"
              delay={0.3}
              sec
            />
            <BlockCard
              id="code"
              iconPath="/images/icons/code.svg"
              delay={0.6}
              sec
            />
          </div>
        </HeaderLogo>
        <Section isPrim>
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 w-full items-center"
            id="intro"
          >
            <div className={"flex flex-col items-start gap-4"}>
              <motion.Block
                id="intro_title"
                motionProps={{
                  initial: { opacity: 0.1, scale: 0 },
                  whileInView: { opacity: 1, scale: 1 },
                  viewport: { once: true },
                }}
              />
              <Block id="intro_desc" />
              <div className="flex w-full flex-wrap items-center gap-4 mt-4">
                <Btn className="text-xl" prim action="contact">
                  Poptat projekt
                </Btn>
                <Btn href="/projekty" className={"text-xl"}>
                  Prohlednout realizace
                </Btn>
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0.1, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={"relative h-fit"}
            >
              <Image
                src={"/images/icons/laptop.webp"}
                fill
                sizes="50vw"
                alt=""
                className={
                  "!relative object-contain w-full drop-shadow-2xl z-10"
                }
                loading="lazy"
              />
              <div
                className={
                  "absolute top-[2%] left-[10%] w-[80%] h-[86%] z-0 screen"
                }
              >
                <motion.div
                  initial={{ animationPlayState: "paused" }}
                  whileInView={{ animationPlayState: "running" }}
                  viewport={{ once: true }}
                  className={"screen__foto screen__foto--hruba"}
                ></motion.div>
                <motion.div
                  initial={{ animationPlayState: "paused" }}
                  whileInView={{ animationPlayState: "running" }}
                  viewport={{ once: true }}
                  className={"screen__foto screen__foto--chalupa"}
                ></motion.div>
              </div>
            </motion.div>
          </div>
        </Section>
        <Section>
          <Block id="projects_title"/>
          <ProjectHM projects={lastProjects} />
        </Section>
        <Section isPrim>
          <div
            className={
              "grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-14 w-full items-center"
            }
          >

            <motion.Block id="about_img"
              motionProps={{
                initial: { opacity: 0, x: -100 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true, amount: 0.1 },
                transition: { duration: 0.5, ease: "easeOut" },
              }}
            />
            <motion.div
              className={"flex flex-col items-start gap-4"}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Block id="about_desc" />
              <Btn href="/o-mne" className={"text-xl"}>
                Můj přistup
              </Btn>
            </motion.div>
          </div>
        </Section>
      </main>
    </>
  );
}
