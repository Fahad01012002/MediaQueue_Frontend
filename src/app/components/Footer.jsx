import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { BsInstagram } from "react-icons/bs";
import { FiLinkedin, FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 pt-12 pb-8 mt-auto">

      <div className="w-11/12 mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                M
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                MediQueue
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Connecting learners with expert tutors for a smooth and efficient learning experience.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
              Learning Services
            </h3>

            <ul className="space-y-2">
              {[
                { name: "Find a Tutor", href: "/tutors" },
                { name: "Online Classes", href: "#" },
                { name: "In-person Mentoring", href: "#" },
                { name: "Subject Guides", href: "#" }
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">
              Contact Info
            </h3>

            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">

              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>123 Learning Avenue, Education City</span>
              </li>

              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>

              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>support@mediqueue.com</span>
              </li>

            </ul>
          </div>

          {/* Social */}
          <div>

            <div>
              <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-slate-100">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white">
                  <FiFacebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white">
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white">
                  <BsInstagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full flex items-center justify-center transition-colors bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white">
                  <FiLinkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 dark:border-zinc-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-slate-500 dark:text-slate-400">

          <p>
            © {new Date().getFullYear()} MediQueue. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">
              Terms of Service
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}







