import S1Hero       from "@/sections/S1Hero";
import S2ShopMedium from "@/sections/S2ShopMedium";
import S3NewIn      from "@/sections/S3NewIn";
import S4Artists    from "@/sections/S4Artists";
import S5Exhibition from "@/sections/S5Exhibition";
import S6Visit      from "@/sections/S6Visit";
import Footer       from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <S1Hero />
      <S2ShopMedium />
      <S3NewIn />
      <S4Artists />
      <S5Exhibition />
      <S6Visit />
      <Footer />
    </>
  );
}
