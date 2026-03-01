import { Users, Award, Globe, Shield } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Happy Clients', value: '2,500+' },
  { icon: Award, label: 'Awards Won', value: '48' },
  { icon: Globe, label: 'Cities Covered', value: '120+' },
  { icon: Shield, label: 'Years Experience', value: '15' },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="py-20 bg-surface-cool">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">About LuxeEstate</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            For over 15 years, we've been helping families find their dream homes. Our dedication to excellence, integrity, and personalized service sets us apart in the real estate industry.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(s => (
              <div key={s.label} className="text-center p-6 rounded-2xl bg-card shadow-card">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-6 h-6 text-accent" />
                </div>
                <p className="font-display text-2xl md:text-3xl font-bold text-foreground">{s.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-surface-warm">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-6 text-center">Our Story</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Founded in 2010, LuxeEstate began with a simple mission: make the home-buying experience exceptional. What started as a small boutique agency in New York has grown into a nationally recognized real estate firm.
            </p>
            <p>
              Our team of experienced agents combines deep local market knowledge with cutting-edge technology to deliver results. We specialize in luxury properties but serve clients across all price ranges with the same dedication.
            </p>
            <p>
              We believe that finding a home is more than a transaction — it's the beginning of a new chapter. That's why we're committed to understanding your unique needs and guiding you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Our Values</h2>
          <p className="text-muted-foreground mb-12 max-w-lg mx-auto">The principles that guide everything we do</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Integrity', desc: 'We operate with complete transparency and honesty in every transaction.' },
              { title: 'Excellence', desc: 'We strive for the highest standards in service, presentation, and results.' },
              { title: 'Client Focus', desc: 'Your goals are our priority. We listen, understand, and deliver.' },
            ].map(v => (
              <div key={v.title} className="p-8 rounded-2xl bg-card shadow-card">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
