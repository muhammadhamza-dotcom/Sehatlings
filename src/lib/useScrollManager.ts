import { useEffect, useRef } from 'react';

type ScrollCallback = (scrollData: { scrollY: number; direction: 'up' | 'down' }) => void;

class ScrollManager {
  private static instance: ScrollManager;
  private callbacks: Map<string, ScrollCallback> = new Map();
  private rafId: number | null = null;
  private lastScrollY = 0;
  private currentScrollY = 0;
  private direction: 'up' | 'down' = 'down';

  private constructor() {
    if (typeof window !== 'undefined') {
      this.lastScrollY = window.scrollY;
      this.currentScrollY = window.scrollY;
    }
  }

  static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  private handleScroll = () => {
    this.currentScrollY = window.scrollY;
  };

  private tick = () => {
    if (this.currentScrollY !== this.lastScrollY) {
      this.direction = this.currentScrollY > this.lastScrollY ? 'down' : 'up';

      const scrollData = {
        scrollY: this.currentScrollY,
        direction: this.direction
      };

      this.callbacks.forEach(callback => callback(scrollData));
      this.lastScrollY = this.currentScrollY;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };

  subscribe(id: string, callback: ScrollCallback): () => void {
    const wasEmpty = this.callbacks.size === 0;
    this.callbacks.set(id, callback);

    if (wasEmpty) {
      window.addEventListener('scroll', this.handleScroll, { passive: true });
      this.rafId = requestAnimationFrame(this.tick);
    }

    return () => {
      this.callbacks.delete(id);
      if (this.callbacks.size === 0) {
        window.removeEventListener('scroll', this.handleScroll);
        if (this.rafId !== null) {
          cancelAnimationFrame(this.rafId);
          this.rafId = null;
        }
      }
    };
  }
}

export function useScrollManager(callback: ScrollCallback, id: string = Math.random().toString(36)) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const manager = ScrollManager.getInstance();
    const unsubscribe = manager.subscribe(id, (data) => {
      callbackRef.current(data);
    });

    return unsubscribe;
  }, [id]);
}
