import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

const heroSlides = [
  {
    image: "/images/home/task-planning.png",
    eyebrow: "Plan with clarity",
    title: "Build a focused plan for every productive day.",
    description:
      "Create tasks, set priorities, manage deadlines and keep every responsibility visible in one simple workspace.",
  },
  {
    image: "/images/home/task-dashboard.jpg",
    eyebrow: "Track your progress",
    title: "See what matters and move work forward.",
    description:
      "Use live dashboard information to review pending, active, completed and overdue tasks at a glance.",
  },
  {
    image: "/images/home/productive-workspace.jpg",
    eyebrow: "Work efficiently",
    title: "Turn clear priorities into completed results.",
    description:
      "Search, filter and organize tasks quickly so your attention always stays on the work that matters most.",
  },
];

const productivityMessages = [
  "Start with the task that creates the greatest impact.",
  "Clear priorities create consistent progress.",
  "Small daily improvements produce meaningful results.",
  "Review deadlines before they become overdue.",
];

const metrics = [
  { value: "5", label: "Live dashboard insights" },
  { value: "3", label: "Task priority levels" },
  { value: "100%", label: "Responsive experience" },
];

const overviewItems = [
  {
    number: "01",
    title: "Create",
    description: "Add complete task information in seconds.",
  },
  {
    number: "02",
    title: "Organize",
    description: "Define status, priority and deadline.",
  },
  {
    number: "03",
    title: "Track",
    description: "Monitor progress through live data.",
  },
  {
    number: "04",
    title: "Complete",
    description: "Keep work visible until it is finished.",
  },
];

const features = [
  {
    number: "01",
    title: "Complete task management",
    description:
      "Create, view, update and delete tasks from one clean and focused workspace.",
  },
  {
    number: "02",
    title: "Live dashboard overview",
    description:
      "Monitor total, pending, in-progress, completed and overdue tasks.",
  },
  {
    number: "03",
    title: "Powerful organization",
    description:
      "Search by title and combine status, priority and sorting options.",
  },
  {
    number: "04",
    title: "Responsive experience",
    description:
      "Manage your work comfortably from desktop, tablet or mobile devices.",
  },
];

const workflowSteps = [
  {
    number: "1",
    title: "Sign in securely",
    description:
      "Access your private task workspace using protected authentication.",
  },
  {
    number: "2",
    title: "Create and organize",
    description:
      "Add task details, select a priority, update status and set a due date.",
  },
  {
    number: "3",
    title: "Track and complete",
    description:
      "Review progress and keep tasks updated until the work is completed.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [activeSlide, setActiveSlide] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentIndex) => {
        return (currentIndex + 1) % heroSlides.length;
      });
    }, 5500);

    return () => window.clearInterval(slideTimer);
  }, []);

  useEffect(() => {
    const messageTimer = window.setInterval(() => {
      setMessageIndex((currentIndex) => {
        return (currentIndex + 1) % productivityMessages.length;
      });
    }, 4000);

    return () => window.clearInterval(messageTimer);
  }, []);

  const currentSlide = heroSlides[activeSlide];

  const handlePrimaryAction = () => {
    navigate(isAuthenticated ? "/dashboard" : "/login");
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-950">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-950/35 backdrop-blur-xl">
        <div className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 sm:min-h-[78px] sm:px-8 lg:px-12">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label="Open TaskFlow homepage"
          >
            <img
              src="/images/taskflow.png"
              alt="TaskFlow"
              className="h-9 w-auto max-w-[145px] object-contain sm:h-12 sm:max-w-none"
            />
          </button>

          <nav
            className="hidden items-center gap-8 md:flex"
            aria-label="Main navigation"
          >
            <a
              href="#features"
              className="text-sm font-semibold text-white/75 transition hover:text-white"
            >
              Features
            </a>
            <a
              href="#workflow"
              className="text-sm font-semibold text-white/75 transition hover:text-white"
            >
              How it works
            </a>
            <a
              href="#overview"
              className="text-sm font-semibold text-white/75 transition hover:text-white"
            >
              Overview
            </a>
          </nav>

          <button
            type="button"
            onClick={handlePrimaryAction}
            className="shrink-0 rounded-xl border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            {isAuthenticated ? "Open dashboard" : "Sign in"}
          </button>
        </div>
      </header>

      {/* Dynamic image hero */}
      <section className="relative isolate flex min-h-[720px] items-center overflow-hidden pt-16 sm:min-h-screen sm:pt-[78px]">
        <div className="absolute inset-0 -z-30 bg-slate-950">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              aria-hidden="true"
              className={`taskflow-hero-slide absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url("${slide.image}")` }}
            />
          ))}
        </div>

        <div
  className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/45 via-slate-950/15 to-transparent"
  aria-hidden="true"
/>

<div
  className="absolute inset-0 -z-20 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent"
  aria-hidden="true"
