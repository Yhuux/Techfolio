export const setPageAnnouncement = (message: string): void => {
  const announcer = document.getElementById("announcer") || createAnnouncer();
  announcer.textContent = message;
};

const createAnnouncer = (): HTMLElement => {
  const announcer = document.createElement("div");
  announcer.id = "announcer";
  announcer.className = "sr-only";
  announcer.setAttribute("aria-live", "polite");
  announcer.setAttribute("aria-atomic", "true");
  document.body.appendChild(announcer);
  return announcer;
};

export const handleTabbing = (e: KeyboardEvent): void => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
  }
};

export const setupAccessibility = (): void => {
  // Add keyboard navigation indicator
  window.addEventListener("keydown", handleTabbing);

  // Remove focus rings when clicking
  window.addEventListener("mousedown", () => {
    document.body.classList.remove("user-is-tabbing");
  });

  // Ensure skip link is visible when focused
  const skipLink = document.querySelector(".skip-link") as HTMLElement;
  if (skipLink) {
    skipLink.addEventListener("focus", () => {
      skipLink.style.transform = "translateY(0)";
    });
    skipLink.addEventListener("blur", () => {
      skipLink.style.transform = "translateY(-100%)";
    });
  }
};

export const getFocusableElements = (element: HTMLElement): HTMLElement[] => {
  return Array.from(
    element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[];
};

export const trapFocus = (element: HTMLElement): void => {
  const focusableElements = getFocusableElements(element);
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
};

export const handleEscapeKey = (callback: () => void) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      callback();
    }
  };

  document.addEventListener("keydown", handleKeyDown);

  // Execute the return statement instead of returning a function
  document.removeEventListener("keydown", handleKeyDown);
};

export const setARIAExpanded = (
  element: HTMLElement,
  expanded: boolean
): void => {
  element.setAttribute("aria-expanded", expanded.toString());
};

export const announceLoadingState = (
  isLoading: boolean,
  context: string
): void => {
  setPageAnnouncement(
    isLoading ? `Loading ${context}...` : `${context} has finished loading`
  );
};

export const handleReducedMotion = (): boolean => {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
