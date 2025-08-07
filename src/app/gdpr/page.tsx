import { Header } from "@/components/header";
import { Section } from "@/components/layout/section";
import { Metadata } from "next";
import Link from "next/link";


const metadata: Metadata = {
    title: 'GDPR | Pixelgon',
    robots: {
        index: false,
    },
};

export default function GDPR() {
return (
    <>
        <Header bg="/images/headers/about-header.webp" title="GDPR"/>
        <main>
            <Section isPrim>
                <p>
                    Webová stránka <Link href="/">{process.env.BASE_PATH || "https://pixelgon.cz"}</Link> (dále jen „<strong>Stránka</strong>“) je provozována především za účelem nabízení služeb (dále jen „<strong>služby</strong>“). To se&nbsp;sebou jako svou nutnou součást
                    nese i práci s osobními údaji. Protože chceme, abyste byli co nejlépe informováni o tom, co s&nbsp;takto nashromážděnými osobními údaji děláme, sepsali jsme pro Vás tyto Zásady ochrany osobních údajů, a to v&nbsp;souladu s nařízením
                    Evropského parlamentu a Rady (EU) č. 2016/679, o ochraně fyzických osob v souvislosti se zpracováním osobních údajů (dále jen „<strong>GDPR</strong>“).
                </p>
                <p>V&nbsp;zásadách ochrany osobních údajů se dozvíte zejména:</p>
                <div>
                    <ul className={'list-decimal pl-10'}>
                        <li>Jaké informace shromažďujeme a z&nbsp;jakého důvodu.</li>
                        <li>Jakým způsobem tyto informace využíváme.</li>
                        <li>Jaké jsou Vaše práva ohledně námi využívaných soukromých informací a jakým způsobem je u nás uplatnit.</li>
                    </ul>
                </div>
                <h3>Informace, které o Vás shromažďujeme</h3>
                <p>
                    V&nbsp;souvislosti s&nbsp;poskytováním služeb o Vás shromažďujeme Vaše jméno případně přezdívku Bez shromažďování těchto osobních údajů bychom Vám nebyly schopni poskytnout veškeré poskytované služby na nejlepší úrovni, tak jak
                    poskytujeme dnes.
                </p>
                <h3>Jakým způsobem informace využíváme</h3>
                <p>Osobní údaje, které shromažďujeme, využíváme především za účelem poskytování Služeb a k&nbsp;zajištění veškeré související dokumentace.</p>
                <p>
                    Shromážděné údaje archivujeme po dobu nezbytně nutnou dle právních předpisů a v&nbsp;souvislosti se smluvním vztahem a případným sporem z&nbsp;něj vzniklým. S&nbsp;ohledem na to, že soudní spor může vzniknout v&nbsp;době 3 let od
                    ukončení smluvního vztahu, archivujeme nashromážděné údaje po dobu 4 let. Déle smluvní údaje shromažďujeme pouze v&nbsp;souvislosti s&nbsp;plněním zákonných povinností. K&nbsp;dřívějšímu výmazu shromážděných údajů může dojít na
                    základě žádosti subjektu údajů, tak jak je uvedeno níže.
                </p>
                <p>Nashromážděné osobní údaje nejsou žádným způsobem bez řádného právního důvodu zpřístupňovány třetím osobám.</p>
                <h3>Jaká máte práva a jak jich využít</h3>
                <p>
                    <strong>Právo na zpřístupnění informací a právo na jejich opravu&nbsp;</strong>
                    Kdykoliv v budoucnu budete chtít, můžete nás zasláním zprávy na e-mailovu adresu&nbsp;
                    <Link href="mailto:pixelgon@pixelgon.cz">pixelgon@pixelgon.cz</Link>&nbsp;(dále jen „
                    <strong>e-mailová adresa provozovatele</strong>“) požádat o zaslání potvrzení, zda jsou či nejsou Vaše osobní údaje zpracovávány. V&nbsp;případě, že Vaše údaje námi budou zpracovány, můžeme Vás na Vaši žádost nad rámec informací
                    poskytnutých v&nbsp;těchto Zásadách ochrany&nbsp;osobních údajů informovat i o případných třetích osobách, kterým byly nebo budou Vaše osobní údaje zpřístupněny a pokud nezískáme osobní údaje od Vás, máte právo na veškeré nám
                    dostupné informace o tom, odkud jsme Vaše osobní informace získali.
                </p>
                <p>
                    Pokud o Vás budeme zpracovávat Vaše osobní údaje nepřesně, můžete nás na tuto skutečnost zasláním zprávy na e-mailovou adresu provozovatele upozornit, my pak bez zbytečného odkladu nepřesné osobní údaje opravíme.
                </p>
                <p>
                    <strong>Právo vznést námitky proti zpracování osobních údajů&nbsp;</strong>
                    V&nbsp;případě, že budeme Vaše osobní údaje zpracovávat na základě námi oprávněného zájmu, máte právo proti takovému zpracování vznést námitky, a to zasláním zprávy na e-mailovou adresu provozovatele. Pokud takovou námitku podáte,
                    nebudeme moci Vaše osobní údaje zpracovávat, dokud neprokážeme, jaký závažný oprávněný důvod pro zpracování máme, a že tento náš důvod převáží nad Vašimi zájmy, Vašimi právy a svobodami či nad výkonem nebo obhajobou právních nároků.
                </p>
                <p>
                    Pokud bychom zpracovávali Vaše osobní údaje pro účely přímého marketingu (např. z&nbsp;důvodů zasílání obchodních sdělení), můžete vznést na výše uvedenou e-mailovou adresu námitky, proti takovému zpracování, přičemž po vznesení
                    takové námitky již nebudeme tyto údaje pro účely přímého marketingu zpracovávat.
                </p>
                <p>
                    <strong>Právo na omezení práce s&nbsp;osobními údaji&nbsp;</strong>
                    Máte právo, abychom omezili jakékoliv zpracování Vašich osobních údajů včetně jejich vymazání:
                </p>
                <div>
                    <ul className={'list-decimal pl-10'}>
                        <li>Pokud nám dáte vědět, že jsou námi shromážděné osobní údaje nepřesné, a to až do ověření jejich správnosti.</li>
                        <li>Pokud bude zpracování Vašich osobních údajů protiprávní a Vy požádáte zasláním zprávy na e-mailovou adresu provozovatele namísto o vymazání o omezení jejich použití.</li>
                        <li>Pokud Vaše osobní údaje již sice nebudeme potřebovat pro zajištění našich služeb, ale Vy je budete požadovat pro určení, výkon nebo obhajobu Vašich právních nároků.</li>
                        <li>Pokud vznesete námitku proti zpracování dle odstavce výše, a to do doby, než ověříme, zda naše důvody zpracování převažují nad Vašimi zájmy.</li>
                    </ul>
                </div>
                <p>
                    <strong>Právo být zapomenut (právo na vymazání osobních údajů)</strong>
                    V&nbsp;případě, že zjistíte, že zpracováváme Vaše osobní údaje:
                </p>
                <div>
                    <ul className={'list-decimal pl-10'}>
                        <li>Přestože již není jejich zpracování potřebné pro účely, kvůli kterým jsme je získali.</li>
                        <li>
                            Odvoláte souhlas s&nbsp;jejich zpracováním a&nbsp;zároveň nebude existovat žádný další důvod pro jejich zpracování (samozřejmě jen v&nbsp;případech, kde zpracováváme Vaše osobní údaje na základě Vašeho souhlasu).
                        </li>
                        <li>
                            Pokud vznesete námitku podle odstavce uvedeného výše a my Vám nebudeme schopni prokázat oprávněné důvody pro jejich zpracování, které převáží nad Vašimi zájmy, Vašimi právy a svobodami či nad výkonem nebo obhajobou právních
                            nároků.
                        </li>
                        <li>Neoprávněně.</li>
                    </ul>
                </div>
                <p>
                    Máte právo na to, abychom bez zbytečného odkladu od oznámení takovýchto skutečností zasláním zprávy na e-mailovou adresu provozovatele z takto zpracovávané osobní údaje vymazali. Údaje pak nemůžeme ani na Vaši žádost vymazat, pokud
                    bude jejich zpracování nezbytné pro výkon práva na svobodu projevu a informace, pro splnění některé naší právní povinnosti nebo pro splnění úkolu prováděného ve veřejném zájmu, či pro určení, výkon nebo obhajobu našich právních
                    nároků.
                </p>
                <p>
                    <strong>Právo na poskytnutí údajů ve strojově čitelné formě</strong>
                    Pokud nás zasláním zprávy na e-mailovou adresu provozovatele požádáte, abychom Vám poskytli námi zpracovávané osobní údaje, zašleme Vám je ve strukturovaném běžně používaném a strojově čitelném formátu (např. formát *.pdf, nebo
                    některý z&nbsp;tabulkových formátů), pokud takto údaje zpracováváme. Pokud nás požádáte, abychom Vaše osobní údaje zaslali jinému správci osobních údajů, máme povinnost tak učinit, ovšem opět jen v&nbsp;případě, že je takto již
                    zpracováváme.
                </p>
                <p>
                    <strong>Právo kdykoliv odvolat souhlas se zasíláním obchodních sdělení</strong>
                    V&nbsp;případě, že od nás již nebudete chtít dostávat obchodní sdělení, můžete odvolat souhlas s&nbsp;jejich zasíláním kdykoliv i bez udání důvodů buď kliknutím na označený odkaz, který bude součástí každého obchodního sdělení,
                    popřípadě zasláním zprávy na e-mailovou adresu provozovatele.
                </p>
                <p>
                    <strong>Právo podat stížnost u Úřadu na ochranu osobních údajů</strong>
                    V&nbsp;případě, že podle Vašeho názoru nenaplníme všechny naše právní povinnosti vzniklé v&nbsp;souvislosti se zpracováním Vašich osobních údajů, můžete se obrátit na Úřad pro ochranu osobních údajů, a to buď na adrese jejich sídla
                    Pplk. Sochora 27, Praha 7, PSČ 170 00, na e-mailu&nbsp;<Link href="mailto:posta@uoou.gov.cz">posta@uoou.gov.cz</Link>, či
                    jakoukoliv jinou cestou, kterou bude Úřad na ochranu osobních údajů akceptovat. Bližší informace o úřadu najdete na webových stránkách&nbsp;<Link href="https://www.uoou.cz/" target="_blank" rel="noopener noreferrer">www.uoou.cz</Link>.
                </p>
            </Section>    
        </main>
    </>
);
}