import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, Move, MoveIn, MoveOut, Sticky, StickyIn, ZoomIn } from "react-scroll-motion";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

export default function Intro() {
    return (
        <ScrollContainer>
             <ScrollPage page={0}>
    <Animator animation={batch(Fade(), MoveOut(0, -200))}>
    <img
        src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn11.bigcommerce.com%2Fs-qfzerv205w%2Fimages%2Fstencil%2Foriginal%2Fproducts%2F115%2F489%2FHat-front-black__72990.1603748583.png&w=640&q=85"
        className="bg-transparent w-[100%] max-w-4xl block left-0 right-0 mx-auto"
      />
    </Animator>
  </ScrollPage>
        </ScrollContainer>
    )
}
