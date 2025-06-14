export const CookieConsentConfig = {
    guiOptions: {
      consentModal: {
        layout: "box",
        position: "bottom right",
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: "box",
        position: "right",
        equalWeightButtons: true,
        flipButtons: true,
      },
    },
    categories: {
      necessary: {
        readOnly: true,
      },
    },
    language: {
      default: "cs",
      translations: {
        cs: {
          consentModal: {
            title: "Vítejte, je čas na cookies!",
            description:
              "Na našich webových stránkách používáme soubory cookies, které jsou nezbytné k funkčnosti webových stránek.",
            acceptAllBtn: "Přijmout vše",
            acceptNecessaryBtn: "Odmítnout vše",
            showPreferencesBtn: "Spravovat preference",
              },
          preferencesModal: {
            title: "Centrum preferencí souhlasu",
            acceptAllBtn: "Přijmout vše",
            acceptNecessaryBtn: "Odmítnout vše",
            savePreferencesBtn: "<span>Uložit preference</span>",
            closeIconLabel: "Zavřít",
            serviceCounterLabel: "Služba|Služby",
            sections: [
              {
                title: "Použití cookies",
                description:
                  "Na našich webových stránkách používáme soubory cookies, které jsou nezbytné k funkčnosti webových stránek. S Vaším souhlasem je budeme používat. Tento souhlas můžete jednoduše vyjádřit kliknutím na tlačítko “Povolit vše” a můžete ho kdykoliv odvolat.",
              },
              {
                title:
                  'Nezbytně nutné cookies <span class="pm__badge">Vždy povoleno</span>',
                description:
                  "Zprostředkovávají základní funkčnost stránek. Web bez nich nemůže fungovat, proto není možné je vypnout. Při jejich zakázání v prohlížeči nemusí web správně fungovat.",
                linkedCategory: "necessary",
                cookieTable: {
                  headers: {
                      name: "Název",
                      domain: "Služba",
                      description: "Popis",
                      expiration: "Expirace"
                  },
                  body: [
                      {
                          name: "authjs.callback-url",
                          domain: "Autentizační služba",
                          description: "Cookie používaná k uložení zpětné URL adresy během autentizace.",
                          expiration: "Relace"
                      },
                      {
                          name: "authjs.csrf-token",
                          domain: "Autentizační služba",
                          description: "Cookie používaná k ochraně proti útokům Cross-Site Request Forgery (CSRF).",
                          expiration: "Relace"
                      },
                      {
                          name: "authjs.session-token",
                          domain: "Autentizační služba",
                          description: "Cookie ukládající token relace pro ověřené uživatele.",
                          expiration: "Relace nebo dle konfigurace"
                      },
                      {
                        name: "cc-cookie",
                        domain: "Cookie Consent",
                        description: "Cookie používaná k uložení nastavení souhlasu s používáním cookies.",
                        expiration: "Vyprší za 1 rok"
                      }
                  ]
              }
              },
              {
                title: "Více informací",
                description:
                  'Pro jakékoliv dotazy týkající se mé politiky cookies a vašich možností mě prosím <a class="cc__link" href="mailto:pixelgon@pixelgon.cz">kontaktujte</a>.',
              },
            ],
          },
        },
      },
      autoDetect: "browser",
    },
  };

export default CookieConsentConfig;