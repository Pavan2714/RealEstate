import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'Personal Information: Name, email address, phone number, and address when you register or use our services.',
        'Property Preferences: Your search criteria, favorite properties, and interaction history.',
        'Technical Information: IP address, browser type, device information, and usage patterns.',
        'Communication Data: Records of your communications with us, including support requests.'
      ]
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our real estate services',
        'To match you with relevant properties and send personalized recommendations',
        'To communicate with you about properties, services, and updates',
        'To process transactions and provide customer support',
        'To comply with legal obligations and prevent fraud'
      ]
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share information with property owners/agents when you express interest in their properties.',
        'We may share data with our trusted service providers who help us operate our platform.',
        'We may disclose information if required by law or to protect our rights and safety.'
      ]
    },
    {
      title: 'Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your data.',
        'Your personal information is stored on secure servers with encryption.',
        'We regularly review and update our security practices.',
        'However, no method of transmission over the internet is 100% secure.'
      ]
    },
    {
      title: 'Your Rights',
      content: [
        'Access: You can request access to your personal information.',
        'Correction: You can request correction of inaccurate information.',
        'Deletion: You can request deletion of your personal information.',
        'Portability: You can request a copy of your data in a structured format.',
        'Objection: You can object to certain processing of your personal information.'
      ]
    },
    {
      title: 'Cookies',
      content: [
        'We use cookies to enhance your browsing experience.',
        'Cookies help us remember your preferences and provide personalized content.',
        'You can control cookie settings through your browser.',
        'Some features may not work properly if cookies are disabled.'
      ]
    },
    {
      title: 'Third-Party Links',
      content: [
        'Our website may contain links to third-party websites.',
        'We are not responsible for the privacy practices of these external sites.',
        'We encourage you to read the privacy policies of any linked websites.'
      ]
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this Privacy Policy from time to time.',
        'We will notify you of any material changes via email or website notice.',
        'Your continued use of our services constitutes acceptance of the updated policy.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            
          </div>
        </section>

        {/* Privacy Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl shadow-card p-8 md:p-12">
                {/* Introduction */}
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Introduction
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Nivaas360 is committed to protecting your privacy and personal information. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                    visit our website, use our mobile application, or engage with our services. Please read this privacy 
                    policy carefully. If you do not agree with the terms of this privacy policy, please do not access 
                    the site or use our services.
                  </p>
                </div>

                {/* Privacy Sections */}
                <div className="space-y-12">
                  {sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-xl font-bold text-foreground mb-4">
                        {section.title}
                      </h3>
                      <ul className="space-y-3">
                        {section.content.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-muted-foreground leading-relaxed">
                            {item.includes(':') ? (
                              <>
                                <strong className="text-foreground">
                                  {item.split(':')[0]}:
                                </strong>
                                {item.split(':').slice(1).join(':')}
                              </>
                            ) : (
                              <span>• {item}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Contact Information */}
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    Contact Us
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    If you have any questions or concerns about this Privacy Policy or our data practices, 
                    please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong className="text-foreground">Email:</strong> nivaas360@gmail.com</p>
                    <p><strong className="text-foreground">Phone:</strong> +91 98765 43210</p>
                    <p><strong className="text-foreground">Address:</strong> 123 Business Center, vadodara, Gujarat 390019</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;