/>
        <div
          className="taskflow-grid-overlay absolute inset-0 -z-10 opacity-20"
          aria-hidden="true"
        />

        <div className="mx-auto grid w-full max-w-[1440px] items-center px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
          <div
            key={activeSlide}
            className="taskflow-hero-copy max-w-4xl"
          >
            <div className="mb-5 sm:mb-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/85 backdrop-blur-md sm:px-4 sm:text-xs">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                Modern task management
              </span>
            </div>

            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.22em] text-violet-300 sm:mb-4 sm:text-sm">
              {currentSlide.eyebrow}
            </p>

            <h1 className="max-w-4xl text-balance text-[2.65rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-8xl">
              {currentSlide.title}
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:mt-7 sm:text-lg sm:leading-8">
              {currentSlide.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-4">
              <button
                type="button"
                onClick={handlePrimaryAction}
                className="w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(79,70,229,0.4)] transition hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(79,70,229,0.52)] sm:w-auto sm:px-7 sm:py-4"
              >
                {isAuthenticated ? "Go to dashboard" : "Start managing tasks"}
              </button>

              <a
                href="#features"
                className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-3.5 text-center text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white hover:text-slate-950 sm:w-auto sm:px-7 sm:py-4"
              >
                Explore features
              </a>
            </div>

            <div className="mt-7 grid max-w-3xl grid-cols-3 gap-2 sm:mt-10 sm:gap-3">
              {metrics.map((metric) => (
                <article
                  key={metric.label}
                  className="min-w-0 rounded-2xl border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:p-4"
                >
                  <strong className="block truncate text-lg font-extrabold text-white sm:text-2xl">
                    {metric.value}
                  </strong>
                  <span className="mt-1 block text-[0.62rem] font-medium leading-4 text-white/65 sm:text-xs sm:leading-5">
                    {metric.label}
                  </span>
                </article>
              ))}
            </div>

            <div className="mt-6 max-w-2xl border-l-2 border-violet-400 pl-4 sm:mt-8">
              <p
                key={messageIndex}
                className="taskflow-message-change text-xs font-semibold leading-5 text-white/70 sm:text-sm sm:leading-6"
              >
                {productivityMessages[messageIndex]}
              </p>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/15 bg-slate-950/35 p-2 backdrop-blur-xl sm:bottom-9">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.eyebrow}
              type="button"
              onClick={() => setActiveSlide(index)}
              aria-label={`Show ${slide.eyebrow}`}
              aria-current={index === activeSlide ? "true" : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeSlide
                  ? "w-10 bg-violet-400"
                  : "w-2.5 bg-white/40 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Overview */}
      <section id="overview" className="relative z-10 -mt-1 scroll-mt-20 bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:grid-cols-2 lg:grid-cols-4">
          {overviewItems.map((item, index) => (
            <article
              key={item.number}
              className={`p-7 lg:p-8 ${
                index < overviewItems.length - 1
                  ? "border-b border-slate-200 sm:border-r lg:border-b-0"
                  : ""
              }`}
            >
              <span className="text-xs font-extrabold tracking-[0.2em] text-violet-600">
                {item.number}
              </span>
              <h2 className="mt-5 text-xl font-extrabold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 bg-slate-50 px-4 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-end gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-violet-600">
                Main capabilities
              </p>
              <h2 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
                Everything required for focused daily task management.
              </h2>
            </div>

            <p className="max-w-xl text-base leading-8 text-slate-500">
              A practical workspace designed to simplify task creation,
              organization and progress tracking without unnecessary complexity.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-7 shadow-[0_16px_50px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(15,23,42,0.12)]"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-100 text-xs font-extrabold text-violet-700">
                  {feature.number}
                </span>

                <h3 className="mt-12 text-xl font-extrabold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {feature.description}
                </p>

                <span className="absolute inset-x-7 bottom-0 h-1 origin-left scale-x-25 rounded-t-full bg-gradient-to-r from-violet-600 to-cyan-500 transition-transform duration-300 group-hover:scale-x-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="scroll-mt-20 bg-slate-50 px-4 pb-20 sm:px-8 sm:pb-24 lg:px-12 lg:pb-32">
        <div className="relative mx-auto grid max-w-[1400px] overflow-hidden rounded-[2.25rem] bg-slate-950 p-7 text-white shadow-[0_35px_100px_rgba(15,23,42,0.2)] sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:p-16">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(124,58,237,0.38),transparent_35%)]"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-violet-300">
              Simple workflow
            </p>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-5xl">
              From sign-in to task completion in three clear steps.
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/65">
              TaskFlow keeps your work organized while maintaining a simple,
              realistic and user-friendly experience.
            </p>

            <button
              type="button"
              onClick={handlePrimaryAction}
              className="mt-8 w-full rounded-2xl bg-white px-6 py-3.5 text-sm font-extrabold text-slate-950 transition hover:-translate-y-1 hover:bg-violet-100 sm:w-auto"
            >
              {isAuthenticated ? "Continue to dashboard" : "Access your workspace"}
            </button>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 lg:mt-0">
            {workflowSteps.map((step) => (
              <article
                key={step.number}
                className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-md transition hover:translate-x-1.5 hover:bg-white/[0.1] sm:p-6"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-sm font-extrabold">
                  {step.number}
                </span>

                <div>
                  <h3 className="text-lg font-extrabold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-4 pb-20 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-10 lg:flex-row lg:items-center lg:p-14">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-violet-600">
              Start working clearly
            </p>
            <h2 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Bring structure and visibility to your daily work.
            </h2>
          </div>

          <button
            type="button"
            onClick={handlePrimaryAction}
            className="w-full shrink-0 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 px-7 py-4 text-sm font-extrabold text-white shadow-[0_18px_45px_rgba(79,70,229,0.28)] transition hover:-translate-y-1 sm:w-auto"
          >
            {isAuthenticated ? "Open TaskFlow" : "Sign in to TaskFlow"}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-4 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
          <img
            src="/images/taskflow.png"
            alt="TaskFlow"
            className="h-11 w-auto object-contain"
          />

          <p className="text-sm text-slate-500">
            All rights reserved.
          </p>

          <span className="text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} TaskFlow
          </span>
        </div>
      </footer>
    </main>
  );
}