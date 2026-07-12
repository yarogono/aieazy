import type { Metadata } from "next";
import { TrustPage } from "@/components/TrustPage";
import { getTrustPage } from "@/content/trustPages";

const page = getTrustPage("disclaimer")!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: `/${page.slug}`,
  },
};

export default function DisclaimerPage() {
  return <TrustPage page={page} />;
}
