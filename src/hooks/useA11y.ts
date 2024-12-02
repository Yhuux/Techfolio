import { useEffect, useCallback, useRef } from "react";
import {
  handleEscapeKey,
  trapFocus,
  setARIAExpanded,
} from "../utils/accessibility";

interface UseA11yProps {
  onEscape?: () => void;
  trapFocus?: boolean;
  ariaExpanded?: boolean;
  elementRef?: React.RefObject<HTMLElement>;
}

export const useA11y = ({
  onEscape,
  trapFocus: shouldTrapFocus,
  ariaExpanded,
  elementRef,
}: UseA11yProps = {}) => {
  const internalRef = useRef<HTMLElement>(null);
  const ref = elementRef || internalRef;

  // Handle escape key
  useEffect(() => {
    if (onEscape) {
      return handleEscapeKey(onEscape);
    }
  }, [onEscape]);

  // Handle focus trapping
  useEffect(() => {
    const element = ref.current;
    if (shouldTrapFocus && element) {
      trapFocus(element);
    }
  }, [shouldTrapFocus, ref]);

  // Handle aria-expanded
  useEffect(() => {
    const element = ref.current;
    if (element && typeof ariaExpanded === "boolean") {
      setARIAExpanded(element, ariaExpanded);
    }
  }, [ariaExpanded, ref]);

  // Focus management
  const focusFirst = useCallback(() => {
    if (ref.current) {
      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) {
        (focusableElements[0] as HTMLElement).focus();
      }
    }
  }, [ref]);

  const focusLast = useCallback(() => {
    if (ref.current) {
      const focusableElements = ref.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length) {
        (
          focusableElements[focusableElements.length - 1] as HTMLElement
        ).focus();
      }
    }
  }, [ref]);

  return {
    ref,
    focusFirst,
    focusLast,
  };
};
