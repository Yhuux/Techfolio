import { Link } from "react-scroll";
import { Brain } from "lucide-react";
import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS } from "../constants";
import { iconMap } from "../utils/icons";
import { getIconColor } from "../utils/colors";
import type { MenuItem } from "../types";

const NavLink = memo(function NavLink({ 
  to, 
  icon, 
  title, 
  onClick 
}: MenuItem & { 
  onClick?: () => void;
}) {
  const IconComponent = iconMap[icon.toLowerCase()];
  const iconColor = getIconColor(icon);

  // For the Home link, we'll scroll to top instead of using the regular Link component
  if (to === "top") {
    return (
      <button
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          onClick?.();
        }}
        className="flex items-center gap-2 text-gray-300 hover:text-primary-400 font-medium cursor-pointer 
          transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-700/50 text-base border border-transparent
          hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        role="menuitem"
        tabIndex={0}
        aria-label={`Navigate to ${title}`}
      >
        {IconComponent && (
          <div className={`p-1.5 ${iconColor.bgColor} rounded-lg transition-colors duration-300 border ${iconColor.borderColor}`}>
            <IconComponent 
              className={`w-4 h-4 ${iconColor.textColor} ${iconColor.hoverColor}`}
              aria-hidden="true" 
            />
          </div>
        )}
        <span className="transition-colors duration-300">{title}</span>
      </button>
    );
  }
  
  return (
    <Link
      to={to}
      smooth={true}
      duration={500}
      className="flex items-center gap-2 text-gray-300 hover:text-primary-400 font-medium cursor-pointer 
        transition-all duration-300 px-3 py-2 rounded-lg hover:bg-slate-700/50 text-base border border-transparent
        hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900"
      onClick={onClick}
      role="menuitem"
      tabIndex={0}
      aria-label={`Navigate to ${title} section`}
    >
      {IconComponent && (
        <div className={`p-1.5 ${iconColor.bgColor} rounded-lg transition-colors duration-300 border ${iconColor.borderColor}`}>
          <IconComponent 
            className={`w-4 h-4 ${iconColor.textColor} ${iconColor.hoverColor}`}
            aria-hidden="true" 
          />
        </div>
      )}
      <span className="transition-colors duration-300">{title}</span>
    </Link>
  );
});

NavLink.displayName = 'NavLink';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const MenuIconComponent = iconMap[isOpen ? 'x' : 'menu'];
  const menuIconColor = getIconColor(isOpen ? 'x' : 'menu');

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full glass-effect z-50 border-b border-slate-700/50"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer"
            aria-label="Go to top"
          >
            <div className={`p-2 ${getIconColor('brain').bgColor} rounded-xl border ${getIconColor('brain').borderColor}`}>
              <Brain className={`w-6 h-6 ${getIconColor('brain').textColor}`} aria-hidden="true" />
            </div>
            <div>
              <span className="text-xl font-bold gradient-text">DataMind</span>
              <span className="hidden sm:block text-xs text-gray-400">AI Solutions</span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-2" role="menubar">
              {MENU_ITEMS.map((item) => (
                <NavLink key={`${item.to}-${item.title}`} {...item} />
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2 ${menuIconColor.bgColor} rounded-lg transition-all duration-300
              border ${menuIconColor.borderColor} focus:outline-none focus:ring-2 
              focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {MenuIconComponent && (
              <MenuIconComponent 
                className={`w-5 h-5 ${menuIconColor.textColor} ${menuIconColor.hoverColor}`} 
                aria-hidden="true" 
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass-effect border-t border-slate-700/50"
            role="menu"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-2 space-y-1">
              {MENU_ITEMS.map((item) => (
                <NavLink 
                  key={`mobile-${item.to}-${item.title}`} 
                  {...item} 
                  onClick={closeMenu}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}