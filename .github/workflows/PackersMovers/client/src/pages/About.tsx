import { Helmet } from "react-helmet";
import { CheckCircle } from "lucide-react";

export default function About() {
  const features = [
    "Licensed and insured moving company",
    "Professional and experienced team", 
    "Modern equipment and vehicles",
    "Comprehensive insurance coverage"
  ];

  return (
    <>
      <Helmet>
        <title>About Us - Swastik Packers and Movers</title>
        <meta name="description" content="Learn about Swastik Packers and Movers, a trusted moving company with years of experience in professional relocation services across India." />
      </Helmet>

      <section className="py-16 bg-background" data-testid="section-about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional moving team" 
                className="rounded-xl shadow-lg w-full h-auto"
                data-testid="img-about-team"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                About Swastik Packers & Movers
              </h1>
              <p className="text-muted-foreground text-lg mb-6">
                With years of experience in the moving industry, Swastik Packers & Movers has established itself as a trusted name in professional relocation services. We understand that moving can be stressful, which is why we're committed to making your relocation as smooth and hassle-free as possible.
              </p>
              <p className="text-muted-foreground text-lg mb-6">
                Our team of trained professionals uses modern equipment and high-quality packing materials to ensure the safety of your belongings. We provide comprehensive services including residential and commercial moving, packing and unpacking, vehicle transportation, and secure storage solutions.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center" data-testid={`feature-${index}`}>
                    <CheckCircle className="h-5 w-5 text-accent mr-3" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-8 shadow-md" data-testid="card-mission">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide exceptional moving and packing services that exceed customer expectations while ensuring the safety and security of their belongings. We strive to make every relocation experience stress-free and memorable.
              </p>
            </div>
            <div className="bg-card rounded-xl p-8 shadow-md" data-testid="card-vision">
              <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground">
                To become India's most trusted and preferred moving company by continuously innovating our services, investing in technology, and maintaining the highest standards of professionalism and customer care.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
