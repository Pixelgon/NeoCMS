export const CONTACT_CONSTRAINTS = {
  name: { minLength: 2, maxLength: 100 },
  address: { maxLength: 254 },
  message: { minLength: 10, maxLength: 5_000 },
} as const;

export type ContactFields = {
  name: string;
  address: string;
  message: string;
};

export type ContactFieldErrors = Partial<Record<keyof ContactFields, string>>;

type ContactValidationResult =
  | { ok: true; honeypot: true }
  | { ok: true; honeypot: false; fields: ContactFields }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const containsControlCharacters = (value: string) => /[\u0000-\u001F\u007F]/.test(value);

const isValidEmail = (value: string) => {
  if (value.length > CONTACT_CONSTRAINTS.address.maxLength || containsControlCharacters(value)) {
    return false;
  }

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const validateContactInput = (input: unknown): ContactValidationResult => {
  if (!isRecord(input)) {
    return { ok: false, error: "Invalid request", fieldErrors: {} };
  }

  if (typeof input.email === "string" && input.email.trim().length > 0) {
    return { ok: true, honeypot: true };
  }

  const fieldErrors: ContactFieldErrors = {};
  const name = typeof input.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  const address = typeof input.address === "string" ? input.address.trim() : "";
  const message =
    typeof input.message === "string" ? input.message.trim().replace(/\r\n?/g, "\n") : "";

  if (
    name.length < CONTACT_CONSTRAINTS.name.minLength ||
    name.length > CONTACT_CONSTRAINTS.name.maxLength ||
    containsControlCharacters(name)
  ) {
    fieldErrors.name = "Jméno musí mít 2 až 100 znaků.";
  }

  if (!isValidEmail(address)) {
    fieldErrors.address = "Zadejte platnou e-mailovou adresu.";
  }

  if (
    message.length < CONTACT_CONSTRAINTS.message.minLength ||
    message.length > CONTACT_CONSTRAINTS.message.maxLength ||
    containsControlCharacters(message.replace(/\n|\t/g, ""))
  ) {
    fieldErrors.message = "Zpráva musí mít 10 až 5000 znaků.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, error: "Invalid fields", fieldErrors };
  }

  return {
    ok: true,
    honeypot: false,
    fields: { name, address, message },
  };
};
