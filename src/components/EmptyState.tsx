import { Sparkles } from "lucide-react";

const EmptyState = ({ message = "No content yet — add some from the admin dashboard." }: { message?: string }) => (
  <div className="bg-card border border-dashed border-border rounded-2xl p-10 text-center text-muted-foreground">
    <Sparkles className="w-6 h-6 mx-auto mb-3 text-muted-foreground/50" />
    <p className="text-sm">{message}</p>
  </div>
);

export default EmptyState;
