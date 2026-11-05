"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Calendar, CheckCircle2, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { serviceBooking } from "../_actions/serviceBooking";

interface BookingSlot {
  id: string;
  date: string;
  startsAt: string;
  endsAt: string;
  note?: string | null;
  isAvailable: boolean;
}

interface BookingContextValue {
  openBooking: (slotId?: string) => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

function useBooking() {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("Booking controls must be used inside BookingProvider");
  }
  return value;
}

const omanTime = {
  timeZone: "Asia/Muscat",
  hour: "2-digit",
  minute: "2-digit",
} as const;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-GB", {
    timeZone: "Asia/Muscat",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("en-GB", omanTime);
}

export function BookingProvider({
  serviceId,
  slots,
  children,
}: {
  serviceId: string;
  slots: BookingSlot[];
  children: ReactNode;
}) {
  const router = useRouter();
  const availableSlots = slots.filter((slot) => slot.isAvailable);
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [pending, setPending] = useState(false);

  const openBooking = (slotId?: string) => {
    setSelectedSlot(slotId ?? null);
    setOpen(true);
  };

  const handleContinue = async () => {
    if (!selectedSlot || pending) return;

    setPending(true);
    try {
      const result = await serviceBooking({
        serviceId,
        note,
        bookingSlotIds: [selectedSlot],
      });

      if (!result.success) {
        toast.error(result.message || "Could not book this slot.");
        if (/not logged in|unauthorized/i.test(result.message || "")) {
          router.push("/login");
        }
        return;
      }

      toast.success("Booking created.");
      setOpen(false);
      router.push("/dashboard/booking-success");
    } finally {
      setPending(false);
    }
  };

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          if (pending) return;
          setOpen(value);
          if (!value) setSelectedSlot(null);
        }}
      >
        <DialogContent className="flex max-h-[90dvh] w-full max-w-lg flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
          <DialogHeader className="px-4 pt-4 pr-12">
            <DialogTitle>Select a booking slot</DialogTitle>
            <DialogDescription>
              Choose one available time, then continue.
            </DialogDescription>
          </DialogHeader>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => {
                const isSelected = selectedSlot === slot.id;
                return (
                  <button
                    key={slot.id}
                    type="button"
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`w-full rounded-xl border p-4 text-left transition-colors ${
                      isSelected
                        ? "border-green-600 bg-green-50 ring-2 ring-green-500 dark:border-green-500 dark:bg-green-950/30"
                        : "border-border hover:border-green-500 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 font-semibold">
                          <Calendar className="h-4 w-4" />
                          {formatDate(slot.date)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {formatTime(slot.startsAt)} – {formatTime(slot.endsAt)}
                        </div>
                        {slot.note ? (
                          <p className="text-sm text-muted-foreground">{slot.note}</p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-3">
                        {isSelected ? (
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                        ) : null}
                        <Badge className="bg-green-600 text-white hover:bg-green-600">
                          Available
                        </Badge>
                      </div>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="rounded-lg border border-dashed py-12 text-center">
                <p className="text-muted-foreground">No available slots found.</p>
              </div>
            )}

            <label htmlFor="booking-note" className="mt-2 block text-sm font-medium">
              Booking note
            </label>
            <textarea
              id="booking-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Tell the technician what needs fixing."
              rows={3}
              maxLength={500}
              className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
            <div className="text-right text-xs text-muted-foreground">{note.length}/500</div>
          </div>

          <div className="border-t p-4">
            <Button
              type="button"
              className="w-full"
              size="lg"
              disabled={!selectedSlot || pending || availableSlots.length === 0}
              onClick={handleContinue}
            >
              {pending
                ? "Booking..."
                : selectedSlot
                  ? "Continue with selected slot"
                  : "Select a slot"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  );
}

export function SlotChoice({ slot }: { slot: BookingSlot }) {
  const { openBooking } = useBooking();

  if (!slot.isAvailable) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="mb-3 flex items-center gap-2 font-semibold">
          <Calendar className="h-5 w-5" />
          {formatDate(slot.date)}
        </div>
        <p className="text-sm text-muted-foreground">
          {formatTime(slot.startsAt)} – {formatTime(slot.endsAt)}
        </p>
        <div className="mt-3">
          <Badge variant="destructive">
            <XCircle className="mr-1 h-4 w-4" />
            Booked
          </Badge>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openBooking(slot.id)}
      className="rounded-xl border border-green-300 bg-green-50 p-4 text-left transition-colors hover:border-green-600"
    >
      <div className="mb-3 flex items-center gap-2 font-semibold">
        <Calendar className="h-5 w-5" />
        {formatDate(slot.date)}
      </div>
      <p className="text-sm text-muted-foreground">
        {formatTime(slot.startsAt)} – {formatTime(slot.endsAt)}
      </p>
      {slot.note ? <p className="mt-2 text-sm">{slot.note}</p> : null}
      <div className="mt-3 flex items-center justify-between gap-3">
        <Badge className="bg-green-600 text-white hover:bg-green-600">
          <CheckCircle2 className="mr-1 h-4 w-4" />
          Available
        </Badge>
        <span className="text-sm font-semibold text-green-700">Book this slot</span>
      </div>
    </button>
  );
}

export function BookServiceButton({ disabled }: { disabled?: boolean }) {
  const { openBooking } = useBooking();

  return (
    <Button
      type="button"
      className="w-full"
      size="lg"
      disabled={disabled}
      onClick={() => openBooking()}
    >
      Book this service
    </Button>
  );
}
