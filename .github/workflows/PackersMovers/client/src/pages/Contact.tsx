import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call us anytime for immediate assistance",
      content: "+91-9992318883",
      href: "tel:+919992318883",
      color: "bg-primary"
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us your queries and requirements",
      content: "info@swastikpackersandmovers.com",
      href: "mailto:info@swastikpackersandmovers.com",
      color: "bg-secondary"
    },
    {
      icon: MapPin,
      title: "Office Address",
      description: "Visit our office for in-person consultations",
      content: "123 Business Center, Commercial Street, Mumbai - 400001, India",
      href: null,
      color: "bg-accent"
    },
    {
      icon: Clock,
      title: "Working Hours",
      description: "We're available 24/7 for emergencies",
      content: "Mon-Fri: 9:00 AM - 8:00 PM | Sat-Sun: 10:00 AM - 6:00 PM",
      href: null,
      color: "bg-primary"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - Swastik Packers and Movers</title>
        <meta name="description" content="Contact Swastik Packers and Movers for professional moving services. Get in touch via phone, email, or visit our office. 24/7 customer support available." />
      </Helmet>

      <section className="py-16 bg-background" data-testid="section-contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Contact Us</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Get in touch with us for any queries or to schedule your move. We're here to help you 24/7
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <div className="space-y-8">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4" data-testid={`contact-info-${index}`}>
                      <div className={`${info.color} text-primary-foreground rounded-lg p-3`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                        <p className="text-muted-foreground mb-2">{info.description}</p>
                        {info.href ? (
                          <a 
                            href={info.href} 
                            className="text-primary hover:text-primary/80 font-medium"
                            data-testid={`link-${info.title.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {info.content}
                          </a>
                        ) : (
                          <div className="text-foreground">
                            {info.title === "Working Hours" ? (
                              <>
                                <div>Mon - Fri: 9:00 AM - 8:00 PM</div>
                                <div>Sat - Sun: 10:00 AM - 6:00 PM</div>
                                <div className="text-primary font-medium">Emergency: 24/7</div>
                              </>
                            ) : (
                              <address className="not-italic">{info.content}</address>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Office Location Map */}
            <Card className="shadow-lg" data-testid="card-office-map">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-foreground mb-6">Our Office Location</h3>
                <div className="bg-muted rounded-lg h-64 sm:h-80 flex items-center justify-center border-2 border-dashed border-border" data-testid="map-placeholder">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground text-lg">Interactive Map</p>
                    <p className="text-muted-foreground text-sm">Office location map will be displayed here</p>
                  </div>
                </div>
                <div className="mt-6 bg-accent/10 rounded-lg p-4" data-testid="location-info">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Visit Our Office</h4>
                      <address className="text-muted-foreground not-italic">
                        123 Business Center<br />
                        Commercial Street<br />
                        Mumbai - 400001, India
                      </address>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
