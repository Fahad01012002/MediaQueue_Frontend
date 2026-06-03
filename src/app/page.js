'use client'
import { ArrowRight, BookOpen, Clock, Users, Star, Award, Shield, Zap, Sparkles, MapPin, CalendarDays, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { getTutor } from "./lib/data";
import Image from "next/image";
import { useEffect, useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Home() {

  const [tutors, setTutors] = useState([]);

  const handleTutors = async () => {
    const data = await getTutor();
    setTutors(data);
  }

  useEffect(() => {
    handleTutors();
  }, []);

  return (
    <div className="flex flex-col gap-32 pb-24 pt-12 overflow-hidden">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center w-11/12 mx-auto px-4 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-full h-150 max-w-200">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-500/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-500/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-[100px] opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-800 dark:text-zinc-200 text-sm font-medium mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span>The modern way to find expert tutors</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.1]"
        >
          Master any subject <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-cyan-500">
            faster than ever.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mb-12"
        >
          Connect with world-class educators, master new skills, and achieve your academic goals through personalized 1-on-1 sessions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link
            href="/tutors"
            className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-semibold flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-xl shadow-slate-900/20 dark:shadow-white/20 active:scale-95"
          >
            Find a Tutor <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/register"
            className="px-8 py-4 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 font-semibold flex items-center justify-center transition-all active:scale-95"
          >
            Become a Tutor
          </Link>
        </motion.div>
      </section>

      {/* Bento Grid Features */}
      <section className="w-11/12 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            Everything you need to succeed
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A comprehensive platform designed for modern learners and expert educators.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <motion.div variants={fadeIn} className="md:col-span-2 relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-zinc-900 p-8 border border-slate-200/50 dark:border-zinc-800/50 group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-48 h-48" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-12 border border-indigo-500/20">
                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Top-Tier Verification</h3>
                <p className="text-slate-600 dark:text-zinc-400 max-w-sm">Every tutor on our platform is thoroughly verified to ensure the highest quality of education for you.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-zinc-900 p-8 border border-slate-200/50 dark:border-zinc-800/50 group">
            <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Clock className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-12 border border-cyan-500/20">
                <Clock className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Flexible Slots</h3>
                <p className="text-slate-600 dark:text-zinc-400">Book sessions exactly when you need them.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="relative overflow-hidden rounded-3xl bg-slate-100 dark:bg-zinc-900 p-8 border border-slate-200/50 dark:border-zinc-800/50 group">
            <div className="absolute -bottom-6 -right-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Shield className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-12 border border-purple-500/20">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Secure Payments</h3>
                <p className="text-slate-600 dark:text-zinc-400">Your transactions are 100% protected and managed safely.</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn} className="md:col-span-2 relative overflow-hidden rounded-3xl bg-slate-900 dark:bg-zinc-900 p-8 border border-slate-800 dark:border-zinc-800 group">
            <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-purple-500/10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between h-full gap-8">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-8 border border-white/10 backdrop-blur-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Expert Curated Content</h3>
                <p className="text-slate-400 max-w-sm">From MIT to Oxford, our educators bring real-world experience and top-tier academic backgrounds directly to your screen.</p>
              </div>
              <Link
                href="/tutors"
                className="px-6 py-3 rounded-full bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors shrink-0"
              >
                Browse Experts
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Tutors Grid */}
      <section className="px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 mx-auto">
          {tutors.slice(0, 6).map((tutor, index) => (
            <div
              key={tutor._id}
              className="group rounded-3xl overflow-hidden flex flex-col h-full bg-white dark:bg-zinc-900 border border-slate-200/50 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image + Badge */}
              <div className="h-56 overflow-hidden relative p-2">
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <Image
                    src={tutor.photoUrl}
                    alt={tutor.name}
                    width={200}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent"></div>

                  <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 dark:text-white shadow-sm flex items-center gap-1.5 border border-white/20 dark:border-zinc-700">
                    ⭐ <span>{tutor.subject}</span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{tutor.name}</h3>
                    <p className="text-xs text-white/90 flex items-center gap-1.5 font-medium drop-shadow-md">
                      🎓 {tutor.institution}
                    </p>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm mb-6 flex-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">📅 Availability</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{tutor.availableDays}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">📍 Mode</span>
                    <span className="font-medium text-slate-900 dark:text-slate-100">{tutor.teachingMode}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">⚡ Rate</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">${tutor.hourlyFee}<span className="text-xs font-normal text-slate-500 dark:text-zinc-500">/hr</span></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-slate-400 dark:text-zinc-500">👥 Slots</span>
                    <span className={`font-medium ${tutor.totalSlot === 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {tutor.totalSlot === 0 ? 'Fully Booked' : `${tutor.totalSlot} Left`}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/tutors/${tutor._id}`}
                  className="w-full py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white group-hover:bg-slate-900 dark:group-hover:bg-indigo-600 group-hover:text-white font-medium text-center transition-all duration-300 mt-auto"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-11/12 mx-auto px-4">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 dark:bg-zinc-900 border border-slate-800 dark:border-zinc-800">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/90 to-transparent"></div>

          <div className="relative z-10 p-10 md:p-16 lg:p-20 max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            >
              Ready to accelerate your learning?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-slate-300 mb-10"
            >
              Join thousands of students who have transformed their academic journey with our expert tutors.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/sign-up"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all shadow-[0_0_40px_8px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_12px_rgba(99,102,241,0.4)]"
              >
                Create free account <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}