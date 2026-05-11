export const c_Arbre_HotSpots = [
	{
		image: "/assets/images/MIL_Saisons.png",
		logTexture: "climat",
		title: "Changement climatique",
		text: "Le climat influence la croissance annuelle des troncs. En période de sécheresse ou de grands froids, les cernes sont plus étroits, ce qui permet de constater les périodes plus difficiles que d’autres. \nIci, plusieurs cernes très étroits se succèdent, preuve que la région a subi des variations météorologiques fortes.",
		mustBeFound: false,
		x: 150,
		y: 100,
	},
	{
		image: "/assets/images/MIL_Feu.png",
		logTexture: "feu",
		title: "Trace d'incendie",
		text: "L’écorce environnante a été altérée par des flammes. Le bois présente une teinte plus sombre. \nSelon la durée de l’exposition au feu et la proximité des flammes, le degré d’altération varie.",
		mustBeFound: true,
		x: 400,
		y: -300,
	},
	{
		image: "/assets/images/MIL_Age.png",
		logTexture: "age",
		title: "Temps et âge",
		text: "Les cernes d’un arbre permettent de déterminer son âge. On dit que chaque cerne correspond généralement à une année. \nIci, on compte exactement 130 cernes.",
		mustBeFound: true,
		x: -340,
		y: -20,
	},
	{
		image: "/assets/images/MIL_Insectes.png",
		logTexture: "insectes",
		title: "Les insectes",
		text: "La présence d’insecte dans un arbre joue sur sa qualité de vie. La croissance est réduite, on peut le voir aux cernes très rapprochés et aux coupures dans les anneaux, qui sont le signe d’une invasion d’insectes.",
		mustBeFound: false,
		x: -300,
		y: -300,
	},
	{
		image: "/assets/images/MIL_Balle.png",
		logTexture: "balle",
		title: "Impact de balle",
		text: "Les arbres peuvent porter les traces de conflits humains. \nIci, l’écorce présente un impact et une balle en métal plantée dans le bois.",
		mustBeFound: true,
		x: -380,
		y: 360,
	},
	{
		image: "/assets/images/MIL_Coupe.png",
		title: "Découpe du tronc",
		text: "Lorsqu’un arbre est abattu, la découpe du tronc est nette, lisse et régulière. Les cernes sont discernables les uns des autres et intactes. À l’inverse, un arbre tombé naturellement présente une cassure irrégulière (bois arraché, fibres déchirées et cernes incomplètes). \nIci, la découpe est parfaite.",
		mustBeFound: true,
		x: -50,
		y: 50,
	},
];

export const c_Arbre_HotSpots_MustFind = c_Arbre_HotSpots.filter(spot => spot.mustBeFound).length;

export const save_HotSpots = (data) => {
	return {
		title: data.title,
		mustBeFound: data.mustBeFound,
		x: data.x,
		y: data.y,
	}
}

export const coo_Ratio = (distance) => {
	const height = 1200;
	return (distance * window.innerHeight) / height;
}