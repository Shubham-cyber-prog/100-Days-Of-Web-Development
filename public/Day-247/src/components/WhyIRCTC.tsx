import { Card, CardContent } from './ui/card';
import { 
  Clock, 
  Shield, 
  CheckCircle, 
  Award,
  Users,
  Globe,
  Headphones,
  CreditCard
} from 'lucide-react';

export function WhyIRCTC() {
  const features = [
    {
      icon: Clock,
      title: '24/7 Booking',
      description: 'Book tickets anytime, anywhere with our round-the-clock service',
      stats: 'Always Available'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Bank-grade security for all your transactions and personal data',
      stats: '256-bit SSL Encryption'
    },
    {
      icon: CheckCircle,
      title: 'Verified Information',
      description: 'Real-time train schedules, seat availability, and booking confirmations',
      stats: 'Live Updates'
    },
    {
      icon: Award,
      title: 'Government Trusted',
      description: 'Official Indian Railways booking platform trusted by millions',
      stats: 'Since 1999'
    },
    {
      icon: Users,
      title: '2M+ Daily Users',
      description: 'Join millions of satisfied customers booking with confidence',
      stats: '750M+ Bookings'
    },
    {
      icon: Globe,
      title: 'Pan-India Coverage',
      description: 'Access to entire Indian Railways network across the country',
      stats: '7000+ Stations'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Dedicated customer service team to assist you with any queries',
      stats: '24x7 Helpline'
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment Options',
      description: 'Pay via cards, net banking, UPI, wallets, and more payment methods',
      stats: '15+ Options'
    }
  ];

  const stats = [
    { number: '2M+', label: 'Daily Bookings' },
    { number: '750M+', label: 'Total Bookings' },
    { number: '7000+', label: 'Railway Stations' },
    { number: '25+', label: 'Years of Service' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose IRCTC?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            India's most trusted railway booking platform, serving millions of passengers with 
            reliability, security, and convenience for over two decades.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#0058A3] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur border-0"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-[#0058A3] text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="inline-block bg-blue-50 text-[#0058A3] px-3 py-1 rounded-full text-xs font-medium">
                    {feature.stats}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-white/60 backdrop-blur rounded-lg p-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">PCI DSS Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Award className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Government Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}