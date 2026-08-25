import type { Metadata } from "next";
import ContactClientChrome from "./ContactClientChrome";

export const metadata: Metadata = {
  title: "Contact NeoDent | Dental Hospitals in Hyderabad",
  description: "Begin your care journey with NeoDent Dental Hospitals in Humayun Nagar or Nampally, Hyderabad.",
};

export default function ContactPage() {
  return <ContactClientChrome />;
}
