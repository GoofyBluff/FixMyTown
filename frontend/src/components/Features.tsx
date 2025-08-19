import { BarChart3, Camera, MapPin, Shield, Users, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const Features = () => {
  const features = [
    {
      icon: Camera,
      title: "Crystal-Clear Photo Reports",
      description:
        "Snap and upload detailed images of civic issues with automatic tagging for faster identification and resolution.",
      color: "text-blue-500",
    },
    {
      icon: MapPin,
      title: "Pinpoint GPS Accuracy",
      description:
        "Every report is geo-tagged with exact coordinates, ensuring city teams know exactly where action is needed.",
      color: "text-green-500",
    },
    {
      icon: Users,
      title: "Community Connection",
      description:
        "Collaborate with neighbors, follow ongoing cases, and celebrate solved issues together.",
      color: "text-purple-500",
    },
    {
      icon: Zap,
      title: "Live Progress Tracking",
      description:
        "Stay informed with instant status updates and progress milestones in real time.",
      color: "text-orange-500",
    },
    {
      icon: Shield,
      title: "Smart Admin Hub",
      description:
        "Empower authorities with a streamlined dashboard to manage, assign, and resolve reports efficiently.",
      color: "text-red-500",
    },
    {
      icon: BarChart3,
      title: "Actionable Insights",
      description:
        "Get the big picture with analytics that reveal trends, bottlenecks, and areas for improvement.",
      color: "text-indigo-500",
    },
  ];

  return (
    <section id="features" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Tools That Empower Communities
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A complete suite designed to help citizens report, monitor, and
            resolve issues — while giving administrators the insights they need.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index} // ✅ works with the function variant now
            >
              <Card className="backdrop-blur-md bg-white/70 border border-white/30 shadow-lg rounded-2xl p-6 ring-1 ring-white/20 transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl">
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-background flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
