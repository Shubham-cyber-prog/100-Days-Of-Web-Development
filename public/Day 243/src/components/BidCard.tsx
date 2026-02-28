import { Star, Clock } from "lucide-react";
import type { Bid } from "@/data/dummy";

const BidCard = ({ bid }: { bid: Bid }) => (
  <div className="rounded-xl border border-border bg-card p-5 shadow-card">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-semibold text-accent-foreground">
        {bid.freelancer.avatar}
      </div>
      <div className="flex-1">
        <p className="font-display text-sm font-semibold text-card-foreground">{bid.freelancer.name}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star size={12} className="fill-warning text-warning" />
          {bid.freelancer.rating}
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-lg font-bold text-primary">{bid.amount}</p>
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><Clock size={12} />{bid.deliveryTime}</p>
      </div>
    </div>
    <p className="mt-3 text-sm text-muted-foreground">{bid.proposal}</p>
  </div>
);

export default BidCard;
