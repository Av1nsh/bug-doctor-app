import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Zap, Code, FileText, Eye, Download, Users, Clock } from 'lucide-react';
import heroImage from '@/assets/security-hero.jpg';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Advanced Security Scanning",
      description: "Deep analysis using industry-standard security patterns and OWASP guidelines",
      badge: "Real-time"
    },
    {
      icon: Zap,
      title: "Instant Vulnerability Detection", 
      description: "Identifies SQL injection, XSS, CSRF, and 50+ other security vulnerabilities",
      badge: "50+ Checks"
    },
    {
      icon: Code,
      title: "Auto-Fix Generation",
      description: "Provides secure code alternatives with detailed explanations for each fix",
      badge: "Smart Fix"
    },
    {
      icon: FileText,
      title: "Multi-Language Support",
      description: "Supports JavaScript, Python, PHP, Java, C++, Go, and many more languages",
      badge: "15+ Languages"
    },
    {
      icon: Eye,
      title: "Line-by-Line Analysis",
      description: "Precise vulnerability location with contextual recommendations",
      badge: "Accurate"
    },
    {
      icon: Download,
      title: "Secure Code Export",
      description: "Download fixed code files ready for production deployment",
      badge: "Production Ready"
    }
  ];

  const stats = [
    { icon: Users, value: "10k+", label: "Developers Protected" },
    { icon: Shield, value: "1M+", label: "Vulnerabilities Fixed" },
    { icon: Clock, value: "< 3s", label: "Analysis Time" },
    { icon: Code, value: "99.9%", label: "Accuracy Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-primary/20 text-primary border-primary/30">
                Enterprise Security Platform
              </Badge>
              
              <h1 className="text-5xl font-bold leading-tight">
                Secure Your Code with
                <span className="bg-gradient-primary bg-clip-text text-transparent"> AI-Powered </span>
                Analysis
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Protect your applications from security vulnerabilities with our advanced static code analysis platform. 
                Upload, analyze, and fix security issues in seconds.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <stat.icon className="h-8 w-8 text-primary" />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage}
                alt="Security analysis dashboard"
                className="w-full h-96 object-cover rounded-2xl shadow-glow animate-pulse-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">
              Why Choose 
              <span className="bg-gradient-primary bg-clip-text text-transparent"> SecureCode </span>
              Analyzer?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines cutting-edge security research with machine learning to provide 
              the most comprehensive code security analysis available.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card border-border shadow-elegant hover:shadow-glow transition-shadow duration-300">
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Standards */}
      <section className="py-16 px-6 bg-muted/5">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h3 className="text-3xl font-bold">Built on Industry Standards</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['OWASP Top 10', 'CWE Database', 'SANS Top 25', 'NIST Guidelines'].map((standard, index) => (
              <div key={index} className="p-6 bg-gradient-card rounded-lg border border-border">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold text-foreground">{standard}</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Compliance with {standard.toLowerCase()} security standards
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;