export const sortear = (array) => {
    const sorteeeado = [...array];
    for (let i = sorteeeado.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sorteeeado[i], sorteeeado[j]] = [sorteeeado[j], sorteeeado[i]];
    }
    return sorteeeado;
  };
  