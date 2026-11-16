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

      if (prefersReducedMotion) return;

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

      // Reveal About and Portfolio content as each section enters the viewport.
      gsap.utils
        .toArray(".project-showcase, .page-footer > *")
        .forEach((item) => {
          gsap.from(item, {
            y: 24,
            autoAlpha: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 88%",
              once: true,
            },
          });
        });

      // Pin the story section while vertical scrolling moves its chapters sideways.
      const storySection = pageRef.current?.querySelector(".about-section");
      const storyTrack = pageRef.current?.querySelector(".story-track");
      const storyViewport = pageRef.current?.querySelector(".story-viewport");

      if (storySection && storyTrack && storyViewport) {
        const getScrollDistance = () => storyTrack.scrollWidth - storyViewport.clientWidth;
        const slideCount = storyTrack.children.length;
        const scrollHoldMultiplier = 1.35;

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
            scrub: 0.65,
            snap: {
              snapTo: 1 / (slideCount - 1),
              duration: { min: 0.45, max: 0.8 },
              delay: 0.16,
              ease: "power1.inOut",
              inertia: false,
            },
            anticipatePin: 1,
            // Consume the wheel movement that first reaches the pin so chapter one stays aligned.
            onEnter: (self) => self.scroll(self.start),
            onEnterBack: (self) => self.scroll(self.end),
            invalidateOnRefresh: true,
          },
        });
      }

      // Let each hobby card enter calmly, then respond to pointer and keyboard focus in CSS.
      gsap.from(".hobby-item", {
        y: 36,
        autoAlpha: 0,
        scale: 0.96,
        duration: 0.7,
        stagger: 0.14,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".hobbies-section",
          start: "top 72%",
          once: true,
        },
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
    },
    { scope: pageRef },
  );

  return <div ref={pageRef}>{children}</div>;
}
