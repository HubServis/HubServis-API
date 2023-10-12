/* @params inputString
** inputExemple: "Ácesso á coração e opções"
** output: "acesso_a_coracao_e_opcoes"
*/

export function formatStringForFieldLoweCase(inputString: string): string {
    const stringWithoutAccents = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const formattedString = stringWithoutAccents
      .replace(/\s+/g, '_')
      .replace(/[^\w\s-]/g, '')
      .toLowerCase();
    return formattedString;
  }
