import Hero from "@/components/Hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-svh flex-col bg-gray-50">
      <Header />
      <Hero />
      <div className="container flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
