import Header from "@/components/common/header";
import Library from "@/components/common/library";

interface PageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <>
      <Header />
      <Library searchParams={params} />
    </>
  );
}
