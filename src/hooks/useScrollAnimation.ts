"use client";
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useScrollAnimation() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedElements = useRef<Set<Element>>(new Set());

  useEffect(() => {
    // Clean up previous observer and reset all animations
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    // Reset all previously animated elements
    observedElements.current.forEach((el) => {
      el.classList.remove('animate');
    });
    observedElements.current.clear();

    // Small delay to ensure page transition is complete
    const timer = setTimeout(() => {
      // Create new intersection observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.classList.contains('animate')) {
              entry.target.classList.add('animate');
              observedElements.current.add(entry.target);
              // Stop observing this element to prevent re-triggering
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -10% 0px'
        }
      );

      // Observe all elements with data-animate attribute
      const elements = document.querySelectorAll('[data-animate]');
      elements.forEach((el) => {
        // Check if element is already in view
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        // If element is already in view (more than 10% visible), animate it immediately
        if (rect.top < windowHeight * 0.9 && rect.bottom > 0 && !el.classList.contains('animate')) {
          el.classList.add('animate');
          observedElements.current.add(el);
        } 
        // Otherwise, observe it for when it comes into view
        else if (!el.classList.contains('animate')) {
          observerRef.current?.observe(el);
        }
      });
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [pathname]); // Re-run when pathname changes
}
