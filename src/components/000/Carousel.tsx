import React from "react";
import { EmblaOptionsType } from "embla-carousel-react";
import EmblaCarousel from "./EmblaCarousel";

import "./css/base.css";
import "./css/sandbox.css";
import "./css/embla.css";


const OPTIONS: EmblaOptionsType = {
  inViewThreshold: 0,
  dragFree: false,
  containScroll: "keepSnaps",
  watchSlides: false,
  watchResize: false,
};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const Carousel: React.FC = () => (
  <div className="sandbox">
    <section className="sandbox__carousel">
      <EmblaCarousel slides={SLIDES} options={OPTIONS} />
    </section>
  </div>
);
export default Carousel;
