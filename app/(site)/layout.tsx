import { ViewTransition } from "react";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { ReachDock } from "@/components/site/reach-dock";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content" className="site-main">
        <ViewTransition default="page">{children}</ViewTransition>
      </main>
      <Footer />
      <ReachDock />
    </>
  );
}
