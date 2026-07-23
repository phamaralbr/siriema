// Edite estes dados conforme sua agência.
// Isso evita ter que caçar "número de WhatsApp" espalhado pelo código.

export const SITE = {
    name: "Siriema Bike Trip",
    tagline: "Expedições guiadas para quem gosta de chegar longe.",
    description:
        "Catálogo de expedições e trilhas guiadas. Roteiros, inclusões e reserva direta pelo WhatsApp.",

    logo: "/images/siriema-logo-dark.svg",
    logoAlt: "Logo Siriema Bike Trip",
    logoDark: "/images/siriema-logo-light.svg",

    // Número no formato internacional, só dígitos (sem +, espaços ou traços)
    whatsappNumber: "5561995538459",

    // Mensagem padrão quando não há uma específica da expedição
    whatsappDefaultMessage:
        "Olá! Vi o catálogo de expedições e gostaria de mais informações.",

    instagram: "https://instagram.com/siriemabiketrip",
    email: "siriemabiketrip@gmail.com",

    // Usado em textos de rodapé e SEO
    city: "Brasília, DF",
};

/**
 * Monta o link do WhatsApp com mensagem pré-preenchida.
 * Se `message` não for passado, usa a mensagem padrão do site.
 */
export function whatsappLink(message?: string): string {
    const text = encodeURIComponent(message ?? SITE.whatsappDefaultMessage);
    return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
