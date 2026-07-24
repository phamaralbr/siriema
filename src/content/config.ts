import { defineCollection, z } from "astro:content";

// O Sveltia CMS, por padrão, grava campos opcionais deixados em branco como
// string vazia ('') em vez de omitir a chave. Isso quebra validações como
// z.enum() ou z.coerce.date(), que não aceitam ''. Este helper trata ''
// como "não preenchido" antes da validação, então os campos opcionais se
// comportam como esperado mesmo que o CMS grave string vazia.
const blankToUndefined = (val: unknown) => (val === "" ? undefined : val);

const expeditions = defineCollection({
    type: "content",
    schema: z.object({
        // Campos obrigatórios: o mínimo pra uma expedição aparecer no site.
        title: z.string(),
        subtitle: z.string(),
        cover: z.string(), // caminho dentro de /public, ex: "/images/expeditions/nome.jpg"
        location: z.string(),
        durationDays: z.number(),
        // Data de início. Cada expedição acontece uma vez; o catálogo é
        // ordenado por esta data (a mais próxima aparece primeiro).
        date: z.coerce.date(),
        priceFrom: z.number(),

        // Tudo abaixo é opcional — preencha só o que fizer sentido.
        featured: z.boolean().default(false),

        difficulty: z.preprocess(
            blankToUndefined,
            z.enum(["Leve", "Moderada", "Intensa"]).optional(),
        ),
        groupSize: z.preprocess(blankToUndefined, z.string().optional()), // ex: "6 a 12 pessoas"

        priceNote: z.preprocess(
            blankToUndefined,
            z.string().default("por pessoa").optional(),
        ),

        highlights: z.array(z.string()).default([]),

        itinerary: z
            .array(
                z.object({
                    day: z.number(),
                    title: z.string(),
                    description: z.string(),
                }),
            )
            .default([]),

        includes: z.array(z.string()).default([]),
        excludes: z.array(z.string()).default([]),

        // Data de término, só para expedições de mais de um dia com intervalo
        // definido. Junto com `date`, forma o intervalo exibido no site
        // (ex: "11 a 14 de setembro de 2026"). Deixe em branco se a expedição
        // for só um dia ou você preferir mostrar uma única data.
        endDate: z.preprocess(blankToUndefined, z.coerce.date().optional()),

        // Marque quando não houver mais vagas. O site esmaece a imagem,
        // mostra um selo "Esgotado" e remove os botões de reserva —
        // continua aparecendo no catálogo, só não dá mais pra reservar.
        esgotado: z.boolean().default(false),

        // Mensagem de WhatsApp específica desta expedição (opcional)
        whatsappMessage: z.preprocess(
            blankToUndefined,
            z
                .string()
                .default(
                    "Olá! Vi o catálogo de expedições e gostaria de mais informações.",
                )
                .optional(),
        ),
    }),
});

export const collections = { expeditions };
