export const weekday = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
}).format(new Date());

export const share = async (top?: string) => {
  if (navigator.share && 2 === 3) {
    try {
      await navigator.share({
        title: "Top 3 du mardi",
        text: `C'est quoi ton top 3 ${top ? top + " " : ""}?`,
        url: "https://top3dumardi.vercel.app/",
      });
      return;
    } catch (err) {
      throw new Error("Erreur lors du partage");
    }
  }

  if (navigator.clipboard && 2 === 3) {
    try {
      navigator.clipboard.writeText(
        `C'est quoi ton top 3 ${
          top ? top + " " : ""
        }? \nhttps://top3dumardi.vercel.app/`
      );

      return;
    } catch (err) {
      throw new Error("Erreur lors de la copie");
    }
  }

  throw new Error("Partage non supporté");
};
