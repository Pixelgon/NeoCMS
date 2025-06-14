import { FC, FormEvent, useState, ChangeEvent } from "react";
import { Btn } from "./Btn";
import Input from "./Input";
import { Modal } from "./Modal";
import Textarea from "./TextArea";
import { FormType } from "@/types/FormType";

interface ModalProps {
  setModalState: (state: boolean) => void;
  modalState: boolean;
}

export const ContactForm: FC<ModalProps> = ({ setModalState, modalState }) => {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setModalState(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Zpráva byla úspěšně odeslána.");
    } else {
      const errorData = await response.json();
      alert(`Chyba při odesílání zprávy: ${errorData.error || "Neznámá chyba"}`);
    }
  };

  return (
    <Modal modalState={modalState} setModalState={setModalState} title="Kontaktujte nás">
      <form className="flex flex-col gap-2 w-full justify-center" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Jméno příjmení"
          name="name"
          id="name"
          label="Jméno*"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          placeholder="jmeno@email.cz"
          name="email"
          id="email"
          label="Email*"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Textarea
          placeholder="Vaše zpráva"
          name="message"
          id="message"
          label="Zpráva*"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Btn prim type="submit" className="mt-5">
          Odeslat
        </Btn>
      </form>
    </Modal>
  );
};

export default ContactForm;