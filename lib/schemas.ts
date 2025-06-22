import { z } from 'zod';

export const painPoints = [
  'breakup',
  'job-loss',
  'family-trauma',
  'betrayal',
  'burnout',
  'identity-crisis'
] as const;

export const intentions = [
  'emotional-stability',
  'clarity',
  'self-worth',
  'reduce-obsessive-thoughts',
  'move-forward'
] as const;

export const userJourneySchema = z.object({
  userId: z.string(),
  track: z.enum(painPoints),
  intentions: z.array(z.enum(intentions)),
  currentDay: z.number().min(1).max(7).default(1),
  startedAt: z.date().default(() => new Date()),
  lastActive: z.date().default(() => new Date()),
  completedDays: z.array(z.number()).default([]),
  moodLogs: z.array(z.object({
    day: z.number(),
    mood: z.number().min(1).max(5),
    notes: z.string().optional(),
    createdAt: z.date().default(() => new Date())
  })).default([]),
  journalEntries: z.array(z.object({
    day: z.number(),
    content: z.string(),
    createdAt: z.date().default(() => new Date())
  })).default([])
});

export type UserJourney = z.infer<typeof userJourneySchema>;
