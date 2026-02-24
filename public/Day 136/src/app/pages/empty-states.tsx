import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { EmptyState } from "../components/empty-state";
import { Button } from "../components/ui/button";
import { FileQuestion, Search, Bell, AlertCircle, Inbox } from "lucide-react";

export default function EmptyStates() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-1">Empty States</h1>
        <p className="text-muted-foreground">
          Examples of empty state components
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* No Flagged Content */}
        <Card>
          <CardHeader>
            <CardTitle>No Flagged Content</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Inbox}
              title="All clear!"
              description="No flagged content at the moment. Your community is safe and sound."
              action={
                <Button variant="outline">View Dashboard</Button>
              }
            />
          </CardContent>
        </Card>

        {/* No Search Results */}
        <Card>
          <CardHeader>
            <CardTitle>No Search Results</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Search}
              title="No results found"
              description="Try adjusting your search query or filters to find what you're looking for."
            />
          </CardContent>
        </Card>

        {/* No Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>No Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={Bell}
              title="You're all caught up"
              description="No new notifications right now. We'll let you know when something needs your attention."
            />
          </CardContent>
        </Card>

        {/* No Alerts */}
        <Card>
          <CardHeader>
            <CardTitle>No Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={AlertCircle}
              title="No active alerts"
              description="System is running smoothly with no alerts or warnings."
              action={
                <Button variant="outline">Configure Alerts</Button>
              }
            />
          </CardContent>
        </Card>

        {/* No Data */}
        <Card>
          <CardHeader>
            <CardTitle>No Data Available</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={FileQuestion}
              title="No data to display"
              description="Start moderating content to see analytics and insights appear here."
              action={
                <Button>Get Started</Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
