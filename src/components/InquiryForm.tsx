"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Send } from "lucide-react";

export function InquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    // Integration placeholder
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <Card className="max-w-xl mx-auto border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/50">
      <CardHeader>
        <CardTitle>Freelance Inquiry</CardTitle>
        <CardDescription>
          Have a project in mind? Let&apos;s build something exceptional together.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {status === "success" ? (
          <div className="py-8 text-center space-y-2">
            <h3 className="text-xl font-bold">Message Sent!</h3>
            <p className="text-zinc-500">I&apos;ll get back to you within 24-48 hours.</p>
            <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">
              Send another
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Project Opportunity" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project, goals, and timeline..."
                className="min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : (
                <>
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
