import type { Metadata } from "next";
import { LegalPage } from "@/components/ui/legal-page";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="10 October 2026"
      intro="By using BazarDor you agree to these terms. If you do not agree, please do not use the app."
      sections={[
        {
          heading: "About the service",
          body: [
            "BazarDor provides indicative daily prices of essential commodities in Bangladesh for general information only.",
          ],
        },
        {
          heading: "Accuracy of prices",
          body: [
            "All prices are estimates and may change with market conditions. They may differ from the price you pay in a shop or market. Do not rely on them for financial decisions.",
          ],
        },
        {
          heading: "Your account",
          body: [
            "You are responsible for keeping your sign in details safe and for activity under your account. Please provide accurate information when you register.",
          ],
        },
        {
          heading: "Acceptable use",
          body: [
            "Do not attempt to disrupt the service, access other users' accounts or send automated requests that place unreasonable load on the app.",
          ],
        },
        {
          heading: "Changes and availability",
          body: [
            "The service is provided as is, without warranties of any kind. We may change or stop it at any time, and we may update these terms by publishing a new version on this page.",
          ],
        },
      ]}
    />
  );
}
