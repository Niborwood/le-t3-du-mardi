export const weekday = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
}).format(new Date());
