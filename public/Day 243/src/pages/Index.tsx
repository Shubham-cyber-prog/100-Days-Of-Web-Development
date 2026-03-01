import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, Search, Handshake, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { projects } from "@/data/dummy";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const steps = [
  { icon: Briefcase, title: "Post Your Project", desc: "Describe your project requirements and set your budget." },
  { icon: Search, title: "Get Proposals", desc: "Receive bids from talented freelancers around the world." },
  { icon: Handshake, title: "Hire & Collaborate", desc: "Choose the best freelancer and start working together." },
];

const Index = () => {
  const featuredProjects = projects.filter((p) => p.status === "open").slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsla(0,0%,100%,0.15),transparent_70%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl"
          >
            Find the Perfect Freelancer
            <br />
            for Your Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80"
          >
            Connect with top talent worldwide. Post your project, receive proposals, and hire the best freelancers for your needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link to="/client/dashboard">
              <Button size="lg" variant="secondary" className="rounded-xl text-base font-semibold gap-2 shadow-elevated">
                Post a Project <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/freelancer/dashboard">
              <Button size="lg" variant="outline" className="rounded-xl text-base font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Browse Projects
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-8"
          >
            {[
              { val: "10K+", label: "Freelancers" },
              { val: "25K+", label: "Projects" },
              { val: "4.9", label: "Avg Rating", icon: Star },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-2xl font-bold text-primary-foreground flex items-center justify-center gap-1">
                  {s.val} {s.icon && <s.icon size={18} className="fill-primary-foreground" />}
                </p>
                <p className="text-sm text-primary-foreground/70">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-bold text-foreground">How It Works</h2>
          <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">Get started in three simple steps</p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="rounded-2xl border border-border bg-card p-8 text-center shadow-card transition-all hover:shadow-card-hover"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-accent">
                  <step.icon size={28} className="text-accent-foreground" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-card-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="gradient-hero-subtle py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold text-foreground">Featured Projects</h2>
              <p className="mt-2 text-muted-foreground">Top projects looking for talent</p>
            </div>
            <Link to="/freelancer/dashboard">
              <Button variant="outline" className="hidden sm:inline-flex gap-2">
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
