
// Mapeamento baseado na progressão de níveis (Fundamental -> Médio -> CEFR)
export const mapLevelToCEFR = (excelLevel: string | number): string => {
    const lvl = String(excelLevel).trim();
    
    // Fundamental II (6º ao 9º)
    if (lvl.startsWith('6.1')) return 'A1'; // Iniciante
    if (lvl.startsWith('6.2') || lvl.startsWith('6.3')) return 'A2'; 
    if (lvl.startsWith('7.1') || lvl.startsWith('7.2')) return 'A2';
    if (lvl.startsWith('7.3')) return 'B1';
    if (lvl.startsWith('8.1')) return 'A2'; 
    if (lvl.startsWith('8.2') || lvl.startsWith('8.3')) return 'B1';
    if (lvl.startsWith('9.1')) return 'B1'; 
    if (lvl.startsWith('9.2') || lvl.startsWith('9.3')) return 'B2';

    // Ensino Médio (1ª a 3ª Série)
    if (lvl === '1.1' || lvl === '2.1') return 'B1'; 
    if (lvl === '1.2' || lvl === '2.2') return 'B2'; 
    if (lvl === '1.3' || lvl === '2.3') return 'C1'; 
    if (lvl.startsWith('3.')) return 'C1'; // Terceirão avançado

    return 'A1'; // Default fallback
};
