import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { CallItem } from "@/types/calls";
import React from "react";



interface Props {
  call: CallItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CallDetailSheet({ call, open, onOpenChange }: Props) {
  if (!call) return null;

  const renderField = (label: string, value: React.ReactNode) => (
    <div className="py-2.5 border-b last:border-0 flex justify-between items-center text-sm">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value ?? "—"}</span>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Call Details</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-1">
          {renderField("Date & Time", new Date(call.call_timestamp).toLocaleString("en-NP"))}
          {renderField("Direction", call.direction)}
          {renderField("Lead", `${call.lead_name} (${call.lead_reference_number})`)}
          {renderField("Phone Number", call.phone_number)}
          {renderField("Caller", call.caller)}
          {renderField("Logged By", call.created_by_name)}
          {renderField("Duration", call.duration_formatted ?? `${call.duration_seconds}s`)}
          {renderField("Outcome", call.outcome)}
          {renderField("Notes", call.notes)}
          {renderField("Next Action", call.next_action)}
          {renderField("Next Follow-up", call.next_followup_at)}
          {renderField(
            "Recording",
            call.recording_url ? (
              <a href={call.recording_url} target="_blank" rel="noreferrer" className="text-brand underline">
                Play Recording
              </a>
            ) : null
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}