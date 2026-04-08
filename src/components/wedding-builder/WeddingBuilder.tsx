"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { IntakeQuestionnaire } from "./IntakeQuestionnaire";
import { DesignStudio } from "./DesignStudio";
import type { GalleryPreviewImage, SiteCopyText, WeddingEventItem } from "./types";
import { DEFAULT_SITE_COPY } from "./types";
import type { WeddingVibe } from "@/lib/wedding-theme";
import { generateWeddingContentSync } from "@/lib/generate-wedding-content";
import {
  DEFAULT_PAGE_ORDER,
  defaultPageVisibility,
  slugFromNames,
  type SiteSectionId,
} from "./site-sections";

const defaultEvents = (): WeddingEventItem[] => [
  { id: "ceremony", name: "Ceremony", time: "4:00 PM", location: "Main venue" },
  { id: "reception", name: "Reception", time: "6:00 PM", location: "Same venue" },
];

function uid() {
  return `e-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)}`;
}

function galleryUid() {
  return `g-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)}`;
}

const MAX_GALLERY_IMAGES = 12;
const MAX_FILE_MB = 8;

type Phase = "intake" | "design";

export function WeddingBuilder() {
  const [phase, setPhase] = useState<Phase>("intake");

  const [partner1, setPartner1] = useState("Alex");
  const [partner2, setPartner2] = useState("Jordan");
  const [weddingDate, setWeddingDate] = useState("");
  const [location, setLocation] = useState("");
  const [vibe, setVibe] = useState<WeddingVibe>("romantic");
  const [howTheyMet, setHowTheyMet] = useState("");
  const [proposalStory, setProposalStory] = useState("");
  const [events, setEvents] = useState<WeddingEventItem[]>(defaultEvents);
  const [guestMode, setGuestMode] = useState(false);
  const [galleryImages, setGalleryImages] = useState<GalleryPreviewImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryImagesRef = useRef<GalleryPreviewImage[]>([]);
  galleryImagesRef.current = galleryImages;

  const [pageOrder, setPageOrder] = useState<SiteSectionId[]>(DEFAULT_PAGE_ORDER);
  const [pageVisibility, setPageVisibility] = useState(defaultPageVisibility);
  const [rsvpEnabled, setRsvpEnabled] = useState(true);
  const [siteSlug, setSiteSlug] = useState("your-wedding");
  const [sitePublished, setSitePublished] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<SiteSectionId | null>("hero");
  const [siteCopy, setSiteCopy] = useState(() => ({ ...DEFAULT_SITE_COPY }));
  const [navLabels, setNavLabels] = useState<Partial<Record<SiteSectionId, string>>>({});

  const setSiteCopyKey = useCallback((key: keyof SiteCopyText, value: string) => {
    setSiteCopy((s) => ({ ...s, [key]: value }));
  }, []);

  const setNavLabel = useCallback((id: SiteSectionId, value: string) => {
    setNavLabels((n) => ({ ...n, [id]: value }));
  }, []);

  const updateEvent = useCallback((eventId: string, field: keyof WeddingEventItem, value: string) => {
    setEvents((list) => list.map((e) => (e.id === eventId ? { ...e, [field]: value } : e)));
  }, []);

  const seedContent = useMemo(
    () => generateWeddingContentSync({ partner1: "Alex", partner2: "Jordan" }),
    []
  );
  const [tagline, setTagline] = useState(seedContent.tagline);
  const [story, setStory] = useState(seedContent.story);

  const runGeneration = useCallback(() => {
    const { story: s, tagline: t } = generateWeddingContentSync({
      partner1,
      partner2,
      howTheyMet: howTheyMet || undefined,
      proposalStory: proposalStory || undefined,
    });
    setStory(s);
    setTagline(t);
  }, [partner1, partner2, howTheyMet, proposalStory]);

  useEffect(() => {
    if (phase !== "design") return;
    const t = setTimeout(() => runGeneration(), 450);
    return () => clearTimeout(t);
  }, [phase, partner1, partner2, howTheyMet, proposalStory, runGeneration]);

  useEffect(() => {
    return () => {
      galleryImagesRef.current.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, []);

  const removeGalleryImage = useCallback((id: string) => {
    setGalleryImages((prev) => {
      const target = prev.find((x) => x.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((x) => x.id !== id);
    });
  }, []);

  const clearGallery = useCallback(() => {
    setGalleryImages((prev) => {
      prev.forEach((img) => URL.revokeObjectURL(img.url));
      return [];
    });
  }, []);

  const onGalleryFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;
      const next: GalleryPreviewImage[] = [];
      let room = MAX_GALLERY_IMAGES - galleryImages.length;
      for (let i = 0; i < files.length && room > 0; i++) {
        const file = files[i];
        if (!file.type.startsWith("image/")) continue;
        if (file.size > MAX_FILE_MB * 1024 * 1024) continue;
        next.push({ id: galleryUid(), url: URL.createObjectURL(file) });
        room--;
      }
      if (next.length) setGalleryImages((prev) => [...prev, ...next].slice(0, MAX_GALLERY_IMAGES));
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    [galleryImages.length]
  );

  const previewData = useMemo(
    () => ({
      partner1,
      partner2,
      weddingDate,
      location,
      vibe,
      tagline,
      story,
      events,
      guestMode,
      galleryImages,
      pageOrder,
      pageVisibility,
      rsvpEnabled,
      siteCopy,
      navLabels,
    }),
    [
      partner1,
      partner2,
      weddingDate,
      location,
      vibe,
      tagline,
      story,
      events,
      guestMode,
      galleryImages,
      pageOrder,
      pageVisibility,
      rsvpEnabled,
      siteCopy,
      navLabels,
    ]
  );

  const handleIntakeContinue = useCallback(() => {
    runGeneration();
    setSiteSlug(slugFromNames(partner1, partner2));
    setPhase("design");
    setActiveSectionId("hero");
  }, [partner1, partner2, runGeneration]);

  if (phase === "intake") {
    return (
      <IntakeQuestionnaire
        partner1={partner1}
        setPartner1={setPartner1}
        partner2={partner2}
        setPartner2={setPartner2}
        weddingDate={weddingDate}
        setWeddingDate={setWeddingDate}
        location={location}
        setLocation={setLocation}
        vibe={vibe}
        setVibe={setVibe}
        howTheyMet={howTheyMet}
        setHowTheyMet={setHowTheyMet}
        proposalStory={proposalStory}
        setProposalStory={setProposalStory}
        onContinue={handleIntakeContinue}
      />
    );
  }

  return (
    <DesignStudio
      siteSlug={siteSlug}
      setSiteSlug={setSiteSlug}
      sitePublished={sitePublished}
      setSitePublished={setSitePublished}
      partner1={partner1}
      setPartner1={setPartner1}
      partner2={partner2}
      setPartner2={setPartner2}
      weddingDate={weddingDate}
      setWeddingDate={setWeddingDate}
      location={location}
      setLocation={setLocation}
      vibe={vibe}
      setVibe={setVibe}
      howTheyMet={howTheyMet}
      setHowTheyMet={setHowTheyMet}
      proposalStory={proposalStory}
      setProposalStory={setProposalStory}
      events={events}
      setEvents={setEvents}
      guestMode={guestMode}
      setGuestMode={setGuestMode}
      galleryImages={galleryImages}
      fileInputRef={fileInputRef}
      onGalleryFiles={onGalleryFiles}
      removeGalleryImage={removeGalleryImage}
      clearGallery={clearGallery}
      maxGallery={MAX_GALLERY_IMAGES}
      maxFileMb={MAX_FILE_MB}
      tagline={tagline}
      setTagline={setTagline}
      story={story}
      setStory={setStory}
      runGeneration={runGeneration}
      pageOrder={pageOrder}
      setPageOrder={setPageOrder}
      pageVisibility={pageVisibility}
      setPageVisibility={setPageVisibility}
      rsvpEnabled={rsvpEnabled}
      setRsvpEnabled={setRsvpEnabled}
      activeSectionId={activeSectionId}
      setActiveSectionId={setActiveSectionId}
      previewData={previewData}
      onBackToIntake={() => setPhase("intake")}
      uid={uid}
      setSiteCopyKey={setSiteCopyKey}
      setNavLabel={setNavLabel}
      updateEvent={updateEvent}
    />
  );
}
