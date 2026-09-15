/* Gerador combinatório de frases — mais de 10.000 combinações únicas,
   feitas de fragmentos escritos à mão que se encaixam gramaticalmente. */
(function(global){

  const ABERTURAS = [
    "Sezaltina, se hoje o mundo me perguntasse o que é o amor, eu diria que",
    "Nos dias em que tudo parece difícil, lembro-me de que",
    "Não preciso de motivos para te amar, mas se precisasse, diria que",
    "Enquanto o teu nome for o meu preferido, prometo que",
    "Há coisas que a distância não muda, como o facto de que",
    "Se me perguntarem porque sorrio sozinho, é porque penso que",
    "Entre todas as certezas que tenho, a mais firme é que",
    "Quando fecho os olhos e penso em nós, sinto que",
    "Se o tempo parasse agora, eu queria que soubesses que",
    "Nas manhãs mais simples, a primeira coisa que penso é que",
    "Mesmo nos dias mais cheios, arranjo sempre tempo para lembrar que",
    "Se pudesse escrever só uma linha para ti, seria que",
    "Quando alguém me pergunta o que procuro na vida, respondo que",
    "Ainda que o mundo inteiro discordasse, eu continuaria a acreditar que",
    "No meio de tantas palavras que existem, escolho sempre as que dizem que",
    "Se um dia esqueceres tudo o resto, quero que te lembres de que",
    "Depois de tudo o que já vivi, aprendi que",
    "Sezaltina, quero que saibas, sem qualquer dúvida, que",
    "Não é preciso um dia especial para eu perceber que",
    "Entre o barulho do mundo, o que me acalma é saber que",
    "Se alguém perguntar qual é o meu maior orgulho, direi que",
    "Nos momentos em que duvido de tudo, nunca duvido de que",
    "Quando penso no futuro, a única certeza que tenho é que",
    "Se o amor tivesse uma prova, a minha seria que",
    "Há um pensamento que volta sempre, todos os dias, que é que",
    "Antes de dormir, a última coisa que penso é que",
    "Sezaltina, quero deixar bem claro, hoje e sempre, que",
    "Numa vida cheia de talvezes, há uma certeza inteira: que",
    "Não sei explicar tudo o que sinto, mas sei dizer que",
    "Escrevo isto sem pressa, só para que fiques a saber que"
  ];

  const NUCLEOS = [
    "o teu sorriso é o lugar mais seguro que conheço",
    "amar-te tornou-se o meu hábito favorito",
    "contigo aprendi que a vida pode ser simples e ainda assim imensa",
    "não existe versão minha que não te escolha",
    "tu és o motivo mais bonito para acreditar em finais felizes",
    "o teu nome mudou a forma como vejo o mundo",
    "cada detalhe teu se tornou parte da minha rotina preferida",
    "ao teu lado, até o silêncio é confortável",
    "tu és a resposta a perguntas que nem sabia que tinha",
    "a tua presença faz tudo parecer mais leve",
    "és a razão pela qual acredito em coincidências bonitas",
    "o meu coração já decidiu, há muito, que és tu",
    "contigo, o tempo aprendeu a passar devagar",
    "tu és o tipo de amor que se sente antes de se entender",
    "a tua força é uma das coisas que mais admiro em ti",
    "és a prova de que o certo, às vezes, também é simples",
    "tu és o meu lugar preferido, mesmo sem endereço",
    "amar-te é a decisão mais fácil que já tomei",
    "contigo aprendi o verdadeiro significado de cuidar de alguém",
    "tu és a explicação que eu nunca soube dar sobre felicidade",
    "cada dia ao teu lado parece um pequeno recomeço bom",
    "tu és aquela pessoa que faz tudo o resto fazer sentido",
    "não canso de aprender coisas novas sobre ti",
    "tu és o tipo de sorte que ninguém explica, só agradece",
    "és o motivo pelo qual guardo os melhores planos para o futuro",
    "contigo, até os dias comuns parecem ocasiões especiais",
    "tu és aquilo que eu não sabia que estava à procura",
    "a tua calma ensina-me a respirar melhor",
    "tu és a prova viva de que setembro sempre foi um mês especial",
    "és o tipo de pessoa que se ama mais a cada dia, não menos",
    "contigo aprendi que amar é, acima de tudo, escolher todos os dias",
    "tu és a versão mais bonita da palavra companhia",
    "és o tipo de presença que ninguém quer perder",
    "tu és, sem exagero, o meu capítulo preferido"
  ];

  const FECHOS = [
    " Isso nunca vai mudar.",
    " Isso é tudo o que preciso de saber.",
    " Prometo-te isso, hoje e sempre.",
    " E disso eu tenho a certeza absoluta.",
    " Guarda isto contigo.",
    " Isso é só mais uma das razões.",
    " Pensa nisto sempre que precisares de um sorriso.",
    " É simples assim.",
    " Não existe forma mais bonita de dizer isto.",
    " E isso, para mim, já é motivo de sobra.",
    " Que este pensamento te acompanhe hoje.",
    " É a verdade mais simples que conheço.",
    " Amo-te, sem pressa e sem medida.",
    " Isso resume tudo o resto.",
    " Que fique registado, sempre.",
    " É por isso que escolho, todos os dias.",
    " Sezaltina, é tão simples quanto isto."
  ];

  function hashString(str){
    let h = 0;
    for(let i=0;i<str.length;i++){
      h = (h*31 + str.charCodeAt(i)) >>> 0;
    }
    return h;
  }

  // Total de combinações possíveis (para referência): >10.000
  const TOTAL_COMBOS = ABERTURAS.length * NUCLEOS.length * FECHOS.length;

  function fraseFromSeed(seed){
    const h = hashString(String(seed));
    const a = ABERTURAS[h % ABERTURAS.length];
    const n = NUCLEOS[Math.floor(h/7) % NUCLEOS.length];
    const f = FECHOS[Math.floor(h/53) % FECHOS.length];
    return `${a} ${n}.${f}`;
  }

  function dayOfYear(d){
    const start = new Date(d.getFullYear(),0,0);
    return Math.floor((d - start) / 86400000);
  }

  function fraseDoDia(date){
    date = date || new Date();
    const seed = `${date.getFullYear()}-${dayOfYear(date)}`;
    return fraseFromSeed(seed);
  }

  function fraseAleatoria(){
    const seed = Math.random().toString(36) + Date.now();
    return fraseFromSeed(seed);
  }

  global.FraseEngine = { fraseDoDia, fraseAleatoria, TOTAL_COMBOS };

})(window);
