'use client'
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { Btn } from "../layout/btn";
import Input from "./input";
import Textarea from "./textArea";
import { useLayout } from "@/context/layoutContext";
import { useTopLoader } from 'nextjs-toploader';
import { FormType } from "@/types/formType";
import {
  CONTACT_CONSTRAINTS,
  validateContactInput,
  type ContactFieldErrors,
} from "@/lib/contactValidation";

export const ContactForm: FC = () => {

  const loader = useTopLoader(); 

  const [formData, setFormData] = useState<FormType>({
    name: "",
    address: "",
    message: "",
    email: "",
  });
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  const layoutData = useLayout();


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "name" || name === "address" || name === "message") {
      setFieldErrors((current) => {
        if (!current[name]) return current;
        const next = { ...current };
        delete next[name];
        return next;
      });
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation = validateContactInput(formData);

    if (!validation.ok) {
      setFieldErrors(validation.fieldErrors);
      const firstInvalidField = (["name", "address", "message"] as const).find(
        (fieldName) => validation.fieldErrors[fieldName],
      );

      if (firstInvalidField) {
        requestAnimationFrame(() => document.getElementById(firstInvalidField)?.focus());
      }
      return;
    }

    setFieldErrors({});
    loader.start();
    try {
      if (!formData.email) {
        setFormData((prev) => ({ name: prev.name, address: prev.address, message: prev.message }));
      }
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        loader.done();
        layoutData.closeModal();
        setFormData({ name: "", email: "", message: "", address: "" });
        layoutData.showToast({ message: 'Zpráva byla úspěšně odeslána.', type: 'success' });
      } else {
        const errorData = await response.json();
        loader.done();
        layoutData.showToast({ message: `Něco se pokazilo: ${errorData?.error || 'Chyba serveru.'}`, type: 'error' });
      }
    } catch (error) {
      loader.done();
      layoutData.showToast({ message: 'Nepodařilo se odeslat zprávu. Zkontrolujte připojení k internetu.', type: 'error' });
    }
  };

  return (
      <form className="flex flex-col gap-2 w-full justify-center" onSubmit={handleSubmit} noValidate>
        <Input
          type="text"
          placeholder="Jméno příjmení"
          name="name"
          id="name"
          label="Jméno*"
          value={formData.name}
          onChange={handleChange}
          minLength={CONTACT_CONSTRAINTS.name.minLength}
          limit={CONTACT_CONSTRAINTS.name.maxLength}
          error={fieldErrors.name}
          required
        />
        <Input
          type="email"
          placeholder="jmeno@email.cz"
          name="address"
          id="address"
          label="Email*"
          value={formData.address}
          onChange={handleChange}
          limit={CONTACT_CONSTRAINTS.address.maxLength}
          error={fieldErrors.address}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          label="Email*"
          value={formData.email}
          onChange={handleChange}
          className={'hidden'}
        />
        <Textarea
          placeholder="Vaše zpráva"
          name="message"
          id="message"
          label="Zpráva*"
          value={formData.message}
          onChange={handleChange}
          minLength={CONTACT_CONSTRAINTS.message.minLength}
          limit={CONTACT_CONSTRAINTS.message.maxLength}
          error={fieldErrors.message}
          required
        />
        <Btn prim type="submit" className="mt-5">
          Odeslat
        </Btn>
      </form>
  );
};

export default ContactForm;
