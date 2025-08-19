import { ArrowRight, Camera, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Hero = () => {
  const { user } = useAuth();

  const reportLink = user?.role === "citizen"
    ? "/citizen/create-issue"
    : user?.role === "admin"
    ? "/admin"
    : "/signin";

  const reportsPageLink = user?.role === "citizen" ? "/citizen" : "/admin";

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-16 mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text & CTA */}
          <div className="space-y-8 animate-slide-in-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Report Issues,
                <br />
                <span className="text-white bg-clip-text civic-gradient px-2 rounded-lg">
                  Transform
                </span>
                <br />
                Your Community
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Help build safer, cleaner neighborhoods by reporting
                infrastructure issues. From potholes to broken streetlights,
                your voice matters.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={reportLink}>
                <Button
                  size="lg"
                  className="relative civic-gradient border-0 text-white flex items-center space-x-2 cursor-pointer 
                    overflow-hidden px-6 py-3 shadow-lg 
                    transition-all duration-300 ease-out
                    hover:scale-[1.04] hover:shadow-xl group"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-white/20 translate-x-[-150%] skew-x-12 
                      group-hover:translate-x-[150%] transition-transform duration-700 ease-out"
                  />
                  <Camera className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  <span className="relative z-10">Report an Issue</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to={reportsPageLink}>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <MapPin className="h-5 w-5 text-sky-500" />
                  <span>View Reports</span>
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t">
              {[
                { value: "2,847", label: "Issues Resolved" },
                { value: "15,239", label: "Active Citizens" },
                { value: "48h", label: "Avg Response" },
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-2xl font-bold text-sky-500">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=800&h=600&fit=crop"
                alt="Infrastructure and community"
                className="w-full h-[500px] object-cover transition-all duration-700 ease-[cubic-bezier(.2,.8,.2,1)] will-change-transform
                  group-hover:scale-[1.06] group-hover:rotate-[0.6deg] group-hover:brightness-95"
              />

              {/* Hover gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10 opacity-0
                  transition-opacity duration-700 ease-out group-hover:opacity-100"
              />

              {/* Shine sweep */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-white/10 blur-md opacity-0
                  transition-opacity duration-700 group-hover:opacity-100 group-hover:animate-hero-shine"
              />

              {/* Floating cards */}
              <div
                aria-hidden="true"
                className="absolute top-6 left-6 bg-white/70 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4
                  transition-all duration-500 ease-out
                  group-hover:translate-y-1 group-hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full shadow-[0_0_10px_2px_rgba(34,197,94,0.6)]" />
                  <span className="text-sm font-medium text-gray-800">Issue Reported</span>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="absolute bottom-6 right-6 bg-white/70 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-4
                  transition-all duration-500 ease-out delay-100
                  group-hover:-translate-y-1 group-hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-gray-800">Community Active</span>
                </div>
              </div>

              {/* Soft focus ring */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 ring-0 ring-white/0 group-hover:ring-1 group-hover:ring-white/30
                  transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
