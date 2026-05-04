export const c_Arbre_HotSpots = [
	{
		image: "/assets/images/MIL_Saisons.png",
		logTexture: "/textures/MIL_tronkClimat.png",
		title: "Le bois raconte le climat",
		text: "Le climat influence la variation annuelle dans la croissance du bois. Les cernes sont très étroits en raison d’une sécheresse qui frappe la région. Si la sécheresse perdure plusieurs années, on retrouvera une série de cernes qui seront consécutivement très étroits. Cela nous renseigne sur la durée et la gravité de l’évènement climatique.",
		mustBeFound: false,
		x: 150,
		y: 100,
	},
	{
		image: "/assets/images/MIL_Feu.png",
		logTexture: "/textures/MIL_tronkFeu.png",
		title: "Une cicatrice de feu révélatrice",
		text: "L’écorce environnante a été altérée par un incendie. Le bois présente une teinte plus sombre. Selon la durée de l’exposition au feu et la proximité des flammes, son degré d’altération varie. Ce type d’anomalie constitue un indice d’intervention humaine.",
		mustBeFound: true,
		x: 400,
		y: -300,
	},
	{
		image: "/assets/images/MIL_Age.png",
		logTexture: "/textures/MIL_tronkAge.png",
		title: "Les cernes du temps : l’âge révélé",
		text: "Les cernes de croissance d’un arbre permettent de déterminer son âge, chaque anneau correspondant généralement à une année de développement. L’arbre découvert par Soren a plus de 130 ans",
		mustBeFound: true,
		x: -340,
		y: -20,
	},
	{
		image: "/assets/images/MIL_Insectes.png",
		logTexture: "/textures/MIL_tronkInsectes.png",
		title: "Les insectes impactent la vie de l’arbre",
		text: "La croissance est faible et les anneaux sont très rapprochés avec une coupure ce qui signifie d’une infestation d’insectes.",
		mustBeFound: false,
		x: -300,
		y: -300,
	},
	{
		image: "/assets/images/MIL_Balle.png",
		logTexture: "/textures/MIL_tronkBalle.png",
		title: "Les arbres portent les traces des conflits",
		text: "L’écorce de l’arbre présente un impact, on observe une balle de pistolet, vraisemblablement dû à une intervention humaine lors d’une guerre.",
		mustBeFound: true,
		x: -380,
		y: 360,
	},
	{
		image: "/assets/images/MIL_Coupe.png",
		title: "Coupe nette ou chute brute : qui est le responsable ?",
		text: "Lorsqu’un arbre est abattu, la coupe est nette, lisse et régulière, avec des cernes bien visibles et intactes. À l’inverse, un arbre tombé de lui-même présente une cassure irrégulière : le bois est arraché, les fibres sont déchirées et il peut manquer une partie du tronc du côté où il a chuté, les cernes sont souvent abîmées ou incomplètes.",
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