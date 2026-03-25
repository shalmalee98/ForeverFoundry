"use client";

import { motion } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { WeddingVibe } from "@/lib/wedding-theme";
import { WEDDING_THEMES } from "@/lib/wedding-theme";
interface Props {
  partner1: string;
  setPartner1: (v: string) => void;
  partner2: string;
  setPartner2: (v: string) => void;
  weddingDate: string;
  setWeddingDate: (v: string) => void;
  location: string;
  setLocation: (v: string) => void;
  vibe: WeddingVibe;
  setVibe: (v: WeddingVibe) => void;
  howTheyMet: string;
  setHowTheyMet: (v: string) => void;
  proposalStory: string;
  setProposalStory: (v: string) => void;
  onContinue: () => void;
}

/**
 * Step 1 — collect essentials before opening the visual designer (Joy-style flow).
 */
export function IntakeQuestionnaire({
  partner1,
  setPartner1,
  partner2,
  setPartner2,
  weddingDate,
  setWeddingDate,
  location,
  setLocation,
  vibe,
  setVibe,
  howTheyMet,
  setHowTheyMet,
  proposalStory,
  setProposalStory,
  onContinue,
}: Props) {
  const canContinue =
    partner1.trim().length > 0 &&
    partner2.trim().length > 0 &&
    weddingDate.length > 0 &&
    location.trim().length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/40 to-background flex flex-col">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-xl mx-auto flex items-center gap-2 font-display font-semibold text-lg">
          <Heart className="h-5 w-5 fill-primary text-primary" />
          ForeverFoundry
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl space-y-8"
        >
          <div className="text-center space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">Step 1 of 2</p>
            <h1 className="font-display text-3xl md:text-4xl text-foreground">Let’s start with the basics</h1>
            <p className="text-muted-foreground text-sm">
              Names, date, venue, and a little about you — then you’ll design your site with a live preview.
            </p>
          </div>

          <div className="space-y-6 rounded-2xl border border-border bg-card/60 p-6 md:p-8 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intake-p1">Partner 1</Label>
                <Input
                  id="intake-p1"
                  value={partner1}
                  onChange={(e) => setPartner1(e.target.value)}
                  placeholder="First name"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intake-p2">Partner 2</Label>
                <Input
                  id="intake-p2"
                  value={partner2}
                  onChange={(e) => setPartner2(e.target.value)}
                  placeholder="First name"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="intake-date">Wedding date</Label>
                <Input
                  id="intake-date"
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="intake-loc">Venue or location</Label>
                <Input
                  id="intake-loc"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, venue, or region"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Wedding vibe</Label>
              <Select value={vibe} onValueChange={(v) => setVibe(v as WeddingVibe)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Choose a vibe" />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(WEDDING_THEMES) as WeddingVibe[]).map((key) => (
                    <SelectItem key={key} value={key}>
                      {WEDDING_THEMES[key].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intake-met">How you met (optional)</Label>
              <Textarea
                id="intake-met"
                value={howTheyMet}
                onChange={(e) => setHowTheyMet(e.target.value)}
                placeholder="A sentence or two — we’ll use it for your story."
                rows={3}
                className="rounded-xl resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="intake-prop">Proposal (optional)</Label>
              <Textarea
                id="intake-prop"
                value={proposalStory}
                onChange={(e) => setProposalStory(e.target.value)}
                placeholder="How they asked (or how you’ll tell it on the site)"
                rows={3}
                className="rounded-xl resize-none"
              />
            </div>

            <p className="text-xs text-muted-foreground">
              You’ll add your schedule, photos, and fine-tune every section in the next step.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              type="button"
              size="lg"
              className="rounded-full gap-2 px-8"
              disabled={!canContinue}
              onClick={onContinue}
            >
              Continue to website designer
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          {!canContinue ? (
            <p className="text-center text-xs text-muted-foreground">
              Fill in both names, wedding date, and location to continue.
            </p>
          ) : null}
        </motion.div>
      </main>
    </div>
  );
}
