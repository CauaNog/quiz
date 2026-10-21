const facts = [
  {m:"Frontal",r:"Aponeurose epicraniana",i:"Pele das sobrancelhas e região da raiz do nariz",f:"Eleva as sobrancelhas e enruga a testa",g:"Cabeça e pescoço",d:"facil"},

  {m:"Esternocleidomastoideo",r:"Manúbrio do esterno e terço medial da clavícula",i:"Processo mastoide do temporal e porção lateral da linha nucal superior",f:"Inclina a cabeça para o mesmo lado e gira o rosto para o lado oposto; bilateralmente, auxilia a flexão cervical",g:"Cabeça e pescoço",d:"medio"},

  {m:"Masseter",r:"Arco zigomático",i:"Face lateral do ramo e ângulo da mandíbula",f:"Eleva a mandíbula e auxilia sua protrusão",g:"Cabeça e pescoço",d:"facil"},

  {m:"Trapézio",r:"Linha nucal superior, protuberância occipital externa, ligamento nucal e processos espinhosos de C7 a T12",i:"Terço lateral da clavícula, acrômio e espinha da escápula",f:"As fibras superiores elevam, as médias retraem e as inferiores deprimem a escápula; em conjunto, auxiliam sua rotação superior",g:"Costas",d:"medio"},

  {m:"Peitoral maior",r:"Metade medial da clavícula, esterno, cartilagens costais superiores e aponeurose do oblíquo externo",i:"Lábio lateral do sulco intertubercular do úmero",f:"Aduz e roda medialmente o braço; a porção clavicular auxilia a flexão e a esternocostal pode estender o braço a partir da posição flexionada",g:"Tronco e ombros",d:"medio"},

  {m:"Reto abdominal",r:"Crista púbica e sínfise púbica",i:"Processo xifoide e cartilagens costais da 5ª à 7ª costela",f:"Flexiona o tronco e comprime o conteúdo abdominal",g:"Tronco",d:"facil"},

  {m:"Oblíquo externo",r:"Faces externas das costelas 5 a 12",i:"Linha alba, tubérculo púbico e porção anterior da crista ilíaca",f:"Comprime o abdômen, auxilia a flexão do tronco e roda o tronco para o lado oposto quando atua unilateralmente",g:"Tronco",d:"medio"},

  {m:"Diafragma",r:"Processo xifoide, faces internas das costelas e cartilagens costais inferiores e vértebras lombares por meio dos pilares e ligamentos arqueados",i:"Tendão central do diafragma",f:"Principal músculo da inspiração; ao contrair, desce e aumenta o volume da cavidade torácica",g:"Tronco",d:"medio"},

  {m:"Latíssimo do dorso",r:"Processos espinhosos de T7 a T12, fáscia toracolombar, crista ilíaca e costelas inferiores; pode receber fibras do ângulo inferior da escápula",i:"Assoalho do sulco intertubercular do úmero",f:"Estende, aduz e roda medialmente o braço",g:"Costas",d:"dificil"},

  {m:"Romboide maior",r:"Processos espinhosos de T2 a T5 e ligamentos supraespinhosos correspondentes",i:"Borda medial da escápula, entre a raiz da espinha e o ângulo inferior",f:"Retrai e estabiliza a escápula, auxiliando sua rotação inferior",g:"Costas",d:"dificil"},

  {m:"Eretor da espinha",r:"Tendão comum na região posterior do sacro, crista ilíaca e estruturas ligamentares e vertebrais lombares",i:"Costelas e processos vertebrais; as inserções variam entre os músculos espinal, longuíssimo e iliocostal",f:"Estende a coluna bilateralmente e inclina a coluna para o mesmo lado quando atua unilateralmente",g:"Costas",d:"medio"},

  {m:"Deltoide",r:"Terço lateral da clavícula, acrômio e espinha da escápula",i:"Tuberosidade deltoidea do úmero",f:"A porção média abduz o braço; a anterior auxilia a flexão e rotação medial, e a posterior auxilia a extensão e rotação lateral",g:"Ombros",d:"facil"},

  {m:"Supraespinhal",r:"Fossa supraespinhal da escápula",i:"Faceta superior do tubérculo maior do úmero",f:"Auxilia o início da abdução do braço e estabiliza a cabeça do úmero na articulação do ombro",g:"Ombros",d:"medio"},

  {m:"Infraespinhal",r:"Fossa infraespinhal da escápula",i:"Faceta média do tubérculo maior do úmero",f:"Roda lateralmente o braço e estabiliza a articulação do ombro",g:"Ombros",d:"medio"},

  {m:"Redondo menor",r:"Porção superior da borda lateral da escápula",i:"Faceta inferior do tubérculo maior do úmero",f:"Roda lateralmente e auxilia a adução do braço; estabiliza a cabeça do úmero",g:"Ombros",d:"dificil"},

  {m:"Subescapular",r:"Fossa subescapular da escápula",i:"Tubérculo menor do úmero",f:"Roda medialmente e auxilia a adução do braço; estabiliza a articulação do ombro",g:"Ombros",d:"medio"},

  {m:"Bíceps braquial",r:"Tubérculo supraglenoidal da escápula (cabeça longa) e processo coracoide (cabeça curta)",i:"Tuberosidade do rádio e aponeurose bicipital",f:"Flexiona o cotovelo e supina o antebraço; também auxilia a flexão do ombro",g:"Braços",d:"medio"},

  {m:"Braquial",r:"Metade distal da face anterior do úmero",i:"Tuberosidade da ulna e processo coronoide da ulna",f:"É um dos principais flexores do cotovelo",g:"Braços",d:"medio"},

  {m:"Tríceps braquial",r:"Tubérculo infraglenoidal da escápula (cabeça longa); face posterior do úmero acima do sulco do nervo radial (cabeça lateral) e abaixo dele (cabeça medial)",i:"Olécrano da ulna",f:"Estende o cotovelo; a cabeça longa também auxilia a extensão e a adução do braço",g:"Braços",d:"medio"},

  {m:"Braquiorradial",r:"Dois terços proximais da crista supracondilar lateral do úmero e septo intermuscular lateral",i:"Face lateral do rádio, proximal ao processo estiloide",f:"Flexiona o cotovelo, especialmente com o antebraço em posição neutra",g:"Antebraços",d:"dificil"},

  {m:"Flexor radial do carpo",r:"Epicôndilo medial do úmero, pelo tendão flexor comum",i:"Base do segundo metacarpo, com expansão variável para o terceiro",f:"Flexiona e abduz radialmente o punho",g:"Antebraços",d:"medio"},

  {m:"Extensor radial curto do carpo",r:"Epicôndilo lateral do úmero, pelo tendão extensor comum",i:"Base do terceiro metacarpo",f:"Estende e auxilia na abdução radial do punho",g:"Antebraços",d:"dificil"},

  {m:"Flexor profundo dos dedos",r:"Porção proximal da face anterior e medial da ulna e membrana interóssea",i:"Bases das falanges distais dos dedos 2 a 5",f:"Flexiona as articulações interfalângicas distais dos dedos 2 a 5 e auxilia a flexão dos dedos e do punho",g:"Antebraços",d:"dificil"},

  {m:"Extensor dos dedos",r:"Epicôndilo lateral do úmero, pelo tendão extensor comum",i:"Expansões extensoras dos dedos 2 a 5",f:"Estende os dedos 2 a 5 e auxilia a extensão do punho",g:"Antebraços",d:"medio"},

  {m:"Iliopsoas",r:"Psoas maior: corpos vertebrais, discos e processos transversos de T12 a L5; ilíaco: fossa ilíaca",i:"Trocânter menor do fêmur, por tendão comum predominante",f:"Principal flexor do quadril; também auxilia a rotação lateral da coxa e a flexão do tronco quando o membro inferior está fixo",g:"Quadril",d:"dificil"},

  {m:"Glúteo máximo",r:"Face glútea posterior do ílio, sacro, cóccix e ligamento sacrotuberoso",i:"Trato iliotibial e tuberosidade glútea do fêmur",f:"Estende e roda lateralmente o quadril; auxilia a estabilização do tronco e do joelho",g:"Quadril e glúteos",d:"facil"},

  {m:"Glúteo médio",r:"Face externa do ílio entre as linhas glúteas anterior e posterior",i:"Face lateral do trocânter maior do fêmur",f:"Abduz a coxa e estabiliza a pelve durante o apoio de uma perna na marcha",g:"Quadril e glúteos",d:"medio"},

  {m:"Adutor longo",r:"Corpo do púbis, inferior à crista púbica",i:"Terço médio da linha áspera do fêmur",f:"Aduz a coxa e auxilia a flexão do quadril",g:"Quadril",d:"medio"},

  {m:"Reto femoral",r:"Espinha ilíaca anteroinferior e região superior do acetábulo",i:"Patela pelo tendão do quadríceps e tuberosidade da tíbia pelo ligamento patelar",f:"Estende o joelho e auxilia a flexão do quadril",g:"Coxas",d:"dificil"},

  {m:"Vasto lateral",r:"Trocânter maior, tuberosidade glútea e lábio lateral da linha áspera do fêmur",i:"Patela pelo tendão do quadríceps e tuberosidade da tíbia pelo ligamento patelar",f:"Estende o joelho",g:"Coxas",d:"medio"},

  {m:"Bíceps femoral",r:"Tuberosidade isquiática (cabeça longa); linha áspera e linha supracondilar lateral do fêmur (cabeça curta)",i:"Cabeça da fíbula",f:"Flexiona o joelho e roda lateralmente a perna flexionada; a cabeça longa também estende o quadril",g:"Coxas",d:"dificil"},

  {m:"Semitendíneo",r:"Tuberosidade isquiática",i:"Face medial proximal da tíbia, na pata de ganso",f:"Estende o quadril, flexiona o joelho e roda medialmente a perna flexionada",g:"Coxas",d:"medio"},

  {m:"Sartório",r:"Espinha ilíaca anterossuperior",i:"Face medial proximal da tíbia, na pata de ganso",f:"Flexiona, abduz e roda lateralmente a coxa; também flexiona o joelho",g:"Coxas",d:"dificil"},

  {m:"Grácil",r:"Corpo e ramo inferior do púbis",i:"Face medial proximal da tíbia, na pata de ganso",f:"Aduz a coxa, auxilia a flexão do joelho e roda medialmente a perna flexionada",g:"Coxas",d:"medio"},

  {m:"Gastrocnêmio",r:"Região posterior dos côndilos medial e lateral do fêmur",i:"Calcâneo pelo tendão calcâneo (tendão de Aquiles)",f:"Realiza flexão plantar do tornozelo e auxilia a flexão do joelho",g:"Pernas",d:"facil"},

  {m:"Sóleo",r:"Cabeça e face posterior proximal da fíbula, linha do sóleo e borda medial da tíbia",i:"Calcâneo pelo tendão calcâneo (tendão de Aquiles)",f:"Realiza flexão plantar do tornozelo e contribui para a manutenção da postura em pé",g:"Pernas",d:"medio"},

  {m:"Tibial anterior",r:"Côndilo lateral e porção superior da face lateral da tíbia, além da membrana interóssea",i:"Cuneiforme medial e base do primeiro metatarso",f:"Dorsiflete e inverte o pé; auxilia a sustentação do arco medial",g:"Pernas",d:"medio"},

  {m:"Fibular longo",r:"Cabeça e porção superior da face lateral da fíbula",i:"Base do primeiro metatarso e cuneiforme medial, pela face plantar",f:"Ever­te o pé, auxilia a flexão plantar e ajuda a sustentar os arcos plantares",g:"Pernas",d:"dificil"},

  {m:"Extensor longo dos dedos",r:"Côndilo lateral da tíbia, porção anterior da fíbula e membrana interóssea",i:"Expansões extensoras dos dedos 2 a 5, alcançando as falanges média e distal",f:"Estende os dedos 2 a 5 e auxilia a dorsiflexão do tornozelo",g:"Pés",d:"medio"},

  {m:"Flexor longo do hálux",r:"Porção inferior da face posterior da fíbula e membrana interóssea",i:"Base da falange distal do hálux",f:"Flexiona o hálux e auxilia a flexão plantar do tornozelo e a propulsão durante a marcha",g:"Pés",d:"dificil"},

  {m:"Quadrado plantar",r:"Face plantar do calcâneo, incluindo suas regiões medial e lateral",i:"Tendão do flexor longo dos dedos",f:"Auxilia o flexor longo dos dedos na flexão dos dedos 2 a 5 e ajusta a direção de sua tração",g:"Pés",d:"dificil"},

  {m:"Levantador da escápula",r:"Tubérculos posteriores dos processos transversos de C1 a C4",i:"Borda medial da escápula, entre o ângulo superior e a raiz da espinha",f:"Eleva e roda inferiormente a escápula; com a escápula fixa, auxilia a inclinação lateral do pescoço",g:"Pescoço e costas",d:"dificil"}
]
