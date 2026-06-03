'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
    }),
};

export default function HeroBanner() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f0f2f8] px-4 pb-24 pt-16">

            
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                    background: `
                        radial-gradient(ellipse 60% 45% at 50% 0%,   #c7d6f7 0%, transparent 70%),
                        radial-gradient(ellipse 40% 35% at 80% 30%,  #d4c8f8 0%, transparent 60%),
                        radial-gradient(ellipse 35% 30% at 20% 40%,  #bde4f8 0%, transparent 60%),
                        radial-gradient(ellipse 50% 40% at 50% 80%,  #e8d5fa 0%, transparent 65%)
                    `,
                }}
            />

            
            <motion.div
                variants={fadeUp}
                custom={0}
                initial="hidden"
                animate="show"
                className="relative z-10 mb-8"
            >
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200/80 bg-white/60 px-4 py-1.5 text-sm text-gray-600 shadow-sm backdrop-blur-md">
                    <svg
                        className="h-4 w-4 text-indigo-500"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    The modern way to find expert tutors
                </span>
            </motion.div>

            
            <div className="relative z-10 text-center">
                <motion.h1
                    variants={fadeUp}
                    custom={1}
                    initial="hidden"
                    animate="show"
                    className="text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[1.05] tracking-tight text-[#0d1117]"
                    style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
                >
                    Master any subject
                </motion.h1>

                <motion.h1
                    variants={fadeUp}
                    custom={2}
                    initial="hidden"
                    animate="show"
                    className="text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[1.05] tracking-tight"
                    style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
                >
                    <GradientWord text="faster" from="#9055f5" to="#7c4be8" />
                    {' '}
                    <GradientWord text="than" from="#7c4be8" to="#4db8f5" />
                    {' '}
                    <GradientWord text="ever" from="#4db8f5" to="#22d3ee" />
                    <span className="text-[#22d3ee]">.</span>
                </motion.h1>
            </div>

            
            <motion.p
                variants={fadeUp}
                custom={3}
                initial="hidden"
                animate="show"
                className="relative z-10 mt-6 max-w-120 text-center text-[1.05rem] leading-relaxed text-gray-500"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                Connect with world-class educators, master new skills, and achieve your
                academic goals through personalized 1-on-1 sessions.
            </motion.p>

            
            <motion.div
                variants={fadeUp}
                custom={4}
                initial="hidden"
                animate="show"
                className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
            >
                <Link
                    href="/tutors"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#0d1117] px-7 py-3.5 text-[0.95rem] font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#1e2530] hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Find a Tutor
                    <motion.span
                        className="inline-block"
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    >
                        →
                    </motion.span>
                </Link>

                <Link
                    href="/"
                    className="inline-flex items-center rounded-full border border-gray-200 bg-white/70 px-7 py-3.5 text-[0.95rem] font-semibold text-gray-700 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white hover:shadow-md hover:-translate-y-0.5 active:scale-95"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    Become a Tutor
                </Link>
            </motion.div>

            
            <motion.div
                variants={fadeUp}
                custom={5}
                initial="hidden"
                animate="show"
                className="relative z-10 mt-24 text-center"
            >
                <p
                    className="text-[1.3rem] font-bold text-[#0d1117]"
                    style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
                >
                    Everything you need to succeed
                </p>
                <p
                    className="mt-2 text-sm text-gray-500"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                    A comprehensive platform designed for modern learners and expert educators.
                </p>
            </motion.div>
        </section>
    );
}

function GradientWord({ text, from, to }) {
    return (
        <span
            style={{
                background: `linear-gradient(90deg, ${from}, ${to})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}
        >
            {text}
        </span>
    );
}
