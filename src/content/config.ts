import { defineCollection, z } from 'astro:content';

const expeditions = defineCollection({
  type: 'content',
  schema: z.object({
      title: z.string(),
      // Frase curta de efeito, aparece no card
      subtitle: z.string(),
      // Aparece em destaque na home se true
      featured: z.boolean().default(false),
      // Ordem manual dentro da listagem (menor = primeiro)
      order: z.number().default(99),

      // Caminhos dentro de /public, ex: "/images/expeditions/nome.jpg"
      // O Sveltia CMS faz upload direto para public/images/expeditions
      cover: z.string(),
      coverAlt: z.string(),
      gallery: z.array(z.string()).default([]),

      location: z.string(),
      durationDays: z.number(),
      difficulty: z.enum(['Leve', 'Moderada', 'Intensa']),
      groupSize: z.string().optional(), // ex: "6 a 12 pessoas"

      priceFrom: z.number(),
      priceNote: z.string().default('por pessoa'),

      highlights: z.array(z.string()).default([]),

      itinerary: z
        .array(
          z.object({
            day: z.number(),
            title: z.string(),
            description: z.string(),
          })
        )
        .default([]),

      includes: z.array(z.string()).default([]),
      excludes: z.array(z.string()).default([]),

      // Data única da expedição (cada uma acontece uma vez só).
      // Deixe em branco se ainda não tiver data definida.
      date: z.coerce.date().optional(),

      // Mensagem de WhatsApp específica desta expedição (opcional)
      whatsappMessage: z.string().optional(),
    }),
});

export const collections = { expeditions };
