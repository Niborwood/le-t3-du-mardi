export const weekday = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
}).format(new Date());

export const share = () => {
  if (navigator.share) {
    navigator
      .share({
        title: "Top 3 du mardi",
        text: "C'est quoi ton top 3 ?",
        url: "https://top3dumardi.vercel.app/",
      })
      .then(() => console.log("Partage réussi !"))
      .catch((error) => console.log("Erreur !", error));

    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText("C'est quoi ton top 3 ? https://top3dumardi.vercel.app/")
      .then(() => {
        console.log("Copié dans le presse-papier");
      });
  }
};
