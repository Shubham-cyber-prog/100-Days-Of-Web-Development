import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock, ArrowRight, Newspaper } from "lucide-react";

export function NewsSection() {
  const featuredNews = [
    {
      id: 1,
      title: "India-ASEAN Summit 2025: Strengthening Regional Partnerships",
      excerpt: "Prime Minister participates in the annual summit focusing on trade, security, and cultural cooperation between India and ASEAN nations.",
      category: "Summit",
      date: "2025-01-28",
      time: "2 hours ago",
      image: "https://images.unsplash.com/photo-1713930517076-18a9fd284cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBsb21hdGljJTIwbWVldGluZyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzU2NDYzNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      featured: true
    },
    {
      id: 2,
      title: "New Consular Services Portal Launched",
      excerpt: "Enhanced digital platform for passport and visa services with improved user experience.",
      category: "Announcement",
      date: "2025-01-27",
      time: "1 day ago"
    },
    {
      id: 3,
      title: "Cultural Exchange Program with Latin America",
      excerpt: "MEA announces new cultural and educational exchange initiatives with Latin American countries.",
      category: "Cultural",
      date: "2025-01-26",
      time: "2 days ago"
    },
    {
      id: 4,
      title: "Emergency Consular Services Update",
      excerpt: "Important information for Indian nationals regarding emergency travel documents.",
      category: "Alert",
      date: "2025-01-25",
      time: "3 days ago"
    }
  ];

  const pressReleases = [
    "Joint Statement: India-France Strategic Partnership",
    "External Affairs Minister's Visit to Middle East",
    "India's Position on Global Climate Action",
    "Bilateral Trade Agreements Update",
    "Diaspora Engagement Policy Announcement"
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Latest News & Updates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay informed about India's diplomatic activities and foreign policy developments
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Featured Article */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden shadow-lg">
              <div className="relative">
                <ImageWithFallback
                  src={featuredNews[0].image}
                  alt={featuredNews[0].title}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red-600 hover:bg-red-700">
                  {featuredNews[0].category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {featuredNews[0].date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredNews[0].time}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3">{featuredNews[0].title}</h3>
                <p className="text-muted-foreground mb-4">{featuredNews[0].excerpt}</p>
                <Button className="bg-primary hover:bg-primary/90">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Recent News List */}
            <div className="mt-8 space-y-4">
              {featuredNews.slice(1).map((news) => (
                <Card key={news.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <Badge variant="outline">{news.category}</Badge>
                          <span className="text-sm text-muted-foreground">{news.time}</span>
                        </div>
                        <h4 className="font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
                          {news.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">{news.excerpt}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Press Releases */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Newspaper className="h-5 w-5 mr-2" />
                  Press Releases
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pressReleases.map((release, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 text-left hover:bg-secondary"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{release}</span>
                    </div>
                  </Button>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Press Releases
                </Button>
              </CardContent>
            </Card>

            {/* Important Announcements */}
            <Card className="bg-orange-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Important Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white rounded border-l-4 border-orange-500">
                    <h5 className="font-medium text-sm">Travel Advisory Update</h5>
                    <p className="text-sm text-muted-foreground">Updated guidelines for international travel</p>
                  </div>
                  <div className="p-3 bg-white rounded border-l-4 border-blue-500">
                    <h5 className="font-medium text-sm">Consular Hours Change</h5>
                    <p className="text-sm text-muted-foreground">Revised timings for consular services</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Announcements
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}