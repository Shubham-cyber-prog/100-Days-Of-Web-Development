import { DashboardCard } from '../components/DashboardCard';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Book, Search, Clock, AlertCircle, CheckCircle2, BookOpen } from 'lucide-react';

const borrowedBooks = [
  {
    id: 1,
    title: 'Introduction to Algorithms',
    author: 'Cormen, Leiserson, Rivest, Stein',
    isbn: '978-0262033848',
    borrowDate: 'Feb 1, 2026',
    dueDate: 'Feb 29, 2026',
    status: 'active',
    daysRemaining: 8,
  },
  {
    id: 2,
    title: 'Database System Concepts',
    author: 'Silberschatz, Korth, Sudarshan',
    isbn: '978-0078022159',
    borrowDate: 'Feb 10, 2026',
    dueDate: 'Mar 10, 2026',
    status: 'active',
    daysRemaining: 17,
  },
  {
    id: 3,
    title: 'Computer Networks',
    author: 'Andrew S. Tanenbaum',
    isbn: '978-0132126953',
    borrowDate: 'Jan 15, 2026',
    dueDate: 'Feb 15, 2026',
    status: 'overdue',
    daysOverdue: 6,
  },
];

const availableBooks = [
  {
    id: 1,
    title: 'Operating System Concepts',
    author: 'Silberschatz, Galvin, Gagne',
    isbn: '978-1118063330',
    category: 'Computer Science',
    available: 3,
    total: 5,
  },
  {
    id: 2,
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell, Peter Norvig',
    isbn: '978-0134610993',
    category: 'AI & ML',
    available: 2,
    total: 4,
  },
  {
    id: 3,
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    category: 'Software Engineering',
    available: 5,
    total: 6,
  },
  {
    id: 4,
    title: 'Design Patterns',
    author: 'Gang of Four',
    isbn: '978-0201633610',
    category: 'Software Engineering',
    available: 1,
    total: 3,
  },
  {
    id: 5,
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    isbn: '978-0135957059',
    category: 'Software Engineering',
    available: 4,
    total: 5,
  },
  {
    id: 6,
    title: 'Computer Organization and Design',
    author: 'Patterson, Hennessy',
    isbn: '978-0124077263',
    category: 'Computer Architecture',
    available: 0,
    total: 4,
  },
];

const reservedBooks = [
  {
    id: 1,
    title: 'Software Engineering: A Practitioner\'s Approach',
    author: 'Roger S. Pressman',
    reservedDate: 'Feb 18, 2026',
    estimatedAvailability: 'Feb 25, 2026',
  },
];

export function Library() {
  const totalBorrowed = borrowedBooks.filter(b => b.status === 'active').length;
  const overdueCount = borrowedBooks.filter(b => b.status === 'overdue').length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-secondary mb-2">Library Resources</h1>
        <p className="text-muted-foreground">Browse and manage your library books</p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or ISBN..."
            className="pl-10 h-11 rounded-xl"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90 rounded-xl">
          Search
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard title="Books Borrowed" className="bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <span className="text-4xl font-semibold text-secondary">{totalBorrowed}</span>
          </div>
        </DashboardCard>

        <DashboardCard title="Overdue">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <span className="text-4xl font-semibold text-destructive">{overdueCount}</span>
          </div>
        </DashboardCard>

        <DashboardCard title="Reserved">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <span className="text-4xl font-semibold text-secondary">{reservedBooks.length}</span>
          </div>
        </DashboardCard>

        <DashboardCard title="Borrowing Limit">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-muted-foreground" />
            </div>
            <span className="text-4xl font-semibold text-secondary">{totalBorrowed}/5</span>
          </div>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardCard title="Currently Borrowed">
            <div className="space-y-3">
              {borrowedBooks.map((book) => (
                <div
                  key={book.id}
                  className={`p-4 rounded-xl border ${
                    book.status === 'overdue'
                      ? 'bg-destructive/5 border-destructive/20'
                      : 'bg-white border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1 min-w-0">
                      <div className="w-12 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Book className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-secondary mb-1">{book.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">ISBN: {book.isbn}</Badge>
                          {book.status === 'overdue' ? (
                            <Badge className="bg-destructive hover:bg-destructive text-xs">
                              {book.daysOverdue} days overdue
                            </Badge>
                          ) : (
                            <Badge className="bg-accent hover:bg-accent text-xs">
                              {book.daysRemaining} days left
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="text-sm font-medium text-secondary">{book.dueDate}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-xl">
                        Renew
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>

          <DashboardCard title="Available Books">
            <div className="space-y-3">
              {availableBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-start justify-between gap-4 p-4 rounded-xl hover:bg-muted transition-colors"
                >
                  <div className="flex gap-4 flex-1 min-w-0">
                    <div className="w-12 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Book className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-secondary mb-1">{book.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{book.author}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{book.category}</Badge>
                        <Badge 
                          className={`text-xs ${
                            book.available > 0
                              ? 'bg-accent hover:bg-accent'
                              : 'bg-muted hover:bg-muted text-muted-foreground'
                          }`}
                        >
                          {book.available > 0 
                            ? `${book.available}/${book.total} available`
                            : 'Not available'
                          }
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button 
                    className={`rounded-xl flex-shrink-0 ${
                      book.available > 0
                        ? 'bg-primary hover:bg-primary/90'
                        : 'bg-muted hover:bg-muted text-muted-foreground'
                    }`}
                    disabled={book.available === 0}
                  >
                    {book.available > 0 ? 'Borrow' : 'Reserve'}
                  </Button>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-6">
          <DashboardCard title="Reserved Books">
            {reservedBooks.length > 0 ? (
              <div className="space-y-3">
                {reservedBooks.map((book) => (
                  <div
                    key={book.id}
                    className="p-4 rounded-xl bg-accent/10 border border-accent/20"
                  >
                    <div className="flex items-start gap-2 mb-3">
                      <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-secondary mb-1">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Reserved</span>
                        <span className="text-secondary">{book.reservedDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Est. Available</span>
                        <span className="text-accent font-medium">{book.estimatedAvailability}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 rounded-xl">
                      Cancel Reservation
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                No reserved books
              </p>
            )}
          </DashboardCard>

          <DashboardCard title="Library Info">
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-muted">
                <p className="text-sm font-medium text-secondary mb-1">Opening Hours</p>
                <p className="text-xs text-muted-foreground">Mon-Fri: 8:00 AM - 10:00 PM</p>
                <p className="text-xs text-muted-foreground">Sat-Sun: 9:00 AM - 6:00 PM</p>
              </div>
              <div className="p-3 rounded-xl bg-muted">
                <p className="text-sm font-medium text-secondary mb-1">Borrowing Period</p>
                <p className="text-xs text-muted-foreground">14 days (renewable once)</p>
              </div>
              <div className="p-3 rounded-xl bg-muted">
                <p className="text-sm font-medium text-secondary mb-1">Late Fee</p>
                <p className="text-xs text-muted-foreground">$0.50 per day</p>
              </div>
              <div className="p-3 rounded-xl bg-muted">
                <p className="text-sm font-medium text-secondary mb-1">Contact</p>
                <p className="text-xs text-muted-foreground">library@university.edu</p>
                <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
          </DashboardCard>

          <DashboardCard title="Reading Stats">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Books this semester</span>
                <span className="font-semibold text-secondary">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total borrowed</span>
                <span className="font-semibold text-secondary">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Avg. reading time</span>
                <span className="font-semibold text-secondary">9 days</span>
              </div>
              <div className="pt-3 border-t border-border">
                <div className="flex items-center gap-2 text-accent">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Active Reader</span>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
