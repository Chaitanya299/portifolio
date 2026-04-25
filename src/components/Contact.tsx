import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Send, Check, AlertCircle, Terminal, Copy } from "lucide-react";
import { PORTFOLIO } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEmailAction } from "@/hooks/use-email";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(80, "Too long"),
  email: z.string().trim().email("Invalid email").max(160),
  message: z.string().trim().min(10, "At least 10 characters").max(1000, "Too long"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

export function Contact() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [mounted, setMounted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submitInquiry = useMutation(api.portfolio.submitInquiry);
  const { handleEmailClick } = useEmailAction();

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      honeypot: String(fd.get("website") ?? ""),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FieldErrors;
        if (k && !next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast.error("Please check the form for errors");
      return;
    }

    setErrors({});
    setStatus("sending");
    const toastId = toast.loading("Sending your inquiry...");

    try {
      const result = await submitInquiry({
        name: data.name,
        email: data.email,
        message: data.message,
        honeypot: data.honeypot,
      });

      if (result.success) {
        setStatus("sent");
        toast.success("Inquiry received! I'll get back to you soon.", { id: toastId });
        formRef.current?.reset();
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("idle");
        toast.error("Submission failed. Please try again or email directly.", { id: toastId });
      }
    } catch (err: unknown) {
      console.error(err);
      setStatus("idle");
      const errorMessage = (err instanceof Error && err.message?.includes("Rate limit"))
        ? "Too many requests. Please try again in an hour."
        : "Failed to send. Please try the email link below.";
      toast.error(errorMessage, { id: toastId });
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO.email);
    toast.success("Email address copied to clipboard!");
  };

  if (!mounted) return null;

  return (
    <section id="contact" className="relative scroll-mt-24 px-4 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary">
            / 05 : Inquiry
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl font-display">
            Have a problem worth solving? <span className="text-primary">Let&apos;s talk.</span>
          </h2>
          <p className="mt-3 text-muted-foreground">
            Freelance & contract availability: typically reply within 24 hours.
          </p>
        </motion.div>

        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-border bg-card/60 p-6 sm:p-8"
        >
          <input type="text" name="website" className="hidden" aria-hidden="true" tabIndex={-1} />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" name="name" placeholder="Ada Lovelace" error={errors.name} />
            <Field label="Email" name="email" type="email" placeholder="ada@example.com" error={errors.email} />
          </div>
          <Field
            label="Message"
            name="message"
            placeholder="Tell me about the project, scope, and timeline…"
            textarea
            error={errors.message}
          />
          <div className="flex items-center justify-between gap-3 pt-2">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleEmailClick}
                className="font-mono text-xs text-muted-foreground hover:text-white transition-colors"
              >
                email directly →
              </button>
              <button
                type="button"
                onClick={copyToClipboard}
                className="font-mono text-xs text-muted-foreground hover:text-white transition-colors flex items-center gap-1"
              >
                <Copy className="h-3 w-3" /> copy address
              </button>
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:glow-amber disabled:opacity-60"
            >
              {status === "sent" ? (
                <>
                  <Check className="h-4 w-4 text-black" /> <span className="text-black">Sent</span>
                </>
              ) : (
                <>
                  {status === "sending" ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  ) : (
                    <Send className="h-4 w-4 text-black" />
                  )}
                  <span className="text-black">{status === "sending" ? "Preparing..." : "Send inquiry"}</span>
                </>
              )}
            </button>
          </div>
        </motion.form>

        <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-3 font-mono text-[11px] text-muted-foreground">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span>tip: try</span>
          <button
            onClick={() => {
              const url = `curl ${window.location.origin}/api/me.json`;
              navigator.clipboard.writeText(url);
              toast.success("Command copied!");
            }}
            className="rounded bg-background/80 px-1.5 py-0.5 text-foreground hover:text-primary transition-colors font-mono"
          >
            curl /api/me.json
          </button>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  placeholder,
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base =
    "w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20";
  return (
    <label className={textarea ? "block" : ""}>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {error && (
          <span className="flex items-center gap-1 font-mono text-[10px] text-destructive">
            <AlertCircle className="h-3 w-3" /> {error}
          </span>
        )}
      </div>
      {textarea ? (
        <textarea name={name} rows={5} required={required} placeholder={placeholder} className={base} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}
