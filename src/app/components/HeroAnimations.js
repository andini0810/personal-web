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

      // Reveal project copy and screenshots once as each project enters view.
      gsap.utils.toArray(".project-showcase").forEach((project) => {
        const projectCopy = project.querySelector(".project-copy");
        const screenshots = project.querySelectorAll(".project-gallery-item");

        if (projectCopy) {
          gsap.fromTo(
            projectCopy.children,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: project,
                start: "top 82%",
                once: true,
              },
            },
          );
        }

        screenshots.forEach((screenshot, imageIndex) => {
          const from = { y: 32, scale: 0.97, autoAlpha: 0 };

          if (project.classList.contains("project-showcase-bloom")) {
            if (imageIndex === 1) Object.assign(from, { x: 24, y: -16 });
            if (imageIndex === 2) Object.assign(from, { x: -24, y: 18 });
          }

          if (
            project.classList.contains("project-showcase-homeplate") &&
            imageIndex === 1
          ) {
            Object.assign(from, { x: -22, y: 22 });
          }

          gsap.fromTo(
            screenshot,
            from,
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.7,
              delay: imageIndex * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: project,
                start: "top 82%",
                once: true,
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
      return () => {
        storyViewport?.removeEventListener("scroll", updateMobileStoryNumber);
        storyMedia.revert();
      };
    },
    { scope: pageRef },
  );

  return <div ref={pageRef}>{children}</div>;
}
