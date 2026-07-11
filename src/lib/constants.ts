export const SITE_NAME = "agenciaFVX";
export const SITE_URL = "https://agenciafvx.com.br";

export const WHATSAPP_NUMBER = "5522992242189";
export const WHATSAPP_NUMBER_FORMATADO = "(22) 99224-2189";
export const WHATSAPP_MENSAGEM_PADRAO = "Olá! Quero falar sobre um projeto com a agenciaFVX.";

export function buildWhatsappUrl(mensagem: string = WHATSAPP_MENSAGEM_PADRAO): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;
}

export const INSTAGRAM_HANDLE = "@agenciafvx";
export const INSTAGRAM_URL = "https://instagram.com/agenciafvx";

export const ANCORAS = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#como-trabalhamos", label: "Como trabalhamos" },
  { href: "/#projetos", label: "Projetos" },
  { href: "/#contato", label: "Contato" },
] as const;
