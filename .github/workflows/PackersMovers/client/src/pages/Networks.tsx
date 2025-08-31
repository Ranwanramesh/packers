import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Compass, Route } from "lucide-react";

export default function Networks() {
  const networkData = [
    {
      icon: Building2,
      title: "Major Cities",
      cities: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Pune"]
    },
    {
      icon: Compass,
      title: "North India",
      cities: ["Chandigarh", "Gurgaon", "Noida", "Jaipur", "Lucknow", "Amritsar"]
    },
    {
      icon: Route,
      title: "South India", 
      cities: ["Hyderabad", "Coimbatore", "Kochi", "Mysore", "Thiruvananthapuram", "Vizag"]
    }
  ];

  const stats = [
    { number: "100+", label: "Cities Covered" },
    { number: "500+", label: "Partner Locations" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <>
      <Helmet>
        <title>Our Network - Swastik Packers and Movers</title>
        <meta name="description" content="Swastik Packers and Movers service network covers 100+ cities across India with 500+ partner locations and 24/7 support availability." />
      </Helmet>

      <section className="py-16 bg-muted" data-testid="section-networks">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Our Service Network</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We have an extensive network across major cities, ensuring reliable service wherever you need to move
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {networkData.map((network, index) => {
              const IconComponent = network.icon;
              return (
                <Card key={index} className="shadow-md" data-testid={`card-network-${index}`}>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                      <IconComponent className="h-6 w-6 text-primary mr-3" />
                      {network.title}
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {network.cities.map((city, cityIndex) => (
                        <li key={cityIndex} className="flex items-center">
                          <MapPin className="h-4 w-4 text-accent mr-2" />
                          {city}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <Card className="shadow-md max-w-4xl mx-auto" data-testid="card-coverage">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Nationwide Coverage</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Our extensive network covers over 100+ cities across India. We have partnerships with local moving experts in every major city to ensure seamless relocation services no matter where you're moving.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  {stats.map((stat, index) => (
                    <div key={index} data-testid={`stat-${index}`}>
                      <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                      <div className="text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
