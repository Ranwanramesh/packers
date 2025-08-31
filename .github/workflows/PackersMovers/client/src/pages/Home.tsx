import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import InquiryForm from "@/components/InquiryForm";
import { 
  Home as HomeIcon, 
  Building, 
  Car, 
  Package, 
  Truck, 
  Warehouse,
  Clock,
  DollarSign,
  Users,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const services = [
    {
      icon: HomeIcon,
      title: "House Relocation",
      description: "Complete household shifting with professional packing, safe transportation, and careful unpacking at your new home.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Building,
      title: "Office Relocation",
      description: "Seamless business relocation with minimal downtime, specialized equipment handling, and document security.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Car,
      title: "Car Transportation",
      description: "Safe and secure vehicle transportation using specialized carriers and comprehensive insurance coverage.",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Package,
      title: "Packing & Unpacking",
      description: "Professional packing with premium materials and systematic unpacking and arrangement at destination.",
      image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Truck,
      title: "Loading & Unloading",
      description: "Efficient loading and unloading services with modern equipment and trained personnel for safe handling.",
      image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    },
    {
      icon: Warehouse,
      title: "Storage & Warehousing",
      description: "Secure storage facilities with climate control and 24/7 security for short-term and long-term needs.",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    }
  ];

  const features = [
    {
      icon: Clock,
      title: "24x7 Customer Service",
      description: "Round-the-clock support with dedicated move coordinators to guide you through the entire process.",
      color: "bg-primary"
    },
    {
      icon: DollarSign,
      title: "Affordable Pricing",
      description: "Transparent pricing with no hidden charges and flexible payment options for your convenience.",
      color: "bg-secondary"
    },
    {
      icon: Users,
      title: "Trusted Team",
      description: "Trained and experienced staff who handle your belongings with utmost care and professionalism.",
      color: "bg-accent"
    },
    {
      icon: Truck,
      title: "On-Time Delivery",
      description: "Reliable delivery schedules with real-time tracking and updates throughout your move.",
      color: "bg-primary"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Swastik Packers and Movers - Professional Moving Services</title>
        <meta name="description" content="Professional packing and moving services with 24/7 customer support. Safe, reliable, and affordable moving solutions across India." />
      </Helmet>

      {/* Hero Section */}
      <section className="gradient-hero py-20 sm:py-28" data-testid="section-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center hero-content">
            <div className="mb-8">
              <span className="inline-block bg-white/20 text-white px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                🚚 India's Most Trusted Moving Company
              </span>
            </div>
            <h1 className="hero-title text-4xl sm:text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
              Professional Packing &<br className="hidden sm:block" /> Moving Services
            </h1>
            <p className="hero-subtitle text-xl sm:text-2xl mb-12 text-white font-medium max-w-4xl mx-auto leading-relaxed">
              Safe, reliable, and affordable moving solutions with 24/7 customer support.<br className="hidden sm:block" />
              <span className="text-yellow-200 font-semibold">Your trusted partner for stress-free relocation.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 px-12 py-7 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => document.getElementById('inquiry-form')?.scrollIntoView({ behavior: 'smooth' })}
                data-testid="button-get-quote"
              >
                Get Free Quote Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-3 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-primary px-12 py-7 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300"
                asChild
                data-testid="button-call-now"
              >
                <a href="tel:+919992318883">📞 Call Now</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <InquiryForm />

      {/* Services Overview */}
      <section className="py-16 bg-muted" data-testid="section-services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We provide comprehensive moving solutions for all your relocation needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="service-card shadow-md" data-testid={`card-service-${index}`}>
                  <CardContent className="p-6">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="rounded-lg w-full h-48 object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <div className="flex items-center text-primary">
                      <IconComponent className="h-5 w-5 mr-2" />
                      <span className="text-sm font-medium">Professional Service</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted" data-testid="section-features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Why Choose Swastik Packers & Movers
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We are committed to providing exceptional moving services with complete customer satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="text-center" data-testid={`feature-${index}`}>
                  <div className={`${feature.color} text-primary-foreground rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
