"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function HeroAnimations({ children }) {
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Respect the system motion preference and leave all content visible.
      if (prefersReducedMotion) return;

      // Keep scroll reveals inside the active component scope, and refresh once
      // the browser has completed layout so desktop triggers use final positions.
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      intro
        .from(".topbar > *", {
          y: -14,
          autoAlpha: 0,
          duration: 0.55,
          stagger: 0.1,
        })
        .from(
          ".hero-copy > *",
          { y: 24, autoAlpha: 0, duration: 0.7, stagger: 0.12 },
          "-=0.25",
        )
        .from(
          ".portrait-card",
          { y: 28, autoAlpha: 0, duration: 0.8 },
          "-=0.55",
        )
        .from(
          ".side-note",
          { autoAlpha: 0, duration: 0.45 },
          "-=0.35",
        );

      // Pin the story section while vertical scrolling moves its chapters sideways.
      const storySection = pageRef.current?.querySelector(".about-section");
      const storyTrack = pageRef.current?.querySelector(".story-track");
      const storyViewport = pageRef.current?.querySelector(".story-viewport");
      const storyNumbers = gsap.utils.toArray(".story-progress span");
      const storyMedia = gsap.matchMedia();
      let activeStoryIndex = -1;

      const setActiveStoryNumber = (index) => {
        if (index === activeStoryIndex) return;
        activeStoryIndex = index;

        storyNumbers.forEach((number, numberIndex) => {
          const isActive = numberIndex === index;
          number.classList.toggle("is-active", isActive);
          gsap.to(number, {
            y: isActive ? -2 : 0,
            scale: isActive ? 1.12 : 1,
            duration: 0.22,
            ease: "power2.out",
            overwrite: true,
          });
        });
      };

      const updateMobileStoryNumber = () => {
        if (!storyViewport) return;
        const index = Math.round(storyViewport.scrollLeft / storyViewport.clientWidth);
        setActiveStoryNumber(index);
      };

      if (storySection && storyTrack && storyViewport) {
        setActiveStoryNumber(0);
        storyViewport.addEventListener("scroll", updateMobileStoryNumber, { passive: true });

        storyMedia.add("(min-width: 761px)", () => {
          const getScrollDistance = () => storyTrack.scrollWidth - storyViewport.clientWidth;
          const slideCount = storyTrack.children.length;
          const scrollHoldMultiplier = 1.2;

          gsap.to(storyTrack, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: storySection,
              start: "top top",
              end: () => `+=${getScrollDistance() * scrollHoldMultiplier}`,
              pin: true,
              // The page shell is a flex column, so margin spacing keeps later sections below the pin.
              pinSpacing: "margin",
              scrub: 0.5,
              snap: {
                snapTo: 1 / (slideCount - 1),
                duration: { min: 0.35, max: 0.65 },
                delay: 0.1,
                ease: "power1.inOut",
                inertia: false,
              },
              onUpdate: (self) => {
                setActiveStoryNumber(Math.round(self.progress * (slideCount - 1)));
              },
              anticipatePin: 1,
              // Consume the wheel movement that first reaches the pin so chapter one stays aligned.
              onEnter: (self) => self.scroll(self.start),
              onEnterBack: (self) => self.scroll(self.end),
              invalidateOnRefresh: true,
            },
          });
        });

      }

      // Register the pinned story trigger before downstream project triggers,
      // so refresh calculates the portfolio start positions after pin spacing.
      const portfolio = pageRef.current?.querySelector(".portfolio-section");
      const projectList = portfolio?.querySelector(".project-list");
      const progressLine = portfolio?.querySelector(".project-scroll-line span");
      if (projectList && progressLine) {
        gsap.set(progressLine, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(progressLine, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: projectList,
            start: "top 82%",
            end: "bottom 32%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray(".project-showcase").forEach((project) => {
        const copy = project.querySelector(".project-copy");
        const galleryItems = project.querySelectorAll(".project-gallery-item");
        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: project,
            start: "top 82%",
            end: "bottom 38%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        if (copy) timeline.fromTo(copy,
          { x: -56, y: 28, immediateRender: false },
          { x: 0, y: 0, duration: 1 },
          0,
        );
        if (galleryItems.length) {
          timeline.fromTo(galleryItems, { x: 52, y: 30, scale: 0.95, immediateRender: false }, {
            x: 0, y: 0, scale: 1, duration: 1, stagger: 0.12,
          }, 0.08);
        }
      });

      // Let each hobby card enter calmly, then respond to pointer and keyboard focus in CSS.
      gsap.from(".hobby-item", {
        y: 36,
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: { trigger: ".hobbies-section", start: "top 82%", once: true },
      });

      gsap.to(".portrait-placeholder", {
        yPercent: -7,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Refresh after image and font layout settles: story pin spacing changes
      // document geometry used by every portfolio trigger below it.
      let refreshFrame = 0;
      const refreshAfterLayout = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
        });
      };
      const pageImages = Array.from(pageRef.current?.querySelectorAll("img") ?? []);
      const assetsReady = Promise.allSettled([
        document.fonts?.ready ?? Promise.resolve(),
        ...pageImages.map((image) => image.decode?.().catch(() => undefined) ?? Promise.resolve()),
      ]);
      assetsReady.then(refreshAfterLayout);
      window.addEventListener("load", refreshAfterLayout);
      window.addEventListener("resize", refreshAfterLayout);
      return () => {
        cancelAnimationFrame(refreshFrame);
        window.removeEventListener("load", refreshAfterLayout);
        window.removeEventListener("resize", refreshAfterLayout);
        storyViewport?.removeEventListener("scroll", updateMobileStoryNumber);
        storyMedia.revert();
      };
      });

      return () => mm.revert();
    },
    { scope: pageRef },
  );

  return <div ref={pageRef}>{children}</div>;
}
