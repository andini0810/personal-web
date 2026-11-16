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

      // Reveal project copy when it enters the viewport.
      gsap.utils
        .toArray(".project-showcase")
        .forEach((project) => {
          const projectCopy = project.querySelector(".project-copy");
          const screenshots = project.querySelectorAll(".project-gallery-item");
          if (projectCopy) {
            gsap.fromTo(
              projectCopy.children,
              { y: 30, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: projectCopy,
                  start: "top 94%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          }

          screenshots.forEach((screenshot, imageIndex) => {
            const from = { y: 56, scale: 0.9, autoAlpha: 0 };

            if (project.classList.contains("project-showcase-bloom")) {
              if (imageIndex === 1) Object.assign(from, { x: 46, y: -28 });
              if (imageIndex === 2) Object.assign(from, { x: -46, y: 34 });
            }

            if (project.classList.contains("project-showcase-homeplate") && imageIndex === 1) {
              Object.assign(from, { x: -38, y: 38 });
            }

            gsap.fromTo(
              screenshot,
              from,
              {
                x: 0,
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: screenshot,
                  start: "top 98%",
                  end: "top 60%",
                  scrub: 0.65,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
        });

      gsap.utils.toArray(".page-footer > *").forEach((item) => {
        gsap.from(item, {
          y: 18,
          autoAlpha: 0,
          duration: 0.55,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 92%", once: true },
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

      // Recalculate trigger positions after the complete page animation setup.
      ScrollTrigger.refresh();
    },
    { scope: pageRef },
  );

  return <div ref={pageRef}>{children}</div>;
}
