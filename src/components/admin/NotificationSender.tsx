import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send } from "lucide-react";

const NotificationSender = () => {
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const message = formData.get("message") as string;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast.error("You must be logged in");
      setSending(false);
      return;
    }

    const { error } = await supabase.from("notifications").insert({
      title,
      message,
      created_by: user.id,
    });

    if (error) {
      toast.error("Failed to send notification");
      console.error(error);
    } else {
      toast.success("Notification sent successfully!");
      (e.target as HTMLFormElement).reset();
    }

    setSending(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Send Push Notification</CardTitle>
          <CardDescription>
            Broadcast a message to all app users about promotions or new items
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Notification Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="New Coffee Blend Available!"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Try our new Ethiopian blend, available now for a limited time..."
                rows={4}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={sending}>
              <Send className="h-4 w-4 mr-2" />
              {sending ? "Sending..." : "Send Notification"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSender;
