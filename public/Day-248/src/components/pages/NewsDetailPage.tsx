import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Calendar, 
  Clock, 
  User,
  Share2,
  Printer,
  Download,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail
} from "lucide-react";
import { Page } from "../Router";

interface NewsDetailPageProps {
  setCurrentPage: (page: Page) => void;
  newsId?: string;
}

export function NewsDetailPage({ setCurrentPage, newsId }: NewsDetailPageProps) {
  // Sample article data - in a real app, this would be fetched based on newsId
  const article = {
    id: 1,
    title: "India-ASEAN Summit 2025: Strengthening Regional Partnerships for Sustainable Development",
    subtitle: "Prime Minister's participation marks a new chapter in India's Look East Policy",
    content: `
      <p>The India-ASEAN Summit 2025, held in Jakarta, Indonesia, witnessed unprecedented cooperation between India and the Association of Southeast Asian Nations (ASEAN) member countries. Prime Minister Narendra Modi's participation in the summit underscored India's commitment to the Look East Policy and its evolution into the Act East Policy.</p>

      <p>During the summit, several key agreements were signed focusing on trade, security cooperation, cultural exchange, and sustainable development. The discussions centered around enhancing connectivity, promoting digital transformation, and addressing climate change challenges collectively.</p>

      <h3>Key Outcomes of the Summit</h3>
      
      <p><strong>Trade and Economic Cooperation:</strong> The summit resulted in the signing of multiple bilateral trade agreements aimed at reducing tariffs and enhancing market access. The combined trade volume between India and ASEAN countries is expected to reach $300 billion by 2030, a significant increase from the current $100 billion.</p>

      <p><strong>Security and Defense Partnership:</strong> A comprehensive framework for maritime security cooperation was established, focusing on ensuring safe passage through critical sea lanes and combating piracy and terrorism in the region.</p>

      <p><strong>Cultural and Educational Exchange:</strong> New initiatives for student and faculty exchange programs were announced, along with the establishment of Indian cultural centers in key ASEAN cities.</p>

      <h3>Prime Minister's Address</h3>

      <p>In his keynote address, Prime Minister Modi emphasized India's commitment to being a reliable partner in the region's development journey. "India and ASEAN share not just geographical proximity but also common values of democracy, diversity, and development," he stated.</p>

      <p>The Prime Minister also announced India's contribution of $50 million to the ASEAN-India Cooperation Fund for supporting various development projects across member nations.</p>

      <h3>Future Roadmap</h3>

      <p>The summit concluded with the adoption of the Jakarta Declaration, which outlines a comprehensive roadmap for India-ASEAN cooperation over the next five years. Key focus areas include:</p>

      <ul>
        <li>Digital transformation and technology cooperation</li>
        <li>Sustainable agriculture and food security</li>
        <li>Renewable energy and climate action</li>
        <li>Healthcare collaboration and pandemic preparedness</li>
        <li>People-to-people connectivity and tourism promotion</li>
      </ul>

      <p>The next India-ASEAN Summit is scheduled to be held in New Delhi in 2026, marking 35 years of diplomatic relations between India and ASEAN.</p>
    `,
    category: "Diplomatic Relations",
    date: "2025-01-28",
    time: "2 hours ago",
    author: "MEA Press Division",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1713930517076-18a9fd284cfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXBsb21hdGljJTIwbWVldGluZyUyMGNvbmZlcmVuY2V8ZW58MXx8fHwxNzU2NDYzNzk5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["ASEAN", "Diplomacy", "Trade", "Summit", "Southeast Asia"]
  };

  const relatedArticles = [
    {
      id: 2,
      title: "External Affairs Minister's Visit to Singapore",
      date: "2025-01-25",
      category: "Diplomatic Relations"
    },
    {
      id: 3,
      title: "India-Thailand Defense Cooperation Agreement",
      date: "2025-01-22",
      category: "Defense"
    },
    {
      id: 4,
      title: "ASEAN-India Business Council Meeting",
      date: "2025-01-20",
      category: "Trade & Commerce"
    }
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container mx-auto px-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => setCurrentPage('home')}
                  className="cursor-pointer hover:text-primary"
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink 
                  onClick={() => setCurrentPage('news')}
                  className="cursor-pointer hover:text-primary"
                >
                  News & Media
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Article</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <article className="lg:col-span-3">
            {/* Back Button */}
            <Button 
              variant="outline" 
              onClick={() => setCurrentPage('news')}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to News
            </Button>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge>{article.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground space-x-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {article.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {article.readTime}
                  </span>
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {article.author}
                  </span>
                </div>
              </div>
              
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              
              {article.subtitle && (
                <p className="text-xl text-muted-foreground mb-6">{article.subtitle}</p>
              )}

              {/* Share Buttons */}
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-sm font-medium">Share:</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <ImageWithFallback
                src={article.image}
                alt={article.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div 
                dangerouslySetInnerHTML={{ __html: article.content }}
                className="space-y-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-8 [&>h3]:mb-4 [&>p]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc [&>li]:mb-2"
              />
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h4 className="font-medium mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <Badge key={index} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Author Info */}
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-2">{article.author}</h4>
                  <p className="text-muted-foreground text-sm">
                    The MEA Press Division is responsible for disseminating information about India's foreign policy, diplomatic activities, and international relations to the media and public.
                  </p>
                </div>
              </div>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Related Articles */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((related) => (
                    <div key={related.id} className="pb-4 border-b last:border-b-0 last:pb-0">
                      <h4 
                        className="font-medium text-sm mb-2 hover:text-primary cursor-pointer transition-colors line-clamp-2"
                        onClick={() => setCurrentPage('news-detail')}
                      >
                        {related.title}
                      </h4>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {related.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{related.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => setCurrentPage('news')}
                >
                  View All News
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start h-auto p-2 text-left">
                    Press Releases
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-auto p-2 text-left">
                    Media Advisories
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-auto p-2 text-left">
                    Photo Gallery
                  </Button>
                  <Button variant="ghost" className="w-full justify-start h-auto p-2 text-left">
                    Video Archive
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold mb-3">Stay Updated</h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  Subscribe to our newsletter for the latest diplomatic updates
                </p>
                <Button variant="secondary" className="w-full">
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </main>
  );
}