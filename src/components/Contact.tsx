import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { getIconColor } from "../utils/colors";

export default function Contact() {
  const mailColor = getIconColor('mail');
  const phoneColor = getIconColor('messageSquare');
  const locationColor = getIconColor('layout');

  // Format phone number for WhatsApp
  const phoneNumber = "5547997673790"; // Remove non-numeric characters
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const emailUrl = "https://mail.google.com/mail/?view=cm&fs=1&to=orionstelaris04@gmail.com";
  const mapsUrl = "https://www.google.com/maps?q=Jaraguá+do+Sul,+Santa+Catarina,+Brasil";

  return (
    <section id="contact" className="py-16 md:py-24 bg-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300">Let's discuss your ML project</p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8 flex flex-col items-center md:items-start"
            >
              <div className="flex items-center space-x-6 group">
                <div className={`p-4 ${mailColor.bgColor} rounded-xl transition-colors duration-300 border ${mailColor.borderColor}`}>
                  <Mail className={`w-6 h-6 ${mailColor.textColor} ${mailColor.hoverColor}`} />
                </div>
                <a 
                  href={emailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  orionstelaris04@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-6 group">
                <div className={`p-4 ${phoneColor.bgColor} rounded-xl transition-colors duration-300 border ${phoneColor.borderColor}`}>
                  <Phone className={`w-6 h-6 ${phoneColor.textColor} ${phoneColor.hoverColor}`} />
                </div>
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  +55 (47) 99767-3790
                </a>
              </div>
              <div className="flex items-center space-x-6 group">
                <div className={`p-4 ${locationColor.bgColor} rounded-xl transition-colors duration-300 border ${locationColor.borderColor}`}>
                  <MapPin className={`w-6 h-6 ${locationColor.textColor} ${locationColor.hoverColor}`} />
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-400 transition-colors"
                >
                  Jaraguá do Sul, Santa Catarina, Brasil
                </a>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-6 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 w-full"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-700 bg-slate-800 text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 
                    transition-all duration-200 placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-700 bg-slate-800 text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 
                    transition-all duration-200 placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-6 py-4 rounded-xl border-2 border-slate-700 bg-slate-800 text-gray-100
                    focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 
                    transition-all duration-200 resize-none placeholder-gray-400"
                ></textarea>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-xl
                  font-medium shadow-soft hover:shadow-lg transition-all duration-200 border border-primary-500/20"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
