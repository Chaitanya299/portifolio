import { toast } from "sonner";
import { PORTFOLIO } from "@/lib/portfolio-data";

export function useEmailAction() {
  const handleEmailClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    // 1. Initial status
    toast.info("Opening your email client...");

    // 2. Proactive copy (Immediate)
    try {
      navigator.clipboard.writeText(PORTFOLIO.email);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }

    // 3. Trigger mailto protocol
    window.location.href = `mailto:${PORTFOLIO.email}`;

    // 4. Fallback confirmation (Delayed to match UX of "attempting" to open)
    setTimeout(() => {
      toast.success("Address copied to clipboard", {
        description: "Fallback enabled in case your mail client didn't launch."
      });
    }, 2000);
  };

  return { handleEmailClick };
}
