import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const servicos = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/servicos" }),
  schema: z.object({
    ordem: z.number().int().positive(),
    nome: z.string(),
    resumo: z.string(),
    icone: z.string(),
    whatsappMensagem: z.string(),
    video: z.string().optional(),
    videoPoster: z.string().optional(),
  }),
});

const cases = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/cases" }),
  schema: z.object({
    titulo: z.string(),
    cliente: z.string(),
    servicosRelacionados: z.array(z.string()),
    descricao: z.string(),
    imagem: z.string(),
    video: z.string().optional(),
    link: z.string().url().optional(),
    destaque: z.boolean().default(false),
    publicadoEm: z.coerce.date(),
  }),
});

export const collections = { servicos, cases };
