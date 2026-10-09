import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="10 October 2026"
      intro="BazarDor shows daily prices of essential commodities in Bangladesh. This page explains what information the app collects when you create an account and how it is used."
      sections={[
        {
          heading: "Information we collect",
          body: [
            "When you sign up with an email address and password, we store your name, email address and a securely hashed password.",
            "When you sign in with Google or GitHub, we receive your name, email address and profile picture from that provider. We never receive your Google or GitHub password.",
          ],
        },
        {
          heading: "How we use it",
          body: [
            "Your information is used only to create your account, keep you signed in and show your name in the app. We do not sell, rent or share it with third parties and we do not use it for advertising.",
          ],
        },
        {
          heading: "Cookies",
          body: [
            "We use secure, HTTP only cookies to keep you signed in. No tracking or advertising cookies are used.",
          ],
        },
        {
          heading: "Data storage and security",
          body: [
            "Account data is stored in a managed PostgreSQL database and sent over encrypted connections. Sign in attempts are rate limited to protect accounts.",
          ],
        },
        {
          heading: "Your choices",
          body: [
            "You can update your name from the My Profile page at any time. To delete your account and data, open an issue at https://github.com/SamaunRezvi/assignment_seven and we will remove it.",
          ],
        },
      ]}
    />
  );
}
